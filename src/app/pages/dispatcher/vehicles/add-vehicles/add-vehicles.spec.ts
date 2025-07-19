import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicles } from './add-vehicles';

describe('AddVehicles', () => {
  let component: AddVehicles;
  let fixture: ComponentFixture<AddVehicles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
