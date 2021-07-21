/* eslint-disable @typescript-eslint/no-explicit-any */
const copyProperties = (target: any, source: Record<string, unknown>) => {
  Reflect.ownKeys(source).forEach((key) => {
    if (key !== 'constructor' && key !== 'prototype') {
      const desc = Reflect.getOwnPropertyDescriptor(source, key);

      if (desc) Reflect.defineProperty(target, key, desc);
    }
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Mixins(...mixins: any[]) {
  class Mixin {
    constructor(data: unknown) {
      mixins.forEach((MixinItem) => copyProperties(this, new MixinItem(data))); // 拷贝实例属性
    }
  }

  mixins.forEach((mixin) => {
    copyProperties(Mixin, mixin); // 拷贝静态属性
    copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
  });

  return Mixin;
}
