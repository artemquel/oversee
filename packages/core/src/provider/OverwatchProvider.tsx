import React, { createContext, PropsWithChildren } from "react";
import { busFactory } from "../utils/busFactory";
import EventEmitter from "eventemitter3";

export interface IOverwatchContext {
  bus: EventEmitter;
  controllers: Record<string, object>;
  storage: Map<string, unknown>;
}

export interface IOverwatchProviderProps {
  controllers: object[];
}

export const OverwatchContext = createContext<IOverwatchContext>({
  bus: busFactory(),
  storage: new Map(),
  controllers: {},
});

export const OverwatchProvider = (
  props: PropsWithChildren<IOverwatchProviderProps>
) => {
  return (
    <OverwatchContext.Provider
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
    </OverwatchContext.Provider>
  );
};
