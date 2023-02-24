import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationService } from '../registration.service';

import { RegistrationComponent } from './registration.component';

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
    it('should set extraGolfers to true', () => {
      component.extraGolfers = false;
      component.showExtraGolfers();
      expect(component.extraGolfers).toEqual(true);
    });
  });

  describe('hideExtraGolfers()', () => {
    it('should set extraGolfers to true', () => {
      component.extraGolfers = true;
      component.hideExtraGolfers();
      expect(component.extraGolfers).toEqual(false);
    });
  });
});
