import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import { Foo } from "./helpers";
import { assert } from "chai";

describe("OverwarchAll decorator", () => {
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

  it("should emit a new event when calling first method", (done) => {
    eventEmitter.on("Foo:method1", (value) => {
      assert.equal(value, 1);
      done();
    });

    const foo = new Foo();
    foo.method1();
  });

  it("should emit a new event when calling second method", (done) => {
    eventEmitter.on("Foo:method2", (value) => {
      assert.equal(value, "test");
      done();
    });

    const foo = new Foo();
    foo.method2();
  });
});
