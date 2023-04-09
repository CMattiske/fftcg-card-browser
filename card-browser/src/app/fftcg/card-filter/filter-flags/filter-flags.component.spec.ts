import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFlagsComponent } from './filter-flags.component';

describe('FilterFlagsComponent', () => {
  let component: FilterFlagsComponent;
  let fixture: ComponentFixture<FilterFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFlagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
