import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Test} from "../models/test";


@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private url = environment.apiUrl + "tests/";

  constructor(private http: HttpClient) { }

  public getAllTests(): Observable<Test[]>{
    return this.http.get<Test[]>(this.url);
  }

  public getAllTestsWithDeleted(): Observable<Test[]>{
    return this.http.get<Test[]>(`${this.url}?withDeleted=true`);
  }

  public getAllTestsByTestSubjectId(testSubjectId: bigint): Observable<Test[]>{
    return this.http.get<Test[]>(`${this.url}?testSubjectId=${testSubjectId}`);
  }

  public getAllTestsWithDeletedByTestSubjectId(testSubjectId: bigint): Observable<Test[]>{
    return this.http.get<Test[]>(`${this.url}?testSubjectId=${testSubjectId}&deleted=true`);
  }

  public getTestById(testId: bigint): Observable<Test>{
    return this.http.get<Test>(`${this.url}${testId}`);
  }

  public getTestByVariantAndTestSubjectId(variant: number, testSubjectId: bigint): Observable<Test>{
    return this.http.get<Test>(`${this.url}${variant}/variant?testSubjectId=${testSubjectId}`)
  }

  public addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.url, test)
  }

}
