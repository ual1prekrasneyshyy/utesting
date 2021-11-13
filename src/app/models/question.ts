import {BaseEntity} from "./base.entity";
import {TestSubject} from "./test.subject";
import {Answer} from "./answer";

export class Question extends BaseEntity {
  orderPlace: number | undefined;
  value: string | undefined;
  answers: Answer[] | undefined;
  testSubject: TestSubject | undefined;


  constructor() {
    super();
  }
}
