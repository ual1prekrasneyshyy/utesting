import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {TestSubject} from "../models/test.subject";

@Injectable({
  providedIn: 'root'
})
export class TestSubjectsService {

  private url = `${environment.apiUrl}testsubjects/`;

  constructor(private http: HttpClient) { }

  public getAllTestSubjects(): Observable<TestSubject[]> {
    return this.http.get<TestSubject[]>(this.url);
  }

  public getAllTestSubjectsWithDeleted(): Observable<TestSubject[]> {
    return this.http.get<TestSubject[]>(`${this.url}?withDeleted=true`);
  }
}
