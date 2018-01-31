import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelegoComponent } from './ngx-selego.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgxSelegoComponent],
  exports: [
    NgxSelegoComponent
  ]
})
export class NgxSelegoModule { }
