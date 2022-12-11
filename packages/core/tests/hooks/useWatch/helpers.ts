import { Overwatch } from "@overwatch/core/src/decorators/overwatch";

export class Foo {
  @Overwatch()
  printName(name: string, lastName: string) {
    return `${name} ${lastName}`;
  }
}
