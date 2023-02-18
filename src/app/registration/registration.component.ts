import { Component } from '@angular/core';
import { constants } from '../constants/constants';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private registrationService: RegistrationService) {}

  totalCost: number = 0;
  totalLunches: number = 0;
  totalGolfers: number = 0;
  holeSponsor: boolean = false;
  totalRaffleTickets: number = 0;
  extraLunch: boolean = false;
  extraRaffle: boolean = false;
  skippingGolf: boolean = false;
  raffleIncluded: boolean = false;
  participation: string = '';
  donation: number = 0;
  GOLF = constants;

  public calculateTotalCost(): void {
    this.participation = (<any>document.forms)['golfSignup'].elements['participation'].value;
    if (this.participation == 'scarlet') {
      this.totalCost = this.GOLF.scarletPrice;
      this.totalLunches = 4;
      this.totalGolfers = 4;
      this.holeSponsor = true;
      this.totalRaffleTickets = 12;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (this.participation == 'gray') {
      this.totalCost = this.GOLF.grayPrice;
      this.totalLunches = 2;
      this.totalGolfers = 2;
      this.holeSponsor = true;
      this.totalRaffleTickets = 6;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (this.participation == 'single') {
      this.totalCost = this.GOLF.singlePrice;
      this.totalLunches = 1;
      this.totalGolfers = 1;
      this.holeSponsor = false;
      this.totalRaffleTickets = 3;
      this.skippingGolf = false;
      this.raffleIncluded = true;
    } else if (this.participation == 'holeSponsor') {
      this.totalCost = this.GOLF.holeSponsorPrice;
      this.totalLunches = 1;
      this.totalGolfers = 0;
      this.holeSponsor = true;
      this.totalRaffleTickets = 0;
      this.skippingGolf = true;
      this.raffleIncluded = false;
    } else if (this.participation == 'lunchOnly') {
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
      if(this.elementHasValue('lunch1')) {
        this.totalCost += this.GOLF.lunchPrice;
        this.totalLunches ++;
      }
      if(this.elementHasValue('lunch2')) {
        this.totalCost += this.GOLF.lunchPrice;
        this.totalLunches ++;
      }
      if(this.elementHasValue('lunch3')) {
        this.totalCost += this.GOLF.lunchPrice;
        this.totalLunches ++;
      }
      if(this.elementHasValue('lunch4')) {
        this.totalCost += this.GOLF.lunchPrice;
        this.totalLunches ++;
      }
    }
    if(this.elementHasValue('raffle')) {
      const raffleTickets = +(<HTMLInputElement>document.getElementById('raffle')).value;
      const raffleCost = raffleTickets * 20 / 8;
      this.totalCost += raffleCost;
      this.totalRaffleTickets += raffleTickets;
    }
    if(this.elementHasValue('donation')) {
      this.donation = +(<HTMLInputElement>document.getElementById('donation')).value;
      this.totalCost += this.donation;
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

  private clearField(id: string): void {
    if ((<HTMLInputElement>document.getElementById(id))) {
      (<HTMLInputElement>document.getElementById('lunch1')).value = '';
    }
  }

  private elementHasValue(id: string): boolean {
    return !!((<HTMLInputElement>document.getElementById(id)) && (<HTMLInputElement>document.getElementById(id)).value);
  }

  public submitRegistration(): void {
    let comments = '';
    if(this.elementHasValue('comments')){
      comments = (<HTMLInputElement>document.getElementById('comments')).value;
    }
    const body = {
      participation: this.participation,
      totalCost: this.totalCost,
      totalGolfers: this.totalGolfers,
      totalLunches: this.totalLunches,
      donation: this.donation,
      comments,
      primaryName: "Joe",
      primaryEmail: "osu5nc@gmail.com",
      primaryMailingAddress: "123 Fake Street",
      primaryCity: "Bradenton",
      primaryState: "FL",
      primaryZip: "12345",
      primaryPhone: "555-555-5555",
      lunch2Name: "Hope Ramer"
    };
    this.registrationService.register(body).subscribe(() => {
      alert('Registration Complete!');
    });
  }
}
