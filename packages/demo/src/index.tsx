import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { OverseeProvider } from "@oversee/core";
import { UserController } from "./controllers/UserController";

const container = document.getElementById("app");
const root = createRoot(container);

const controllers = [new UserController()];

root.render(
  <OverseeProvider controllers={controllers}>
    <App />
  </OverseeProvider>
);
