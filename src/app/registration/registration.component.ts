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
      const raffleTickets = +this.getHTMLValue('raffle');
      const raffleCost = raffleTickets * 20 / 8;
      this.totalCost += raffleCost;
      this.totalRaffleTickets += raffleTickets;
    }
    if(this.elementHasValue('donation')) {
      this.donation = +this.getHTMLValue('donation');
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

  private getHTMLValue(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
  }

  public submitRegistration(): void {
    let comments = '';
    if(this.elementHasValue('comments')){
      comments = this.getHTMLValue('comments');
    }
    const body = {
      participation: this.participation,
      totalCost: this.totalCost,
      totalGolfers: this.totalGolfers,
      totalLunches: this.totalLunches,
      donation: this.donation,
      holeSponsor: this.holeSponsor,
      comments,
      primaryName: this.getHTMLValue('name1'),
      primaryEmail: this.getHTMLValue('email1'),
      primaryMailingAddress: this.getHTMLValue('address1'),
      primaryCity: this.getHTMLValue('city1'),
      primaryState: this.getHTMLValue('state1'),
      primaryZip: this.getHTMLValue('zip1'),
      primaryPhone: this.getHTMLValue('phone1')
    };
    this.registrationService.register(body).subscribe((response) => {
      alert('Confirmation Number:' + response._id);
    });
  }
}
