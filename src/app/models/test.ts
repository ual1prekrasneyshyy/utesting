import {BaseEntity} from "./base.entity";
import {TestSubject} from "./test.subject";
import {Question} from "./question";

export interface Test extends BaseEntity {
  variant: number;
  testSubject: TestSubject;
  questions: Question[];

}
