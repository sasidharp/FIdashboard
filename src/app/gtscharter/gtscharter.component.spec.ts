import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtscharterComponent } from './gtscharter.component';

describe('GtscharterComponent', () => {
  let component: GtscharterComponent;
  let fixture: ComponentFixture<GtscharterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtscharterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtscharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
