import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    CubesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'cards', component: CardBrowserComponent},
      { path: 'cubes', component: CubesComponent},
      // { path: 'cards/:id', component: CardDetailsComponent},
    ]),

    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    SharedModule,
  ]
})
export class FFTCGModule { }
