// const dinner = {
//   meal: "tacos",
//   after: "water",
// };

const handlers = {
  get(target, property) {
    console.log(target, property);
    // track
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    // trigger
    return Reflect.set(...arguments);
  },
};

// const proxy = new Proxy(dinner, handlers);
// console.log(proxy.meal);

const obj = {};
const wrapped = new Proxy(obj, handlers);

console.log(obj === wrapped); // false
