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
  { id: '4', label: 'Danilo Gutierrez', icon: 'https://image.flaticon.com/icons/png/128/321/321828.png'}, 
  { id: '5', label: 'Juan Cardona'}, 
  { id: '6', label: 'Henry Cano'}, 
  { id: '7', label: 'Nelson Usuga', icon: 'https://icon-icons.com/icons2/614/PNG/128/auricular-phone-symbol-in-a-circle_icon-icons.com_56570.png'}, 
  { id: '8', label: 'Jimmy Romero'}, 
  { id: '9', label: 'Enrique Mejía', icon: 'http://icons.veryicon.com/ico/Game/Angry%20Birds%201/angry%20bird%20black.ico'}, 
  { id: '10', label: 'Eliana Londoño', icon: 'http://icons.veryicon.com/ico/Application/Bubble%20Circle%20Pack%20%232/Message.ico'}, 
  { id: '11', label: 'Jorge Cuellar', icon: 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-256.png'}, 
  { id: '12', label: 'Paola Cuellar', icon: 'http://www.iconshock.com/image/CLEAN/education/agronomy/'}, 
  { id: '13', label: 'Fabio Cano', icon: 'https://cdn6.aptoide.com/imgs/5/d/e/5de1a7aa0d2fbe541dfbf4d7db4bf7b0_icon.png?w=256'}, 
  { id: '14', label: 'Julian Lopera', icon: 'https://robertohuertasm.gallerycdn.vsassets.io/extensions/robertohuertasm/vscode-icons/7.19.0/1512836005149/Microsoft.VisualStudio.Services.Icons.Default'}, 
  { id: '15', label: 'Dorian Gomez', icon: 'http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/256/MetroUI-Other-Phone-icon.png'},
  { id: '2', label: 'Elkin Bernal', icon: 'https://png.icons8.com/cotton/2x/synchronize.png'}];

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
    this.valueChanged(register.id);
    this.setValueSearch(register);
    this.toggle();
  }

  setValueSearch (obj) {
    this.searchSelect = obj;
  }

  writeValue(value: any) {
    this.value = value;
  }

  toggle () {
    this.copyData = this.copyData.length ? [] : this.data.slice();
  }

  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { }

  private valueChanged(value: any) {
    this.onChange(value);
  }

}

