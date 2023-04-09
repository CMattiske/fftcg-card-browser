import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubesComponent } from './cubes.component';

describe('CubesComponent', () => {
  let component: CubesComponent;
  let fixture: ComponentFixture<CubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
