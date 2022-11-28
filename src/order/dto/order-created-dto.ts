export class OrderCreatedDTO {
  constructor(
    public readonly products: any[],
    public readonly userId: string,
  ) {}
}
