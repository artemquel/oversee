import { busFactory } from "../utils/busFactory";

export function Overwatch() {
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

      if (result instanceof Promise) {
        result.then((result) => busFactory().emit(token, result));
      } else {
        busFactory().emit(token, result);
      }

      return result;
    };
  };
}
