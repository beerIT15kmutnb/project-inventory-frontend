import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'wm-search-equipment-product',
  templateUrl: './search-equipment-product.component.html'
})
export class SearchEquipmentProductComponent implements OnInit {
  // private _labelerId: string;
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('all')
  set all(value:any) {
    // this._labelerId = value;
    this.setApiUrl();
  }

  token: any;
  query: any = null;
  searchProductUrl: any;

  constructor(@Inject('API_URL') private apiUrl: string) {

    this.token = sessionStorage.getItem('token');
    this.searchProductUrl = `${this.apiUrl}/equipment-products/search-autocomplete?token=${this.token}`;
  }

  ngOnInit() {
  }

  clearProductSearch() {
    this.query = null;
  }
  setApiUrl() {
    // this.labelerId = labelerId;
    this.searchProductUrl = `${this.apiUrl}/equipment-products/search-all-autocomplete?&token=${this.token}`;
  }
  clearSelected(event: any) {
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
    this.onSelect.emit(event);
    this.query = event.product_name;
  }

}
