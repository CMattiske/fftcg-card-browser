import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeEditorComponent } from './cube-editor.component';

describe('CubeEditorComponent', () => {
  let component: CubeEditorComponent;
  let fixture: ComponentFixture<CubeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
