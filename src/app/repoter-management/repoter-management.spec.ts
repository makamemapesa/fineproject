import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoterManagement } from './repoter-management';

describe('RepoterManagement', () => {
  let component: RepoterManagement;
  let fixture: ComponentFixture<RepoterManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoterManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoterManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
