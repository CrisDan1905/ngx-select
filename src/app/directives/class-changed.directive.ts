import { Directive, HostBinding, Output, EventEmitter, Input, ElementRef, OnChanges} from "@angular/core";

@Directive({selector: '[search-value]'})
export class ClassChangedDirective implements OnChanges{


    @Output() onClassActive: EventEmitter<boolean> = new EventEmitter();

    @HostBinding('class') set classActive(isActive) {
        if (isActive)
            this.onClassActive.emit(true);
    }

    @Input('search-value') searchValue
    

    constructor(private elem: ElementRef) { }

    ngOnChanges() {
        if (this.searchValue) {
            const check = this.elem.nativeElement.innerText.toLowerCase().includes(this.searchValue.toLowerCase());
            if (!check)
                this.elem.nativeElement.parentElement.style.display = "none";
            else 
            this.elem.nativeElement.parentElement.style.display = "block";

        }
    }
}