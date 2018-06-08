import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-search-generics-box',
  templateUrl: './search-generics-box.component.html',
  styleUrls: ['./search-generics-box.component.css']
})
export class SearchGenericsBoxComponent implements OnInit {
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  token: any;
  query: any = null;
  searchGenericUrl: any;
  @Input('setGeneric')
  set setGeneric(value: string) {
    // console.log(value);
    this.query = value
    // this._labelerId = value;
    // this.setApiUrl();
  }
  @Input('setAll')
  set setAll(value: string) {
    // console.log(value);
    // this.query = value
    // // this._labelerId = value;
    this.setApiUrl();
  }

  constructor(
    @Inject('API_URL') private apiUrl: string
  ) {
    this.token = sessionStorage.getItem('token');
    this.searchGenericUrl = `${this.apiUrl}/products/generic-search-autocomplete?token=${this.token}`
   }

  ngOnInit() {
  }
  clearProductSearch() {
    this.query = null;
  }

  setApiUrl() {
    this.searchGenericUrl = `${this.apiUrl}/products/generic-all-search-autocomplete?&token=${this.token}`;
  }

  clearSelected(event: any) {
    // console.log(event);
    if (event) {
      if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        this.onChange.emit(false);
      } else {
        this.onChange.emit(true);
      }
    } else {
      this.onChange.emit(false);
    }
  }

  handleResultSelected(event: any) {
    // console.log(event);
    this.onSelect.emit(event);
    this.query = event.generic_name;
    // console.log(this.query);
    
  }

}
