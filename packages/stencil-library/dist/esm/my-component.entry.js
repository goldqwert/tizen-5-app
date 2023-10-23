import { r as registerInstance, h } from './index-240c2818.js';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block;color:red;background:black}";

const MyComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  render() {
    return h("div", null, "Hello, World! I'm ", this.getText());
  }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
