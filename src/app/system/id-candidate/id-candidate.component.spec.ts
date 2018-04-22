import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCandidateComponent } from './id-candidate.component';

describe('IdCandidateComponent', () => {
  let component: IdCandidateComponent;
  let fixture: ComponentFixture<IdCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
