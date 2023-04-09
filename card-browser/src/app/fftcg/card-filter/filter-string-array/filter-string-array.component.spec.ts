import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStringArrayComponent } from './filter-string-array.component';

describe('FilterStringArrayComponent', () => {
  let component: FilterStringArrayComponent;
  let fixture: ComponentFixture<FilterStringArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStringArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStringArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
