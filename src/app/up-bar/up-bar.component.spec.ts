import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpBarComponent } from './up-bar.component';

describe('UpBarComponent', () => {
  let component: UpBarComponent;
  let fixture: ComponentFixture<UpBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
