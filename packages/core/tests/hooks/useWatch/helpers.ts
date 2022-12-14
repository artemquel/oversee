import { Oversee } from "@oversee/core/src/decorators/oversee";

export class Foo {
  @Oversee()
  printName(name: string, lastName: string) {
    return `${name} ${lastName}`;
  }
}
