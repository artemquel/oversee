import { OverwatchAll } from "@overwatch/core";

@OverwatchAll()
export class ExampleController {
  public action() {
    return Math.round(Math.random() * 1000);
  }

  public string() {
    return "kek";
  }

  public async asyncMethod() {
    return Promise.resolve("kek");
  }
}
