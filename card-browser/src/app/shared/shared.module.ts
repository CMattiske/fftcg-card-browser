import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullToEmptyPipe } from './pipes/null-to-empty.pipe';

@NgModule({
  declarations: [
    NullToEmptyPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NullToEmptyPipe,
  ]
})
export class SharedModule { }
