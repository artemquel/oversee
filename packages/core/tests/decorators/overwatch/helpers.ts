import { Overwatch } from "@overwatch/core/src/decorators/overwatch";

export class Foo {
  @Overwatch()
  public bar() {
    return "foo.bar";
  }
}
