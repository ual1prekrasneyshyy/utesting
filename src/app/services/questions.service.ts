import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Question} from "../models/question";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private url = `${environment.apiUrl}questions/`;

  constructor(private http: HttpClient) { }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.url, question);
  }

  public getAllQuestionsByTestSubjectID(testSubjectId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.url}?testSubjectId=${testSubjectId}`)
  }
}
