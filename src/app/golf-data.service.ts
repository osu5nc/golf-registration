import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GolfDataService {

  constructor() { }

  confirmationNumber: string = '';

  amountDue: number = 0;
}