import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { OverwatchProvider } from "@overwatch/core";
import { ExampleController } from "./controllers/ExampleController";

const container = document.getElementById("app");
const root = createRoot(container);

const controllers = [new ExampleController()];

root.render(
  <OverwatchProvider controllers={controllers}>
    <App />
  </OverwatchProvider>
);
