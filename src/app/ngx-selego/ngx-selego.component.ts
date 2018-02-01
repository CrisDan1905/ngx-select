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

  @Input() data: NgxSelego[] = [ 
  { id: '1', label: 'Jorge Verbel'}, 
  { id: '2', label: 'Alejandra Rojas'}, 
  { id: '3', label: 'Abrahan Uribe Ruz'}, 
  { id: '4', label: 'Danilo Gutierrez'}, 
  { id: '5', label: 'Juan Cardona'}, 
  { id: '6', label: 'Henry Cano'}, 
  { id: '7', label: 'Nelson Usuga'}, 
  { id: '8', label: 'Jimmy Romero'}, 
  { id: '9', label: 'Enrique Mejía'}, 
  { id: '10', label: 'Eliana Londoño'}, 
  { id: '11', label: 'Jorge Cuellar'}, 
  { id: '12', label: 'Paola Cuellar'}, 
  { id: '13', label: 'Fabio Cano'}, 
  { id: '14', label: 'Julian Lopera'}, 
  { id: '15', label: 'Dorian Gomez'},
  { id: '2', label: 'Elkin Bernal'}];

  private value: any;
  private onChange: Function;
  private copyData: Array<Object> = [];
  private searchSelect: string = "";

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

  selectItem ($event, register){
    this.valueChanged(register);
    this.setValueSearch(register)
  }

  hideList () {
    this.copyData.length = 0;
  }

  setValueSearch (obj) {
    this.searchSelect = obj.label;
    this.hideList();
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { }

  private valueChanged(value: any) {
    this.onChange(value.id);
  }

}

