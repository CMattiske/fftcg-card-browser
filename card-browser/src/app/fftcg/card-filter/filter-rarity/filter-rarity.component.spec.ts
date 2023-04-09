import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRarityComponent } from './filter-rarity.component';

describe('FilterRarityComponent', () => {
  let component: FilterRarityComponent;
  let fixture: ComponentFixture<FilterRarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRarityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
