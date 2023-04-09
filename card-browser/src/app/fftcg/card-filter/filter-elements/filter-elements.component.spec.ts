import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterElementsComponent } from './filter-elements.component';

describe('FilterElementsComponent', () => {
  let component: FilterElementsComponent;
  let fixture: ComponentFixture<FilterElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
