import { useContext } from "react";
import { OverseeContext } from "../provider/OverseeProvider";

export const useController = <T extends new (...args: any[]) => any>(
  token: T
): InstanceType<T> => {
  const { controllers } = useContext(OverseeContext);
  if (controllers[token.name]) {
    return controllers[token.name] as InstanceType<T>;
  }
  throw new Error(`Controller ${token.name} is not defined`);
};
