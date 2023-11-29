import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { CardBrowserComponent } from './card-browser/card-browser.component';
import { CardGalleryComponent } from './card-gallery/card-gallery.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { FilterCostComponent } from './card-filter/filter-cost/filter-cost.component';
import { FilterElementsComponent } from './card-filter/filter-elements/filter-elements.component';
import { FilterFlagsComponent } from './card-filter/filter-flags/filter-flags.component';
import { FilterListComponent } from './card-filter/filter-list/filter-list.component';
import { FilterNameComponent } from './card-filter/filter-name/filter-name.component';
import { FilterPowerComponent } from './card-filter/filter-power/filter-power.component';
import { FilterTextComponent } from './card-filter/filter-text/filter-text.component';
import { FilterTypeComponent } from './card-filter/filter-type/filter-type.component';
import { FilterStringArrayComponent } from './card-filter/filter-string-array/filter-string-array.component';
import { SharedModule } from '../shared/shared.module';
import { FilterRarityComponent } from './card-filter/filter-rarity/filter-rarity.component';
import { CubeEditorComponent } from './cube-editor/cube-editor.component';
import { CubesComponent } from './cubes/cubes.component';
import { CubeBreakdownComponent } from './cube-breakdown/cube-breakdown.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DisplayCategoriesPipe } from './pipes/display-categories.pipe';
import { DisplayJobsPipe } from './pipes/display-jobs.pipe';
import { DisplayRarityPipe } from './pipes/display-rarity.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { DeckListEditorComponent } from './deck-list-editor/deck-list-editor.component';
import { DecksComponent } from './deck-lists/decks.component';

@NgModule({
  declarations: [
    CardBrowserComponent,
    CardGalleryComponent,
    CardFilterComponent,
    FilterCostComponent,
    FilterElementsComponent,
    FilterFlagsComponent,
    FilterListComponent,
    FilterNameComponent,
    FilterPowerComponent,
    FilterTextComponent,
    FilterTypeComponent,
    FilterStringArrayComponent,
    FilterRarityComponent,
    CubeEditorComponent,
    CubesComponent,
    CubeBreakdownComponent,
    CardDetailsComponent,
    DisplayCategoriesPipe,
    DisplayJobsPipe,
    DisplayRarityPipe,
    CardTextPipe,
    DeckListEditorComponent,
    DecksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'cards', component: CardBrowserComponent},
      {
        path: 'cubes',
        component: CubesComponent,
        canDeactivate: [(component: CubesComponent) => component.pendingCubes.length === 0],
      },
      {
        path: 'deckLists',
        component: DecksComponent,
      },
      { path: 'cards/:id', component: CardDetailsComponent},
    ]),

    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,

    SharedModule,
  ]
})
export class FFTCGModule { }
