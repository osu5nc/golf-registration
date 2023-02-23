import { Component } from '@angular/core';
import { GolfDataService } from '../golf-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  constructor (public golfDataService: GolfDataService) {}
}
