import * as React from "react";
import { useController, useWatch } from "@overwatch/core";
import { ExampleController } from "./controllers/ExampleController";

export const App = () => {
  const controller = useController(ExampleController);
  const actionResult = useWatch(ExampleController, "action");
  const stringResult = useWatch(ExampleController, "string");
  const asyncResult = useWatch(ExampleController, "asyncMethod");

  return (
    <div>
      <span>{actionResult}</span>
      <button onClick={() => controller.action()}>Click</button>
    </div>
  );
};
