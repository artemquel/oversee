import { OverwatchAll } from "@overwatch/core/src/decorators/overwatchAll";

@OverwatchAll()
export class Foo {
  public method1() {
    return 1;
  }

  public method2() {
    return "test";
  }
}
