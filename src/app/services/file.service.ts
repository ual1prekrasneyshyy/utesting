import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = environment.apiUrl+'files/';

  constructor(private http: HttpClient) { }

  public uploadImage(imageFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', imageFile, imageFile.name)
    return this.http.post<any>(`${this.url}save/image`, formData);
  }

  public viewImage(imageFileName: string): Observable<any>{
    return this.http.get(`${this.url}view/image/${imageFileName}`);
  }
}
