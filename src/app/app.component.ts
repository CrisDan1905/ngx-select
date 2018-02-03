import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  testValue = 1;
  form: FormGroup;

  test(event) {
    console.log(event, this.form);
  }
  ngOnInit() {
    this.form = new FormGroup({
      test: new FormControl('')
    })
  }

}
