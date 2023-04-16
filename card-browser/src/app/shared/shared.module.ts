import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullToEmptyPipe } from './pipes/null-to-empty.pipe';
import { NullToEmptySetPipe } from './pipes/null-to-empty-set.pipe';

@NgModule({
  declarations: [
    NullToEmptyPipe,
    NullToEmptySetPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NullToEmptyPipe,
    NullToEmptySetPipe,
  ]
})
export class SharedModule { }
