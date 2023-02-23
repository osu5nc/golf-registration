import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor (private httpClient: HttpClient) { }

  register (body: any): Observable<any> {
    const url = 'https://gb8fbwclgf.execute-api.us-east-1.amazonaws.com/dev/register';
    return this.httpClient.post(url, body);
  }
}
