export default class Queue<T> {
  #element: T[];

  constructor() {
    this.#element = [];
  }

  in(element: T): number {
    return this.#element.push(element);
  }

  out(): T | undefined {
    return this.#element.shift();
  }

  get element(): T[] {
    return [...this.#element];
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

  clear(): void {
    this.#element = [];
  }
}
