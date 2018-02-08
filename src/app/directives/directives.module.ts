import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassChangedDirective } from './class-changed.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ClassChangedDirective ],
  exports: [ ClassChangedDirective ]
})
export class DirectivesModule { }