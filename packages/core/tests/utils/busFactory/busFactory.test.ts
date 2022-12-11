import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import { busFactory } from "@oversee/core/src/utils/busFactory";
import { assert } from "chai";

describe("busFactory", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    window = new JSDOM().window;
    eventEmitter = new EventEmitter();
    window.oversee = {
      bus: eventEmitter,
    };

    // @ts-ignore
    global.window = window;
  });

  it("should return mocked event emitter", () => {
    assert.equal(busFactory(), eventEmitter);
  });
});
