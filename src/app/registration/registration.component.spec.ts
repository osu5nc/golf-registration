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
    it('should set extraLunch to true', () => {
      component.extraLunch = false;
      component.showExtraLunch();
      expect(component.extraLunch).toEqual(true);
    });
  });

  describe('hideExtraLunch()', () => {
    it('should set extraLunch to true', () => {
      component.extraLunch = true;
      component.hideExtraLunch();
      expect(component.extraLunch).toEqual(false);
    });
  });
});
