import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListEditorComponent } from './deck-list-editor.component';

describe('DeckListEditorComponent', () => {
  let component: DeckListEditorComponent;
  let fixture: ComponentFixture<DeckListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
