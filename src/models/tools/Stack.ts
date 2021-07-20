export default class Stack<T> {
  private element: T[];

  constructor() {
    this.element = [];
  }

  get data() {
    return [...this.element];
  }

  get length() {
    return this.element.length;
  }

  get top() {
    return this.element[this.length - 1];
  }

  push(element: T) {
    return this.element.push(element);
  }

  pop() {
    return this.element.pop();
  }

  clear() {
    this.element.length = 0;
  }
}
