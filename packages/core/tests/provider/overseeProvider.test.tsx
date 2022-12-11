import { DOMWindow, JSDOM } from "jsdom";
import EventEmitter from "eventemitter3";
import React, { useContext } from "react";
import { assert } from "chai";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import type { IOverseeContext } from "@oversee/core/src/provider/OverseeProvider";
import { Foo } from "./helpers";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Oversee provider", () => {
  let window: DOMWindow;
  let eventEmitter: EventEmitter;
  let rootContainer: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
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
  });

  afterEach(() => {
    window.document.body.removeChild(rootContainer);
  });

  it("should render provider with children", async () => {
    // since we are emulating a window, we will load the component in the suite
    const { OverseeProvider } = await import(
      "@oversee/core/src/provider/OverseeProvider"
    );

    await act(() => {
      root.render(
        <OverseeProvider controllers={[]}>
          <div id="children">child of oversee provider</div>
        </OverseeProvider>
      );
    });

    assert.equal(
      window.document.getElementById("children").textContent,
      "child of oversee provider"
    );
  });

  it("should render provider with correct context", async () => {
    // since we are emulating a window, we will load the component in the suite
    const { OverseeProvider, OverseeContext } = await import(
      "@oversee/core/src/provider/OverseeProvider"
    );

    let context: IOverseeContext;

    const Component = () => {
      context = useContext(OverseeContext);
      return <div />;
    };

    const controller = new Foo();

    await act(() => {
      root.render(
        <OverseeProvider controllers={[controller]}>
          <Component />
        </OverseeProvider>
      );
    });

    assert.equal(context.bus, eventEmitter);
    assert.deepEqual(context.controllers, { Foo: controller });
    assert.deepEqual(context.storage, new Map());
  });
});
