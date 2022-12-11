import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import { assert } from "chai";
import { createRoot, Root } from "react-dom/client";
import { Foo } from "./helpers";
import { act } from "react-dom/test-utils";
import type {
  TReturnType,
  TMethod,
  TConstructor,
} from "@overwatch/core/src/hooks/useWatch";
import React, { useEffect } from "react";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("useWatch hook", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;
  let rootContainer: HTMLDivElement;
  let root: Root;
  let Provider: (props) => JSX.Element;
  let useWatch: <Class extends TConstructor, Method extends TMethod<Class>>(
    token: Class,
    method: Method,
    defaultValue?: TReturnType<Class, Method>
  ) => TReturnType<Class, Method>;
  let useController: <T extends new (...args: any[]) => any>(
    token: T
  ) => InstanceType<T>;

  beforeEach(async () => {
    window = new JSDOM().window;
    eventEmitter = new EventEmitter();
    window.overwatch = {
      bus: eventEmitter,
    };

    rootContainer = window.document.createElement("div");
    root = createRoot(rootContainer);
    window.document.body.appendChild(rootContainer);

    // @ts-ignore
    global.window = window;

    [Provider, useWatch, useController] = await Promise.all([
      import("@overwatch/core/src/provider/OverwatchProvider").then(
        ({ OverwatchProvider }) => OverwatchProvider
      ),
      import("@overwatch/core/src/hooks/useWatch").then(
        ({ useWatch }) => useWatch
      ),
      import("@overwatch/core/src/hooks/useController").then(
        ({ useController }) => useController
      ),
    ]);
  });

  afterEach(() => {
    window.document.body.removeChild(rootContainer);
  });

  it("should rerender with specified value ", async () => {
    const instance = new Foo();

    const Component = () => {
      const controller = useController(Foo);
      const name = useWatch(Foo, "printName");

      useEffect(() => {
        controller.printName("test", "more test");
      }, [controller]);

      return <div id="name">{name}</div>;
    };

    await act(() => {
      root.render(
        <Provider controllers={[instance]}>
          <Component />
        </Provider>
      );
    });

    assert.equal(
      window.document.getElementById("name").textContent,
      "test more test"
    );
  });
});
