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
    { id: '16', label: 'Elkin Bernal', icon: 'https://png.icons8.com/cotton/2x/synchronize.png' }];

  private value: any;
  private onChange: Function;

  private copyData: NgxSelego[] = [];
  private copyDataAux: NgxSelego[] = [];
  private searchSelect: any = {};
  private toggleClass: boolean = false;
  private selectMult: boolean = false;
  private itemsSelects: Set<Object> = new Set();

  private mouseover: boolean = false;

  private indexList: number = 0;
  private indexSelect: number = 0;
  private selegoSearchBoxValue: string;

  @ViewChild('selego') selego;

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
      if (e.keyCode === 27) this.toggleClass = false;

      if ((e.metaKey || e.shiftKey) && this.toggleClass && this.multiple) this.selectMult = true;

      if (e.code === 'ArrowDown' || e.code === 'ArrowUp') this.navigateList(e);
      if (e.code === 'Enter') this.selectEnterItem(e);

    });

    this.renderer.listen(SELEGO_BOX, 'keyup', (e: KeyboardEvent) => {
      if ((!e.metaKey || !e.shiftKey) && this.itemsSelects.size <= 1) this.selectMult = false;
    });

    this.renderer.listen(SELEGO_BOX, 'blur', (e: KeyboardEvent) => {
      if (!this.mouseover) {
        this.toggleClass = false;
      }
    });

    this.renderer.listen(this.selego.nativeElement, 'mouseover', (e: KeyboardEvent) => {
      this.mouseover = true;
    });

    this.renderer.listen(this.selego.nativeElement, 'mouseout', (e: KeyboardEvent) => {
      this.mouseover = false;
    });

  }

  addItem(item: object | NgxSelego) {
    this.itemsSelects.add(item);
  }

  selectItem($event, i) {
    if(this.selectMult) return;

    $event.preventDefault();

    this.searchSelect = JSON.parse(JSON.stringify(this.copyDataAux[i]));
    this.searchSelect.checked = true;

    this.itemsSelects.clear()

    this.valueChanged(this.searchSelect.id);
    this.toggle($event);

  }

  selectEnterItem($event: KeyboardEvent) {
    $event.preventDefault();
    this.selectItem($event, this.indexList);
  }

  removeItem($event, obj: NgxSelego) {
    $event.stopPropagation();

    obj.checked = false;
    this.itemsSelects.delete(obj);
    if ((!$event.metaKey || !$event.shiftKey) && this.itemsSelects.size === 1) {
      this.selectMult = false;
      this.assignLastValue();
    }
    this.focus();
  }

  /** Remueve un item de la lista de seleccionados */
  deleteItem(item: NgxSelego) {
    this.itemsSelects.forEach((e: NgxSelego) => {
      if (e.id === item.id) this.itemsSelects.delete(item);
    });
  }

  checkedItem($event: any, i) {
    $event.stopPropagation();
    let obj = this.copyDataAux[i];

    obj.checked = !obj.checked;

    this.addItem(obj);

    if (!obj.checked) this.deleteItem(obj);
    if ((!$event.metaKey && !$event.shiftKey) && this.itemsSelects.size <= 1) {
      this.selectMult = false;
      this.assignLastValue();
    } else {
      this.searchSelect = JSON.parse(JSON.stringify(this.copyDataAux[i]));
    }

    this.focus()

  }

  searchItem($event) {
    let value = this.selegoSearchBoxValue;
    this.copyDataAux = this.copyData.filter((e) => e.label.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()));
    this.resetSearchSelect();
    this.indexList = 0;
  }

  navigateList($event: KeyboardEvent) {

    $event.preventDefault();

    if ($event.code === 'ArrowDown') this.next();
    else if ($event.code === 'ArrowUp') this.prev();

    let active = this.selegoList.nativeElement.children.item(this.indexList);
    scrollIntoViewIfNeeded(active, { centerIfNeeded: false, duration: 50 });

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
    this.searchSelect = this.itemsSelects.values().next().value;
    //this.selegoSearchBoxValue = this.searchSelect.label || "";
    this.indexSelect = this.indexList = this.getIndex(this.searchSelect);
  }

  resetSearchSelect() {
    this.searchSelect = {};
  }

  toggle($event: KeyboardEvent) {
    $event.preventDefault();
    /** Si es falso es porque está cerrado y pasará a verdadero y necesita focus */
    if (!this.toggleClass) {
      this.focus();
      this.navigateList($event);
    }
    else {
      this.copyDataAux = this.copyData;
      this.selegoSearchBoxValue = "";
      let ind = this.getIndex(this.searchSelect);
      this.indexSelect = this.indexList = (ind === -1) ? 0 : ind;
      this.blur()
    }
    this.toggleClass = !this.toggleClass;
  }

  focus() {
    this.selegoSearchBox.nativeElement.focus();
  }

  blur() {
    this.selegoSearchBox.nativeElement.blur();
  }

  assignData() {
    this.copyData = this.copyDataAux = this.data.map(e => Object.assign({ checked: false, match: true }, e));
  }

  hasSelected(): boolean {
    return this.itemsSelects.size >= 1 ? true : false;
  }

  getIndex(obj: NgxSelego): number {
    if (!obj)
      return;

    return this.copyData.findIndex(e => +e.id === +obj.id);
  }

  getItemSelect() {
    return this.copyDataAux.find(e => +e.id === +this.searchSelect.id);
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

