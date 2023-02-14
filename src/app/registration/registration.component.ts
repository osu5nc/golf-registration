import { Component } from '@angular/core';
import { constants } from '../constants/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor() {}

  totalCost: number = 0;
  totalLunches: number = 0;
  totalGolfers: number = 0;
  holeSponsor: boolean = false;
  totalRaffleTickets: number = 0;
  extraLunch: boolean = false;
  extraRaffle: boolean = false;
  skippingGolf: boolean = false;
  raffleIncluded: boolean = false;
  GOLF = constants;

  public calculateTotalCost(): void {
    const participation = (<any>document.forms)['golfSignup'].elements['participation'].value;
    if (participation == 'scarlet') {
      this.totalCost = this.GOLF.scarletPrice;
      this.totalLunches = 4;
      this.totalGolfers = 4;
      this.holeSponsor = true;
      this.totalRaffleTickets = 12;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (participation == 'gray') {
      this.totalCost = this.GOLF.grayPrice;
      this.totalLunches = 2;
      this.totalGolfers = 2;
      this.holeSponsor = true;
      this.totalRaffleTickets = 6;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (participation == 'single') {
      this.totalCost = this.GOLF.singlePrice;
      this.totalLunches = 1;
      this.totalGolfers = 1;
      this.holeSponsor = false;
      this.totalRaffleTickets = 3;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (participation == 'holeSponsor') {
      this.totalCost = this.GOLF.holeSponsorPrice;
      this.totalLunches = 1;
      this.totalGolfers = 0;
      this.holeSponsor = true;
      this.totalRaffleTickets = 0;
      this.skippingGolf = true;
      this.raffleIncluded = false;
    } else if (participation == 'lunchOnly') {
      this.totalCost = this.GOLF.lunchPrice;
      this.totalLunches = 1;
      this.totalGolfers = 0;
      this.holeSponsor = false;
      this.totalRaffleTickets = 0;
      this.skippingGolf = true;
      this.raffleIncluded = false;
    }
    else {
      this.totalCost = 0;
      this.totalLunches = 0;
      this.totalGolfers = 0;
      this.holeSponsor = false;
      this.totalRaffleTickets = 0;
    }
    if(this.extraLunch || this.holeSponsor) {
      if((<HTMLInputElement>document.getElementById('lunch1')) && (<HTMLInputElement>document.getElementById('lunch1')).value) {
        this.totalCost += this.GOLF.lunchPrice;
      }
      if((<HTMLInputElement>document.getElementById('lunch2')) && (<HTMLInputElement>document.getElementById('lunch2')).value) {
        this.totalCost += this.GOLF.lunchPrice;
      }
      if((<HTMLInputElement>document.getElementById('lunch3')) && (<HTMLInputElement>document.getElementById('lunch3')).value) {
        this.totalCost += this.GOLF.lunchPrice;
      }
      if((<HTMLInputElement>document.getElementById('lunch4')) && (<HTMLInputElement>document.getElementById('lunch4')).value) {
        this.totalCost += this.GOLF.lunchPrice;
      }
    }
    if((<HTMLInputElement>document.getElementById('raffle')) && (<HTMLInputElement>document.getElementById('raffle')).value) {
      const raffleTickets = +(<HTMLInputElement>document.getElementById('raffle')).value;
      const raffleCost = raffleTickets * 20 / 8;
      this.totalCost += raffleCost;
      this.totalRaffleTickets += raffleTickets;
    }
    if((<HTMLInputElement>document.getElementById('donation')) && (<HTMLInputElement>document.getElementById('donation')).value) {
      const donation = +(<HTMLInputElement>document.getElementById('donation')).value;
      this.totalCost += donation;
    }
  }

  public showExtraLunch(): void {
    this.extraLunch = true;
  }

  public hideExtraLunch() : void {
    this.extraLunch = false;
    this.clearField('lunch1');
    this.clearField('lunch2');
    this.clearField('lunch3');
    this.clearField('lunch4');
  }

  public showExtraRaffle(): void {
    this.extraRaffle = true;
  }

  public hideExtraRaffle(): void {
    this.extraRaffle = false;
  }

  private clearField(id: string) {
    if ((<HTMLInputElement>document.getElementById(id))) {
      (<HTMLInputElement>document.getElementById('lunch1')).value = '';
    }
  }
}
