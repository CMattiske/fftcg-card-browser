import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCostComponent } from './filter-cost.component';

describe('FilterCostComponent', () => {
  let component: FilterCostComponent;
  let fixture: ComponentFixture<FilterCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
