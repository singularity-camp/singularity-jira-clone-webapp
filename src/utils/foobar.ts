type FoobarReturn = "foo" | "bar" | "foo bar" | "";
const foobar = (n: number): FoobarReturn => {
  if (n % 15 === 0) {
    return "foo bar";
  }
  if (n % 3 === 0) {
    return "foo";
  }
  if (n % 5 === 0) {
    return "bar";
  }

  return "";
};

export default foobar;
