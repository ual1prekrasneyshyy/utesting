import {BaseEntity} from "./base.entity";

export class TestSubject extends BaseEntity {
  subject: string | undefined;
  description: string | undefined;


  constructor() {
    super();
  }
}
