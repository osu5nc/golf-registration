import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GolfDataService {
  confirmationNumber: string = '';

  amountDue: number = 0;
}
