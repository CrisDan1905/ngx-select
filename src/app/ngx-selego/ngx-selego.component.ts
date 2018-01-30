import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-selego',
  templateUrl: './ngx-selego.component.html',
  styleUrls: ['./ngx-selego.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxSelegoComponent,
    multi: true
  }]
})

export class NgxSelegoComponent implements OnInit, ControlValueAccessor {

  private value: any;
  private onChange: Function;

  constructor() { }

  ngOnInit() {

  }

  writeValue(value: any) {
    this.value = value;
    console.log(value);
  }

  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { }

}

