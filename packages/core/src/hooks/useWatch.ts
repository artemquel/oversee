import { useContext, useEffect, useState } from "react";
import { OverseeContext } from "../provider/OverseeProvider";
import { TConstructor, TMethod, TReturnType } from "./types";

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
      if (value instanceof Promise) {
        value.then((value) => {
          storage.set(channel, value);
          setValue(value);
        });
      } else {
        storage.set(channel, value);
        setValue(value);
      }
    });

    return () => {
      bus.off(channel, setValue);
    };
  }, [token, method]);

  return value as TReturnType<Class, Method>;
};
