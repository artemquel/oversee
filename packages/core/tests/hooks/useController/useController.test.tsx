import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import { assert } from "chai";
import { createRoot, Root } from "react-dom/client";
import { Foo } from "./helpers";
import { act } from "react-dom/test-utils";
import React from "react";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("useController hook", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;
  let rootContainer: HTMLDivElement;
  let root: Root;
  let Provider: (props) => JSX.Element;
  let useController: <T extends new (...args: any[]) => any>(
    token: T
  ) => InstanceType<T>;

  beforeEach(async () => {
    window = new JSDOM().window;
    eventEmitter = new EventEmitter();
    window.oversee = {
      bus: eventEmitter,
    };

    rootContainer = window.document.createElement("div");
    root = createRoot(rootContainer);
    window.document.body.appendChild(rootContainer);

    // @ts-ignore
    global.window = window;

    [Provider, useController] = await Promise.all([
      import("@oversee/core/src/provider/OverseeProvider").then(
        ({ OverseeProvider }) => OverseeProvider
      ),
      import("@oversee/core/src/hooks/useController").then(
        ({ useController }) => useController
      ),
    ]);
  });

  afterEach(() => {
    window.document.body.removeChild(rootContainer);
  });

  it("should return class instance", async () => {
    let returnedInstance;
    const instance = new Foo();

    const Component = () => {
      returnedInstance = useController(Foo);
      return <div />;
    };

    await act(() => {
      root.render(
        <Provider controllers={[instance]}>
          <Component />
        </Provider>
      );
    });

    assert.equal(returnedInstance, instance);
  });

  it("should throw error whe try to get class that not specified in provider", async () => {
    const Component = () => {
      useController(Foo);
      return <div />;
    };

    try {
      await act(() => {
        root.render(
          <Provider controllers={[]}>
            <Component />
          </Provider>
        );
      });
      assert.fail("Should throw error");
    } catch (e) {
      assert.deepEqual(e, new Error("Controller Foo is not defined"));
    }
  });
});
