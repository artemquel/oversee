import { useWatch } from "@overwatch/core";
import * as React from "react";
import { UserController } from "../controllers/UserController";

export const Fullname = () => {
  const {
    name: { title, first, last },
  } = useWatch(UserController, "getRandomUser");

  return <h1>{[title, first, last].join(" ")}</h1>;
};
