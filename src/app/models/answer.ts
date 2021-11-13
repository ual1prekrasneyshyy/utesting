import {BaseEntity} from "./base.entity";

export class Answer extends BaseEntity {
  orderPlace: number | undefined;
  value: string | undefined;
  correct: number | undefined;


  constructor() {
    super();
  }
}
