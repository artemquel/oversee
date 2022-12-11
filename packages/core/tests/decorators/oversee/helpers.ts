import { Oversee } from "@oversee/core/src/decorators/oversee";

export class Foo {
  @Oversee()
  public bar() {
    return "foo.bar";
  }
}
