import { useContext, useEffect, useState } from "react";
import { OverseeContext } from "../provider/OverseeProvider";
import { TAsyncReturnType, TConstructor, TMethod, TReturnType } from "./types";

export const useWatch = <
  Class extends TConstructor,
  Method extends TMethod<Class>
>(
  token: Class,
  method: Method,
  defaultValue?: TReturnType<Class, Method>
): TAsyncReturnType<TReturnType<Class, Method>> => {
  const channel = `${token.name}:${method as string}`;

  const { bus, storage } = useContext(OverseeContext);
  const [value, setValue] = useState<TReturnType<Class, Method>>(
    (storage.get(channel) || defaultValue) as TReturnType<Class, Method>
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, unknown>>({});

  useEffect(() => {
    bus.on(channel, (value) => {
      if (value instanceof Promise) {
        setLoading(true);
        value
          .then((result) => {
            setValue(result);
            storage.set(channel, value);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => setLoading(false));
      } else {
        throw Error("Value is not a instance of promise");
      }
    });

    return () => {
      bus.off(channel, setValue);
    };
  }, [token, method]);

  return {
    error,
    loading,
    result: value,
  };
};
