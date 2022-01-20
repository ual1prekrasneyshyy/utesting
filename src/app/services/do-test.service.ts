import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DoTest} from "../models/do.test";
import {Question} from "../models/question";
import {Answer} from "../models/answer";

@Injectable({
  providedIn: 'root'
})
export class DoTestService {

  private url = `${environment.apiUrl}do/test/`;

  constructor(private http: HttpClient) { }

  public startTest(id: bigint | undefined): Observable<DoTest>{
    return this.http.post<DoTest>(`${this.url}start/${id}`, {});
  }

  public getTestSessionBySessionId(sessionId: string | undefined){
    return this.http.get<DoTest>(`${this.url}${sessionId}`);
  }

  public answerToQuestion(questionId: bigint | undefined, question: Question): Observable<Question>{
    return  this.http.put<Question>(`${this.url}answer/${questionId}`, question);
  }

  public registerAnswerChoice(answerId: bigint|undefined, answer: Answer): Observable<Answer>{
    return this.http.put<Answer>(`${this.url}register/answer/${answerId}`, answer);
  }

  public submitTestAnswers(testSessionId: string, doTestEntity: DoTest): Observable<DoTest>{
    return this.http.put<DoTest>(`${this.url}submit/test/${testSessionId}`, doTestEntity);
  }
}
