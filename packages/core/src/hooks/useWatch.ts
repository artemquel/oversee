import { useContext, useEffect, useState } from "react";
import { OverseeContext } from "../provider/OverseeProvider";

type ExtractKeysBy<BaseInterface, Target> = {
  [K in keyof BaseInterface]: BaseInterface[K] extends Target ? K : never;
}[keyof BaseInterface];

export type TConstructor = new (...args: any[]) => any;

export type TMethod<Class extends TConstructor> = ExtractKeysBy<
  InstanceType<Class>,
  (...args: unknown[]) => unknown
>;

export type TReturnType<
  Class extends TConstructor,
  Method extends TMethod<Class>
> = Awaited<ReturnType<InstanceType<Class>[Method]>>;

export const useWatch = <
  Class extends TConstructor,
  Method extends TMethod<Class>
>(
  token: Class,
  method: Method,
  defaultValue?: TReturnType<Class, Method>
): TReturnType<Class, Method> => {
  const channel = `${token.name}:${method as string}`;

  const { bus, storage } = useContext(OverseeContext);
  const [value, setValue] = useState(storage.get(channel) || defaultValue);

  useEffect(() => {
    bus.on(channel, (value) => {
      storage.set(channel, value);
      setValue(value);
    });

    return () => {
      bus.off(channel, setValue);
    };
  }, [token, method]);

  return value as TReturnType<Class, Method>;
};
