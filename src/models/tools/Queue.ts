export default class Queue<T> {
  private element: T[];

  constructor() {
    this.element = [];
  }

  get data() {
    return [...this.element];
  }

  get top(): T | undefined {
    return this.element[0];
  }

  get isEmpty(): boolean {
    return this.element.length === 0;
  }

  get size(): number {
    return this.element.length;
  }

  in(element: T): number {
    return this.element.push(element);
  }

  out(): T | undefined {
    return this.element.shift();
  }

  clear(): void {
    this.element.length = 0;
  }
}
