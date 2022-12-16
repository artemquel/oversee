import { busFactory } from "../utils/busFactory";

export function Oversee() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const className = target.name || target.constructor.name;
    const originalMethod = descriptor.value;
    const token = `${className}:${String(key)}`;

    descriptor.value = function (...args) {
      const result = originalMethod.call(this, ...args);
      busFactory().emit(token, result);
      return result;
    };
  };
}
