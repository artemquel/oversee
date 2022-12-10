import EventEmitter from "eventemitter3";

// TODO: figure out how to implement a common transport between context and decorators
export const busFactory = () => {
  if (!window.overwatch?.bus) {
    window.overwatch = {
      bus: new EventEmitter(),
    };
  }
  return window.overwatch.bus;
};
