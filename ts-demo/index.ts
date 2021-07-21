function isString(arg: any): arg is string {
  return typeof arg === "string";
}

// 使用
function invoker(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log("Aha, This is a string!");
    console.log(numOrStr.length);
  }
}