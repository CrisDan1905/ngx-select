import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelegoComponent } from './ngx-selego.component';
import { FormsModule } from '@angular/forms';

describe('NgxSelectComponent', () => {
  let component: NgxSelegoComponent;
  let fixture: ComponentFixture<NgxSelegoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSelegoComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSelegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
