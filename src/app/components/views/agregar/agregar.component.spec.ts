import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComponent } from './agregar.component';

describe('AgregarComponent', () => {
  let agregarComponent: AgregarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgregarComponent],
    });
    agregarComponent = TestBed.createComponent(AgregarComponent);
  });

  it('should create', () => {
    expect(agregarComponent).toBeTruthy();
  });
});
