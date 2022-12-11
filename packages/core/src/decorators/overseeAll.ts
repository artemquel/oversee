import { Oversee } from "./oversee";

interface IOverseeOptions {
  deep?: boolean;
  exclude?: string[];
  excludePrefix?: string;
}

export const OverseeAll = (options: IOverseeOptions = {}) => {
  return (target: any) => {
    let descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    if (options.deep) {
      let base = Object.getPrototypeOf(target);

      while (base.prototype) {
        const baseDescriptors = Object.getOwnPropertyDescriptors(
          base.prototype
        );

        descriptors = { ...baseDescriptors, ...descriptors };
        base = Object.getPrototypeOf(base);
      }
    }

    for (const [property, descriptor] of Object.entries(descriptors)) {
      if (
        typeof descriptor.value !== "function" ||
        property === "constructor" ||
        options.exclude?.includes(property) ||
        property.startsWith(options.excludePrefix)
      ) {
        continue;
      }

      Oversee()(target, property, descriptor);
      Object.defineProperty(target.prototype, property, descriptor);
    }
  };
};
