import EventEmitter from "eventemitter3";

declare global {
  interface Window {
    oversee: {
      bus: EventEmitter;
    };
  }
}

// TODO: figure out how to implement a common transport between context and decorators
export const busFactory = () => {
  if (!window.oversee?.bus) {
    window.oversee = {
      bus: new EventEmitter(),
    };
  }
  return window.oversee.bus;
};
