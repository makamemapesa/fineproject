import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emergencies } from './emergencies';

describe('Emergencies', () => {
  let component: Emergencies;
  let fixture: ComponentFixture<Emergencies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emergencies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emergencies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
