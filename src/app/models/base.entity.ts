export class BaseEntity {
  public id: bigint | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;
  public deletedAt: Date | undefined;


  constructor() {
  }
}
