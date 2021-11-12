/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import type {Program} from 'hermes-estree';
import type {TransformContext} from './TransformContext';
import type {Visitor} from '../traverse/traverse';

import {parseForESLint} from 'hermes-eslint';
import {updateAllParentPointers} from '../detachedNode';
import {traverseWithContext} from '../traverse/traverse';
import {MutationContext} from './MutationContext';
import {getTransformContext} from './TransformContext';
import {attachComments} from './comments/comments';
import {performInsertStatementMutation} from './mutations/InsertStatement';
import {performRemoveStatementMutation} from './mutations/RemoveStatement';
import {performReplaceNodeMutation} from './mutations/ReplaceNode';
import {performReplaceStatementWithManyMutation} from './mutations/ReplaceStatementWithMany';

export function getTransformedAST(
  code: string,
  visitors: Visitor<TransformContext>,
): {
  ast: Program,
  astWasMutated: boolean,
} {
  const {ast, scopeManager} = parseForESLint(code, {
    sourceType: 'module',
  });

  // attach comments before mutation. this will ensure that as nodes are
  // cloned / moved around - comments remain in the correct place with respect to the node
  attachComments(ast.comments, ast, code);

  // traverse the AST and colllect the mutations
  const transformContext = getTransformContext();
  traverseWithContext(ast, scopeManager, () => transformContext, visitors);

  // apply the mutations to the AST
  const mutationContext = new MutationContext();
  for (const mutation of transformContext.mutations) {
    const mutationRoot = (() => {
      switch (mutation.type) {
        case 'insertStatement': {
          return performInsertStatementMutation(mutationContext, mutation);
        }

        case 'replaceNode': {
          return performReplaceNodeMutation(mutationContext, mutation);
        }

        case 'replaceStatementWithMany': {
          return performReplaceStatementWithManyMutation(
            mutationContext,
            mutation,
          );
        }

        case 'removeStatement': {
          return performRemoveStatementMutation(mutationContext, mutation);
        }
      }
    })();

    // ensure the subtree's parent pointers are correct
    // this is required for two reasons:
    // 1) The userland transform is just JS - so there's nothing stopping them
    //    from doing anything dodgy. The flow types have some enforcement, but
    //    ofc that can just be ignored with a suppression.
    // 2) Shallow clones are a necessary evil in the transform because they
    //    allow codemods to do simple changes to just one node without the
    //    weight that comes with deeply cloning the entire AST.
    //    However we can't update the parent pointers of the cloned node's
    //    children until the mutation step or else we would be mutating
    //    real AST nodes and potentially break the traverse step.
    //
    // Being strict here just helps us ensure we keep everything in sync
    updateAllParentPointers(mutationRoot);
  }

  return {
    ast,
    astWasMutated: transformContext.mutations.length > 0,
  };
}