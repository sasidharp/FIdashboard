import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRcharterComponent } from './hrcharter.component';

describe('HRcharterComponent', () => {
  let component: HRcharterComponent;
  let fixture: ComponentFixture<HRcharterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRcharterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRcharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
