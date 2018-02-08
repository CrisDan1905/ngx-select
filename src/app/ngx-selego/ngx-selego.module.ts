import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelegoComponent } from './ngx-selego.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule
  ],
  declarations: [NgxSelegoComponent],
  exports: [
    NgxSelegoComponent
  ]
})
export class NgxSelegoModule { }
