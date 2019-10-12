# TypeScript Learnings

This is a log of things I had to figure out about TypeScript while working on
this project.

## Grouping Types and Functions

I wanted to use a functional style (rather than OO). In JS, I like to follow an
Elixir-style type module approach to the code (as described in
https://blog.carbonfive.com/2018/08/13/a-proposal-elixir-style-modules-in-javascript/),
where a type definition is grouped along with the functions that operate on it.

I found
https://spin.atomicobject.com/2017/10/26/typescript-functional-module-pattern/
and am following that pattern.

## Providing Shared Values for Tests

Sometimes multiple tests want to share the same value, for example when
computing a result and then making several different assertions about the result
in several different test blocks, or when setting up a test double.

The simplest approach is to use `const value = "whatever";` in a `describe`
block. However, Jest executes all of the describe blocks before even figuring
out which tests to run, so this can impose a performance penalty if computing
the value is expensive.

My next go-to approach is to do this:

```js
let value = null;

beforeEach(() => {
  value = "whatever";
});

test("something", () => {
  expect(value).toSatisfySomeCondition();
});
```

This is a bit verbose, but usable.

After adopting this pattern, I learned that, if the top-level `describe` block's
function is defined with the `function` keyword instead of as an arrow function,
all of the nested `describe` and `test` blocks will share a `this` object.

So the above example could be re-written as:

```js
describe("some situation", function() => {
  beforeEach(() => {
      this.value = "whatever";
  });

  test("something", () => {
    expect(this.value).toSatisfySomeCondition();
  });
})
```

However, I couldn't initially make either of these patterns work in TypeScript
with strict type-checking. After doing some research, I figured out how to make
either pattern work.

For the first pattern, I had to make the value's type nullable in order to
initialize it to `null`. But then I was unable to pass the value into a function
that wanted to use it. I learned about the type assertion operator (`!`), and
that solved the problem.

```ts
let value: string | null = null;

beforeEach(() => {
  value = "whatever";
});

test("something", () => {
  expect(value!).toSatisfySomeCondition();
});
```

For the second pattern (shared `this`), I was unable to assign anything to
`this.value` because `this` was of type `any`. This is always true when you use
`function()` apparently, because the value of `this` comes from the caller.

I learned, though, that you could include a fake `this` parameter with a type in
the argument list. So I could do this:

```ts
interface TestContext {
  value: string
};

describe("some situation", function(this: TestContext) => {
  beforeEach(() => {
      this.value = "whatever";
  });

  test("something", () => {
    expect(this.value).toSatisfySomeCondition();
  });
})
```
