import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import { Foo } from "./helpers";
import { assert } from "chai";

describe("Overwarch decorator", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    window = new JSDOM().window;
    eventEmitter = new EventEmitter();
    window.overwatch = {
      bus: eventEmitter,
    };

    // @ts-ignore
    global.window = window;
  });

  it("should emit a new event when calling decorated method", (done) => {
    eventEmitter.on("Foo:bar", (value) => {
      assert.equal(value, "foo.bar");
      done();
    });

    const foo = new Foo();
    foo.bar();
  });
});
