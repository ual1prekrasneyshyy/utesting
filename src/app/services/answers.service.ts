import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../models/answer";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private url = environment.apiUrl + '/answers/';

  constructor(private  http: HttpClient) { }


  public addAnswer(answer: Answer): Observable<Answer>{
    return this.http.post<Answer>(this.url, answer);
  }
}
