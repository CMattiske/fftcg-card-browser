import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeBreakdownComponent } from './cube-breakdown.component';

describe('CubeBreakdownComponent', () => {
  let component: CubeBreakdownComponent;
  let fixture: ComponentFixture<CubeBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeBreakdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
