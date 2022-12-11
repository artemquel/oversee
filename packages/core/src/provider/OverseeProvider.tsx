import React, { createContext, PropsWithChildren } from "react";
import { busFactory } from "../utils/busFactory";
import EventEmitter from "eventemitter3";

export interface IOverseeContext {
  bus: EventEmitter;
  controllers: Record<string, object>;
  storage: Map<string, unknown>;
}

export interface IOverseeProviderProps {
  controllers: object[];
}

export const OverseeContext = createContext<IOverseeContext>({
  bus: busFactory(),
  storage: new Map(),
  controllers: {},
});

export const OverseeProvider = (
  props: PropsWithChildren<IOverseeProviderProps>
) => {
  return (
    <OverseeContext.Provider
      value={{
        bus: busFactory(),
        storage: new Map(),
        controllers: props.controllers.reduce(
          (acc, instance) => ({
            ...acc,
            [instance.constructor.name]: instance,
          }),
          {}
        ) as Record<string, object>,
      }}
    >
      {props.children}
    </OverseeContext.Provider>
  );
};
