/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// RUN: %hermesc -O0 -dump-ir %s | %FileCheckOrRegen --match-full-lines %s

// Ensure that __proto__ is not handled specially with shorthand
// syntax.

// __proto__ *should* be set as an "own" property.
function protoShorthand(func) {
  var __proto__ = 42;
  return {__proto__, a: 2, b: 3};
}

// __proto__ with shorthand syntax is a regular own property that allows
// duplication.
function protoShorthandDup(func) {
  var __proto__ = 42;
  return {__proto__, __proto__};
}

// __proto__: AssignmentExpression syntax mixed with shorthand syntax.
function protoShorthandMix1(func) {
  var __proto__ = 42;
  return {__proto__, __proto__: {}};
}

function protoShorthandMix2(func) {
  var __proto__ = 42;
  return {__proto__: {}, __proto__};
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = DeclareGlobalVarInst "protoShorthand": string
// CHECK-NEXT:  %1 = DeclareGlobalVarInst "protoShorthandDup": string
// CHECK-NEXT:  %2 = DeclareGlobalVarInst "protoShorthandMix1": string
// CHECK-NEXT:  %3 = DeclareGlobalVarInst "protoShorthandMix2": string
// CHECK-NEXT:  %4 = CreateFunctionInst (:object) %protoShorthand(): any
// CHECK-NEXT:  %5 = StorePropertyLooseInst %4: object, globalObject: object, "protoShorthand": string
// CHECK-NEXT:  %6 = CreateFunctionInst (:object) %protoShorthandDup(): any
// CHECK-NEXT:  %7 = StorePropertyLooseInst %6: object, globalObject: object, "protoShorthandDup": string
// CHECK-NEXT:  %8 = CreateFunctionInst (:object) %protoShorthandMix1(): any
// CHECK-NEXT:  %9 = StorePropertyLooseInst %8: object, globalObject: object, "protoShorthandMix1": string
// CHECK-NEXT:  %10 = CreateFunctionInst (:object) %protoShorthandMix2(): any
// CHECK-NEXT:  %11 = StorePropertyLooseInst %10: object, globalObject: object, "protoShorthandMix2": string
// CHECK-NEXT:  %12 = AllocStackInst (:any) $?anon_0_ret: any
// CHECK-NEXT:  %13 = StoreStackInst undefined: undefined, %12: any
// CHECK-NEXT:  %14 = LoadStackInst (:any) %12: any
// CHECK-NEXT:  %15 = ReturnInst %14: any
// CHECK-NEXT:function_end

// CHECK:function protoShorthand(func: any): any
// CHECK-NEXT:frame = [func: any, __proto__: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %func: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [func]: any
// CHECK-NEXT:  %2 = StoreFrameInst undefined: undefined, [__proto__]: any
// CHECK-NEXT:  %3 = StoreFrameInst 42: number, [__proto__]: any
// CHECK-NEXT:  %4 = LoadFrameInst (:any) [__proto__]: any
// CHECK-NEXT:  %5 = AllocObjectLiteralInst (:object) "__proto__": string, %4: any, "a": string, 2: number, "b": string, 3: number
// CHECK-NEXT:  %6 = ReturnInst %5: object
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %7 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function protoShorthandDup(func: any): any
// CHECK-NEXT:frame = [func: any, __proto__: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %func: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [func]: any
// CHECK-NEXT:  %2 = StoreFrameInst undefined: undefined, [__proto__]: any
// CHECK-NEXT:  %3 = StoreFrameInst 42: number, [__proto__]: any
// CHECK-NEXT:  %4 = AllocObjectInst (:object) 1: number, empty: any
// CHECK-NEXT:  %5 = LoadFrameInst (:any) [__proto__]: any
// CHECK-NEXT:  %6 = StoreNewOwnPropertyInst null: null, %4: object, "__proto__": string, true: boolean
// CHECK-NEXT:  %7 = LoadFrameInst (:any) [__proto__]: any
// CHECK-NEXT:  %8 = StoreOwnPropertyInst %7: any, %4: object, "__proto__": string, true: boolean
// CHECK-NEXT:  %9 = ReturnInst %4: object
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %10 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function protoShorthandMix1(func: any): any
// CHECK-NEXT:frame = [func: any, __proto__: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %func: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [func]: any
// CHECK-NEXT:  %2 = StoreFrameInst undefined: undefined, [__proto__]: any
// CHECK-NEXT:  %3 = StoreFrameInst 42: number, [__proto__]: any
// CHECK-NEXT:  %4 = AllocObjectInst (:object) 1: number, empty: any
// CHECK-NEXT:  %5 = LoadFrameInst (:any) [__proto__]: any
// CHECK-NEXT:  %6 = StoreNewOwnPropertyInst %5: any, %4: object, "__proto__": string, true: boolean
// CHECK-NEXT:  %7 = AllocObjectInst (:object) 0: number, empty: any
// CHECK-NEXT:  %8 = CallBuiltinInst (:any) [HermesBuiltin.silentSetPrototypeOf]: number, empty: any, empty: any, undefined: undefined, %4: object, %7: object
// CHECK-NEXT:  %9 = ReturnInst %4: object
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %10 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function protoShorthandMix2(func: any): any
// CHECK-NEXT:frame = [func: any, __proto__: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %func: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [func]: any
// CHECK-NEXT:  %2 = StoreFrameInst undefined: undefined, [__proto__]: any
// CHECK-NEXT:  %3 = StoreFrameInst 42: number, [__proto__]: any
// CHECK-NEXT:  %4 = AllocObjectInst (:object) 0: number, empty: any
// CHECK-NEXT:  %5 = AllocObjectInst (:object) 1: number, %4: object
// CHECK-NEXT:  %6 = LoadFrameInst (:any) [__proto__]: any
// CHECK-NEXT:  %7 = StoreNewOwnPropertyInst %6: any, %5: object, "__proto__": string, true: boolean
// CHECK-NEXT:  %8 = ReturnInst %5: object
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %9 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end
