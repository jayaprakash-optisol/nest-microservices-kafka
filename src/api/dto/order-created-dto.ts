export class OrderCreatedDTO {
  constructor(
    public readonly products: any[],
    public readonly userId: string,
  ) {}

  toString() {
    return JSON.stringify({
      products: this.products,
      userId: this.userId,
    });
  }
}
