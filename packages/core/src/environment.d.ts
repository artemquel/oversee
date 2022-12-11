import EventEmitter from "eventemitter3";

declare global {
  interface Window {
    overwatch: {
      bus: EventEmitter;
    };
  }
}
