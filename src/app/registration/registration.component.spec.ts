import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationService } from '../registration.service';

import { RegistrationComponent } from './registration.component';
import { constants } from '../constants/constants';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  const mockService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [
        { provide: RegistrationService, useValue: mockService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('showExtraLunch()', () => {
    it('should set extraLunch to true and show lunch fields', () => {
      component.extraLunch = false;
      component.showExtraLunch();
      fixture.detectChanges();
      expect(component.extraLunch).toEqual(true);
      expect(document.getElementById('lunch1')).toBeTruthy();
      expect(document.getElementById('lunch2')).toBeTruthy();
      expect(document.getElementById('lunch3')).toBeTruthy();
      expect(document.getElementById('lunch4')).toBeTruthy();
    });
  });

  describe('hideExtraLunch()', () => {
    it('should set extraLunch to true and clear lunch fields', () => {
      component.showExtraLunch();
      fixture.detectChanges();
      (<HTMLInputElement>document.getElementById('lunch1')).value = 'Helly R';
      (<HTMLInputElement>document.getElementById('lunch2')).value = 'Mark S';
      (<HTMLInputElement>document.getElementById('lunch3')).value = 'Dylan';
      (<HTMLInputElement>document.getElementById('lunch4')).value = 'Irving';
      component.hideExtraLunch();
      fixture.detectChanges();
      expect(component.extraLunch).toEqual(false);
      expect(document.getElementById('lunch1')).toBeNull();
      expect(document.getElementById('lunch2')).toBeNull();
      expect(document.getElementById('lunch3')).toBeNull();
      expect(document.getElementById('lunch4')).toBeNull();
    });
  });

  describe('showExtraGolfers()', () => {
    it('should set extraGolfers to true and show additional golfer section', () => {
      component.extraGolfers = false;
      component.showExtraGolfers();
      fixture.detectChanges();
      expect(document.getElementById('additionalGolferSection')).toBeTruthy();
      expect(component.extraGolfers).toEqual(true);
    });
  });

  describe('hideExtraGolfers()', () => {
    it('should set extraGolfers to true and hide additional golfer section', () => {
      component.extraGolfers = true;
      component.hideExtraGolfers();
      fixture.detectChanges();
      expect(document.getElementById('additionalGolferSection')).toBeNull();
      expect(component.extraGolfers).toEqual(false);
    });
  });

  describe('showExtraRaffle()', () => {
    it('should set extraRaffle to true and show raffle section', () => {
      component.extraRaffle = false;
      component.showExtraRaffle();
      fixture.detectChanges();
      expect(document.getElementById('raffleTickets')).toBeTruthy();
      expect(component.extraRaffle).toEqual(true);
    });
  });

  describe('hideExtraRaffle()', () => {
    it('should set extraRaffle to true', () => {
      component.extraRaffle = true;
      component.hideExtraRaffle();
      fixture.detectChanges();
      expect(document.getElementById('raffleTickets')).toBeNull();
      expect(component.extraRaffle).toEqual(false);
    });
  });

  describe('calculateTotalCost()', () => {
    describe('initial participation calculation', () => {
      it('sets initial values for scarlet', () => {
        const participation = <HTMLInputElement>document.getElementById('scarlet');
        participation.click();
        component.calculateTotalCost();
        fixture.detectChanges();
        expect(component.totalCost).toEqual(constants.scarletPrice);
        expect(component.totalLunches).toEqual(4);
        expect(component.totalGolfers).toEqual(4);
        expect(component.holeSponsor).toBe(true);
        expect(component.totalRaffleTickets).toEqual(12);
        expect(component.skippingGolf).toBe(false);
        expect(component.raffleIncluded).toBe(true);
      });

      it('sets initial values for gray', () => {
        const participation = <HTMLInputElement>document.getElementById('gray');
        participation.click();
        component.calculateTotalCost();
        fixture.detectChanges();
        expect(component.totalCost).toEqual(constants.grayPrice);
        expect(component.totalLunches).toEqual(2);
        expect(component.totalGolfers).toEqual(2);
        expect(component.holeSponsor).toBe(true);
        expect(component.totalRaffleTickets).toEqual(6);
        expect(component.skippingGolf).toBe(false);
        expect(component.raffleIncluded).toBe(true);
      });

      it('sets initial values for holeSponsor', () => {
        const participation = <HTMLInputElement>document.getElementById('holeSponsor');
        participation.click();
        component.calculateTotalCost();
        fixture.detectChanges();
        expect(component.totalCost).toEqual(constants.holeSponsorPrice);
        expect(component.totalLunches).toEqual(0);
        expect(component.totalGolfers).toEqual(0);
        expect(component.holeSponsor).toBe(true);
        expect(component.totalRaffleTickets).toEqual(0);
        expect(component.skippingGolf).toBe(true);
        expect(component.raffleIncluded).toBe(false);
      });

      it('sets initial values for golf', () => {
        const participation = <HTMLInputElement>document.getElementById('golf');
        participation.click();
        component.calculateTotalCost();
        fixture.detectChanges();
        expect(component.totalCost).toEqual(constants.singlePrice);
        expect(component.totalLunches).toEqual(1);
        expect(component.totalGolfers).toEqual(1);
        expect(component.holeSponsor).toBe(false);
        expect(component.totalRaffleTickets).toEqual(3);
        expect(component.skippingGolf).toBe(false);
        expect(component.raffleIncluded).toBe(true);
      });

      it('sets initial values for lunchOnly', () => {
        const participation = <HTMLInputElement>document.getElementById('lunchOnly');
        participation.click();
        component.calculateTotalCost();
        fixture.detectChanges();
        expect(component.totalCost).toEqual(constants.lunchPrice);
        expect(component.totalLunches).toEqual(1);
        expect(component.totalGolfers).toEqual(0);
        expect(component.holeSponsor).toBe(false);
        expect(component.totalRaffleTickets).toEqual(0);
        expect(component.skippingGolf).toBe(true);
        expect(component.raffleIncluded).toBe(false);
      });
    })
  });
});
