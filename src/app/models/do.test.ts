import {Test} from "./test";

export interface DoTest extends Test{
  sessionId: string ;
  totalPoints: number;
  allPoints: number;
  passed: number;
}
