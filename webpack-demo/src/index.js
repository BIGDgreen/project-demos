// import _ from 'lodash'

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello webpack";
  // element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
}

document.body.appendChild(component());
