import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../constants/constants';
import { GolfDataService } from '../golf-data.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(
    private registrationService: RegistrationService,
    private golfDataService: GolfDataService,
    private router: Router
  ) {}

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

  invalidName = false;
  invalidAddress = false;
  invalidCity = false;
  invalidZip = false;
  invalidEmail = false;
  invalidPhone = false;
  emptyZip = false;

  invalidName2 = false;
  invalidAddress2 = false;
  invalidCity2 = false;
  invalidZip2 = false;
  invalidEmail2 = false;
  invalidPhone2 = false;
  emptyZip2 = false;

  invalidName3 = false;
  invalidAddress3 = false;
  invalidCity3 = false;
  invalidZip3 = false;
  invalidEmail3 = false;
  invalidPhone3 = false;
  emptyZip3 = false;

  invalidName4 = false;
  invalidAddress4 = false;
  invalidCity4 = false;
  invalidZip4 = false;
  invalidEmail4 = false;
  invalidPhone4 = false;
  emptyZip4 = false;

  public calculateTotalCost(): void {
    this.participation = (<any>document.forms)['golfSignup'].elements['participation'].value;
    if(this.participation) {
      this.hideElement('invalidParticipation');
    }
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
      this.totalLunches = 0;
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
    if(this.extraLunch) {
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

  private validateForm(): boolean {
    const zipRegex = /^\d{5}$/;
    let formValid = true;
    if (this.participation === '') {
      this.showElement('invalidParticipation');
      formValid = false;
    } else {
      if (this.getHTMLValue('name1') === '') {
        formValid = false;
        this.invalidName = true;
      }
      if (this.getHTMLValue('address1') === '') {
        formValid = false;
        this.invalidAddress = true;
      }
      if (this.getHTMLValue('city1') === '') {
        formValid = false;
        this.invalidCity = true;
      }
      if (this.getHTMLValue('zip1') === '') {
        formValid = false;
        this.emptyZip = true;
      } else if (!zipRegex.test(this.getHTMLValue('zip1'))) {
        formValid = false;
        this.invalidZip = true;
      }
      if (this.getHTMLValue('email1') === '') {
        formValid = false;
        this.invalidEmail = true;
      }
      if (this.getHTMLValue('phone1') === '') {
        formValid = false;
        this.invalidPhone = true;
      }
    }
    if (this.elementHasValue('name2')) {
      if(this.getHTMLValue('address2') === '') {
        formValid = false;
        this.invalidAddress2 = true;
      }
      if (this.getHTMLValue('city2') === '') {
        formValid = false;
        this.invalidCity2 = true;
      }
      if (this.getHTMLValue('zip2') === '') {
        formValid = false;
        this.emptyZip2 = true;
      } else if (!zipRegex.test(this.getHTMLValue('zip2'))) {
        formValid = false;
        this.invalidZip2 = true;
      }
      if (this.getHTMLValue('email2') === '') {
        formValid = false;
        this.invalidEmail2 = true;
      }
      if (this.getHTMLValue('phone2') === '') {
        formValid = false;
        this.invalidPhone2 = true;
      }
    } else if (this.elementHasValue('address2')) {
      this.invalidName2 = true;
      formValid = false;
    }
    if (this.elementHasValue('name3')) {
      if(this.getHTMLValue('address3') === '') {
        formValid = false;
        this.invalidAddress3 = true;
      }
      if (this.getHTMLValue('city3') === '') {
        formValid = false;
        this.invalidCity3 = true;
      }
      if (this.getHTMLValue('zip3') === '') {
        formValid = false;
        this.emptyZip3 = true;
      } else if (!zipRegex.test(this.getHTMLValue('zip3'))) {
        formValid = false;
        this.invalidZip3 = true;
      }
      if (this.getHTMLValue('email3') === '') {
        formValid = false;
        this.invalidEmail3 = true;
      }
      if (this.getHTMLValue('phone3') === '') {
        formValid = false;
        this.invalidPhone3 = true;
      }
    } else if (this.elementHasValue('address3')) {
      this.invalidName3 = true;
      formValid = false;
    }
    if (this.elementHasValue('name4')) {
      if(this.getHTMLValue('address4') === '') {
        formValid = false;
        this.invalidAddress4 = true;
      }
      if (this.getHTMLValue('city4') === '') {
        formValid = false;
        this.invalidCity4 = true;
      }
      if (this.getHTMLValue('zip4') === '') {
        formValid = false;
        this.emptyZip4 = true;
      } else if (!zipRegex.test(this.getHTMLValue('zip4'))) {
        formValid = false;
        this.invalidZip4 = true;
      }
      if (this.getHTMLValue('email4') === '') {
        formValid = false;
        this.invalidEmail4 = true;
      }
      if (this.getHTMLValue('phone4') === '') {
        formValid = false;
        this.invalidPhone4 = true;
      }
    } else if (this.elementHasValue('address4')) {
      this.invalidName4 = true;
      formValid = false;
    }
    return formValid;
  }

  public submitRegistration(): void {
    if(this.validateForm()) {
      this.postRegistration();
    } else {
      this.showElement('invalidForm');
      window.scrollTo(0,0);
    }
  }

  private postRegistration() {
    let comments = '';
    if(this.elementHasValue('comments')){
      comments = this.getHTMLValue('comments');
    }
    const body: any = {
      participation: this.participation,
      totalCost: this.totalCost,
      totalGolfers: this.totalGolfers,
      totalLunches: this.totalLunches,
      donation: this.donation,
      holeSponsor: this.holeSponsor,
      totalRaffleTickets: this.totalRaffleTickets,
      comments,
      primaryName: this.getHTMLValue('name1'),
      primaryEmail: this.getHTMLValue('email1'),
      primaryMailingAddress: this.getHTMLValue('address1'),
      primaryCity: this.getHTMLValue('city1'),
      primaryState: this.getHTMLValue('state1'),
      primaryZip: this.getHTMLValue('zip1'),
      primaryPhone: this.getHTMLValue('phone1')
      
    };
    this.setGolfer('2', body);
    this.setGolfer('3', body);
    this.setGolfer('4', body);
    this.setLunch('1', body);
    this.setLunch('2', body);
    this.setLunch('3', body);
    this.setLunch('4', body);
    this.registrationService.register(body).subscribe((response) => {
      this.golfDataService.confirmationNumber = response._id;
      this.golfDataService.amountDue = response.totalCost;
      this.router.navigateByUrl('payment');
    });
  }

  private setGolfer(id: string, body: any): void {
    if(this.elementHasValue(`name${id}`)){
      body[`golfer${id}Name`] = this.getHTMLValue(`name${id}`);
      body[`golfer${id}Email`] = this.getHTMLValue(`email${id}`);
      body[`golfer${id}MailingAddress`] = this.getHTMLValue(`address${id}`);
      body[`golfer${id}City`] = this.getHTMLValue(`city${id}`);
      body[`golfer${id}State`] = this.getHTMLValue(`state${id}`);
      body[`golfer${id}Zip`] = this.getHTMLValue(`zip${id}`);
      body[`golfer${id}Phone`] = this.getHTMLValue(`phone${id}`);
    }
  }

  private setLunch(id: string, body: any): void {
    if(this.elementHasValue(`lunch${id}`)){
      body[`lunch${id}Name`] = this.getHTMLValue(`lunch${id}`);
    }
  }

  private showElement(id: string) {
    (<HTMLElement>document.getElementById(id)).style.display = 'block';
  }

  private hideElement(id: string) {
    (<HTMLElement>document.getElementById(id)).style.display = 'none';
  }
}
