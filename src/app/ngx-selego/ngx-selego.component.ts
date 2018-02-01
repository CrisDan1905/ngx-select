import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgxSelego } from '../interfaces/ngx-selego.interface';

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

  @Input() data: NgxSelego[] = [{id: '2', label: 'Elkin Bernal'}, 
  { id: '1', label: 'Jorge Verbel'}, 
  { id: '1', label: 'Alejandra Rojas'}, 
  { id: '1', label: 'Abrahan Uribe Ruz'}, 
  { id: '1', label: 'Danilo Gutierrez'}, 
  { id: '1', label: 'Juan Cardona'}, 
  { id: '1', label: 'Henry Cano'}, 
  { id: '1', label: 'Nelson Usuga'}, 
  { id: '1', label: 'Jimmy Romero'}, 
  { id: '1', label: 'Enrique Mejía'}, 
  { id: '1', label: 'Eliana Londoño'}, 
  { id: '1', label: 'Jorge Cuellar'}, 
  { id: '1', label: 'Paola Cuellar'}, 
  { id: '1', label: 'Fabio Cano'}, 
  { id: '1', label: 'Julian Lopera'}, 
  { id: '1', label: 'Dorian Gomez'}];

  private value: any;
  private onChange: Function;
  private copyData: Array<Object> = [];

  constructor() { }

  ngOnInit() {
    let copy = this.data.slice()
  }


  searchItem (e) {
    let value = e.target.innerText;
    if(value)
      this.copyData = this.data.filter((e) => e.label.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    else 
      this.copyData.length = 0;
  }

  selectItem (item){

  }

  setValueSearch (value) {
    
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { }

  private valueChanged(event: any) {
    this.onChange(event.target.value);
  }

}

