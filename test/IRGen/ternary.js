/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermes -hermes-parser -dump-ir %s -O0 | %FileCheckOrRegen %s --match-full-lines
// RUN: %hermes -hermes-parser -dump-ir %s -O

// Simple test.
function test_one(x,y,z) {
  return x ? y : z;
}

// Assignment expression.

function test_two() {
  var stop = false, age = 16;
  return age > 18 ? age = 2 : stop = true;
}

// Function call expression.
function test_three(x, one, two) {
  return x ? ( one() ) : ( two() );
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global()
// CHECK-NEXT:frame = [], globals = [test_one, test_two, test_three]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst %test_one()
// CHECK-NEXT:  %1 = StorePropertyLooseInst %0 : closure, globalObject : object, "test_one" : string
// CHECK-NEXT:  %2 = CreateFunctionInst %test_two()
// CHECK-NEXT:  %3 = StorePropertyLooseInst %2 : closure, globalObject : object, "test_two" : string
// CHECK-NEXT:  %4 = CreateFunctionInst %test_three()
// CHECK-NEXT:  %5 = StorePropertyLooseInst %4 : closure, globalObject : object, "test_three" : string
// CHECK-NEXT:  %6 = AllocStackInst $?anon_0_ret
// CHECK-NEXT:  %7 = StoreStackInst undefined : undefined, %6
// CHECK-NEXT:  %8 = LoadStackInst %6
// CHECK-NEXT:  %9 = ReturnInst %8
// CHECK-NEXT:function_end

// CHECK:function test_one(x, y, z)
// CHECK-NEXT:frame = [x, y, z]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %x, [x]
// CHECK-NEXT:  %1 = StoreFrameInst %y, [y]
// CHECK-NEXT:  %2 = StoreFrameInst %z, [z]
// CHECK-NEXT:  %3 = LoadFrameInst [x]
// CHECK-NEXT:  %4 = CondBranchInst %3, %BB1, %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %5 = LoadFrameInst [z]
// CHECK-NEXT:  %6 = BranchInst %BB3
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %7 = LoadFrameInst [y]
// CHECK-NEXT:  %8 = BranchInst %BB3
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %9 = PhiInst %7, %BB1, %5, %BB2
// CHECK-NEXT:  %10 = ReturnInst %9
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %11 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function test_two()
// CHECK-NEXT:frame = [stop, age]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst undefined : undefined, [stop]
// CHECK-NEXT:  %1 = StoreFrameInst undefined : undefined, [age]
// CHECK-NEXT:  %2 = StoreFrameInst false : boolean, [stop]
// CHECK-NEXT:  %3 = StoreFrameInst 16 : number, [age]
// CHECK-NEXT:  %4 = LoadFrameInst [age]
// CHECK-NEXT:  %5 = BinaryOperatorInst '>', %4, 18 : number
// CHECK-NEXT:  %6 = CondBranchInst %5, %BB1, %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %7 = StoreFrameInst true : boolean, [stop]
// CHECK-NEXT:  %8 = BranchInst %BB3
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %9 = StoreFrameInst 2 : number, [age]
// CHECK-NEXT:  %10 = BranchInst %BB3
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %11 = PhiInst 2 : number, %BB1, true : boolean, %BB2
// CHECK-NEXT:  %12 = ReturnInst %11
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %13 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end

// CHECK:function test_three(x, one, two)
// CHECK-NEXT:frame = [x, one, two]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst %x, [x]
// CHECK-NEXT:  %1 = StoreFrameInst %one, [one]
// CHECK-NEXT:  %2 = StoreFrameInst %two, [two]
// CHECK-NEXT:  %3 = LoadFrameInst [x]
// CHECK-NEXT:  %4 = CondBranchInst %3, %BB1, %BB2
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %5 = LoadFrameInst [two]
// CHECK-NEXT:  %6 = CallInst %5, undefined : undefined
// CHECK-NEXT:  %7 = BranchInst %BB3
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %8 = LoadFrameInst [one]
// CHECK-NEXT:  %9 = CallInst %8, undefined : undefined
// CHECK-NEXT:  %10 = BranchInst %BB3
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %11 = PhiInst %9, %BB1, %6, %BB2
// CHECK-NEXT:  %12 = ReturnInst %11
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %13 = ReturnInst undefined : undefined
// CHECK-NEXT:function_end
