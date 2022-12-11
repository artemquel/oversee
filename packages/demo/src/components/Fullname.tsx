import * as React from "react";
import { IUser } from "../controllers/UserController";

export const Fullname = ({ title, first, last }: IUser["name"]) => {
  return <h1>{[title, first, last].join(" ")}</h1>;
};
