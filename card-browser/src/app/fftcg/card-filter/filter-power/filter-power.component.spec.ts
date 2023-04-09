import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPowerComponent } from './filter-power.component';

describe('FilterPowerComponent', () => {
  let component: FilterPowerComponent;
  let fixture: ComponentFixture<FilterPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
