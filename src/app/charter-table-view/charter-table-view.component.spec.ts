import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharterTableViewComponent } from './charter-table-view.component';

describe('CharterTableViewComponent', () => {
  let component: CharterTableViewComponent;
  let fixture: ComponentFixture<CharterTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharterTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharterTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
