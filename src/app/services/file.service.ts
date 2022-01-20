import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = environment.apiUrl+'files/';

  constructor(private http: HttpClient) { }

  public uploadImage(imageFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', imageFile)
    return this.http.post<any>(`${this.url}save/image`, formData);
  }

  public viewImage(imageFileName: string): Observable<number[]>{
    return this.http.get<number[]>(`${this.url}view/image/${imageFileName}`)
  }
}