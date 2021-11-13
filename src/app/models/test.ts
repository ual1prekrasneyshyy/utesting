import {BaseEntity} from "./base.entity";
import {TestSubject} from "./test.subject";
import {Question} from "./question";

export class Test extends BaseEntity {
  variant: number | undefined;
  testSubject: TestSubject | undefined;
  questions: Question[] | undefined;


  constructor() {
    super();
  }
}
