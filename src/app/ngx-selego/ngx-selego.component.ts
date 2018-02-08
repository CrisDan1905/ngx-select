import { Component, OnInit, Input, AfterViewInit, Renderer2, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgxSelego } from '../interfaces/ngx-selego.interface';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'

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

export class NgxSelegoComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() data: NgxSelego[] = [
    { id: '1', label: 'Jorge Verbel' },
    { id: '2', label: 'Alejandra Rojas' },
    { id: '3', label: 'Abrahan Uribe Ruz' },
    { id: '4', label: 'Danilo Gutierrez', icon: 'https://image.flaticon.com/icons/png/128/321/321828.png' },
    { id: '5', label: 'Juan Cardona' },
    { id: '6', label: 'Henry Cano' },
    { id: '7', label: 'Nelson Usuga', icon: 'https://antisystemic.org/jpg/icons/sc.ico' },
    { id: '8', label: 'Jimmy Romero' },
    { id: '9', label: 'Enrique Mejía', icon: 'http://icons.veryicon.com/ico/Game/Angry%20Birds%201/angry%20bird%20black.ico' },
    { id: '10', label: 'Eliana Londoño', icon: 'http://icons.veryicon.com/ico/Application/Bubble%20Circle%20Pack%20%232/Message.ico' },
    { id: '11', label: 'Jorge Cuellar', icon: 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-256.png' },
    { id: '12', label: 'Paola Cuellar', icon: 'http://www.iconshock.com/image/CLEAN/education/agronomy/' },
    { id: '13', label: 'Fabio Cano', icon: 'https://cdn6.aptoide.com/imgs/5/d/e/5de1a7aa0d2fbe541dfbf4d7db4bf7b0_icon.png?w=256' },
    { id: '14', label: 'Julian Lopera', icon: 'https://robertohuertasm.gallerycdn.vsassets.io/extensions/robertohuertasm/vscode-icons/7.19.0/1512836005149/Microsoft.VisualStudio.Services.Icons.Default' },
    { id: '15', label: 'Dorian Gomez', icon: 'http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/256/MetroUI-Other-Phone-icon.png' },
    { id: '2', label: 'Elkin Bernal', icon: 'https://png.icons8.com/cotton/2x/synchronize.png' }];

  private value: any;
  private onChange: Function;

  private copyData: NgxSelego[] = [];
  private copyDataAux: NgxSelego[] = [];
  private searchSelect: any = {};
  private toggleClass: boolean = false;
  private selectMult: boolean = false;
  private itemsSelects: Set<Object> = new Set();
  private focusBox: boolean = false;

  private indexList: number = 0;
  private selegoSearchBoxValue: string;

  

  @ViewChild('selegoSearchBox') selegoSearchBox;
  @ViewChild('selegoList') selegoList;
  constructor(private renderer: Renderer2) {

  }

  @Input() multiple: boolean = false;

  ngOnInit() {
    this.assignData();
  }

  ngAfterViewInit() {
    const SELEGO_BOX = this.selegoSearchBox.nativeElement;
    this.renderer.listen(SELEGO_BOX, 'keydown', (e: KeyboardEvent) => {
      /** KeyCode === 27 es la tecla esc. Cierra la lista. */
      if (e.keyCode === 27) {
        this.toggleClass = false; 
        this.selegoSearchBoxValue = this.searchSelect.label;
        this.selegoSearchBox.nativeElement.blur();
      }

      if (e.metaKey && this.toggleClass && this.multiple) this.selectMult = true;
      if (this.focusBox && (e.code === 'ArrowDown' || e.code === 'ArrowUp')) this.navigateList(e);
      if (this.focusBox && e.code === 'Enter') this.selectEnterItem(e);

    });
    
    this.renderer.listen(SELEGO_BOX, 'keyup', (e: KeyboardEvent) => {
      if (!e.metaKey && this.itemsSelects.size <= 1) this.selectMult = false;
    });

    this.renderer.listen(SELEGO_BOX, 'focus', (e: KeyboardEvent) => {
      this.focusBox = true;
    });

    this.renderer.listen(SELEGO_BOX, 'blur', (e: KeyboardEvent) => {
      this.focusBox = false;
      //this.toggleClass = false;
    });

    this.renderer.listen(SELEGO_BOX, 'blur', (e: KeyboardEvent) => {
      this.focusBox = false;
      this.toggleClass = false;
    });

  }

  addItem(item: object | NgxSelego) {
    this.itemsSelects.add(item);
  }

  deleteItem(item: NgxSelego) {
    this.itemsSelects.forEach((e: NgxSelego) => {
      if (e.id === item.id) this.itemsSelects.delete(item);
    });
  }

  selectItem($event, i) {
    $event.preventDefault();
    this.indexList = i;

    if (!this.selectMult) {
    }
    this.searchSelect = this.copyDataAux[i];
    this.valueChanged(this.searchSelect.id);

    /** Se reestrablece el objeto anteriormente seleccionado */
    if (Object.keys(this.searchSelect).length) {
      this.searchSelect.checked = !this.searchSelect.checked;
      this.deleteItem(this.searchSelect);
    }

    this.searchSelect.checked = !this.searchSelect.checked;

    this.addItem(this.searchSelect);
    this.assignLastValue();
    this.toggleClass = false;
    this.blur();
    
  }

  selectEnterItem($event: KeyboardEvent){
    $event.preventDefault();
    this.selectItem($event, this.indexList);
  }

  removeItem($event, obj: NgxSelego) {
    $event.stopPropagation();

    obj.checked = false;
    this.itemsSelects.delete(obj);

    if (!$event.metaKey && this.itemsSelects.size === 1) this.selectMult = false;

    this.assignLastValue();
    this.resetSearchSelect();
  }

  checkedItem($event: any, obj: NgxSelego) {
    $event.stopPropagation();

    obj.checked = !obj.checked;
    this.addItem(obj);

    if (!obj.checked) this.deleteItem(obj);
    if (!$event.metaKey && this.itemsSelects.size === 1) {
      this.selectMult = false;
    }
    
    if(this.itemsSelects.size > 1) this.selegoSearchBoxValue = "";
    else this.assignLastValue();

    this.resetSearchSelect();
  }

  searchItem($event) {
    let value = this.selegoSearchBoxValue;
    if (value.length) {
      this.copyDataAux = this.copyData.filter((e) => e.label.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()));
      this.toggleClass = true;
    } else {
      this.indexList = 0;
      this.assignData();
    }

    if (Object.keys(this.searchSelect).length) {
      this.indexList = 0;
    }

    this.resetSearchSelect();
  }

  navigateList($event: KeyboardEvent) {

    $event.preventDefault();
    
    if ($event.code === 'ArrowDown') this.next();
    else if ($event.code === 'ArrowUp') this.prev();

    let active = this.selegoList.nativeElement.children.item(this.indexList);
    scrollIntoViewIfNeeded(active,{centerIfNeeded: false, duration: 100});

  }

  next() {
    (this.indexList < this.selegoList.nativeElement.children.length - 1) ? ++this.indexList : '';
  }

  prev() {
    (this.indexList >= 1) ? --this.indexList : '';
  }

  /** 
   * Al quedar el último item lo salva.
  */
  assignLastValue() {
    if (this.itemsSelects.size === 1) this.searchSelect = this.itemsSelects.values().next().value;
    this.selegoSearchBoxValue = this.searchSelect.label;
  }

  resetSearchSelect() {
    this.searchSelect = {};
  }

  toggle($event: KeyboardEvent) {
    if (!Object.keys(this.searchSelect).length) {
      this.copyDataAux = this.copyData;
    }
    this.navigateList($event);
    this.toggleClass = !this.toggleClass;
    this.toggleClass ? this.focus() : this.blur();
  }

  focus() {
    this.selegoSearchBox.nativeElement.focus();
  }

  blur(){
    this.selegoSearchBox.nativeElement.blur();
  }

  assignData() {
    this.copyData = this.copyDataAux = this.data.map(e => Object.assign({ checked: false, match: true }, e));
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) { this.onChange = fn; }

  registerOnTouched(fn) { }

  private valueChanged(value: any) {
    this.onChange(value);
  }

}

