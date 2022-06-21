import foobar from "./foobar";

describe("test foobar", () => {
  const fooTable = [
    { n: 3, expected: "foo" },
    { n: 5, expected: "bar" },
    { n: 15, expected: "foo bar" },
    { n: 30, expected: "foo bar" },
    { n: 12, expected: "foo" },
    { n: 10, expected: "bar" },
    { n: 11, expected: "" },
    { n: 4, expected: "" },
    { n: 17, expected: "" },
    { n: NaN, expected: "" },
  ];
  test.each(fooTable)("checks foobar ($n) $expected", ({ n, expected }) => {
    const res = foobar(n);
    expect(res).toBe(expected);
  });
});
