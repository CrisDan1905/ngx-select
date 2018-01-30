import { NgxSelegoModule } from './ngx-selego/ngx-selego.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSelegoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
