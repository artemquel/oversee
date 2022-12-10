import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { OverwatchProvider } from "@overwatch/core";
import { UserController } from "./controllers/UserController";

const container = document.getElementById("app");
const root = createRoot(container);

const controllers = [new UserController()];

root.render(
  <OverwatchProvider controllers={controllers}>
    <App />
  </OverwatchProvider>
);
