import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmergency } from './view-emergency';

describe('ViewEmergency', () => {
  let component: ViewEmergency;
  let fixture: ComponentFixture<ViewEmergency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEmergency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmergency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
