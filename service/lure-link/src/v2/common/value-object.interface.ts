// T: value type ,U: arg type
export abstract class ValueObject<T, U> {
  readonly value: T;
  abstract validate(value: U): T;
  constructor(value: U) {
    const v2 = this.validate(value);
    this.value = v2;
  }
}
