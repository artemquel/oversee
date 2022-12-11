import { OverseeAll } from "@oversee/core/src/decorators/overseeAll";

@OverseeAll()
export class Foo {
  public method1() {
    return 1;
  }

  public method2() {
    return "test";
  }
}
