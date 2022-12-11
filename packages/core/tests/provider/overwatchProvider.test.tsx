import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import React, { useContext } from "react";
import { assert } from "chai";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import type { IOverwatchContext } from "@overwatch/core/src/provider/OverwatchProvider";
import { Foo } from "./helpers";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Overwarch provider", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;
  let rootContainer: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
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
  });

  afterEach(() => {
    window.document.body.removeChild(rootContainer);
  });

  it("should render provider with children", async () => {
    // since we are emulating a window, we will load the component in the suite
    const { OverwatchProvider } = await import(
      "@overwatch/core/src/provider/OverwatchProvider"
    );

    await act(() => {
      root.render(
        <OverwatchProvider controllers={[]}>
          <div id="children">child of overwatch provider</div>
        </OverwatchProvider>
      );
    });

    assert.equal(
      window.document.getElementById("children").textContent,
      "child of overwatch provider"
    );
  });

  it("should render provider with correct context", async () => {
    // since we are emulating a window, we will load the component in the suite
    const { OverwatchProvider, OverwatchContext } = await import(
      "@overwatch/core/src/provider/OverwatchProvider"
    );

    let context: IOverwatchContext;

    const Component = () => {
      context = useContext(OverwatchContext);
      return <div />;
    };

    const controller = new Foo();

    await act(() => {
      root.render(
        <OverwatchProvider controllers={[controller]}>
          <Component />
        </OverwatchProvider>
      );
    });

    assert.equal(context.bus, eventEmitter);
    assert.deepEqual(context.controllers, { Foo: controller });
    assert.deepEqual(context.storage, new Map());
  });
});
