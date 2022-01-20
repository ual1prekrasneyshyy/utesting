import {BaseEntity} from "./base.entity";
import {TestSubject} from "./test.subject";
import {Answer} from "./answer";

export interface Question extends BaseEntity {
  orderPlace: number | undefined;
  value: string;
  answers: Answer[];
  testSubject: TestSubject;
  associatedPictureName: string;
  passed: number;
  rightAnswers: number;
  points: number;

}
