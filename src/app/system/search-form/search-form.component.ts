import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StreetService } from '../../shared/services/street.service';
import { AddressService } from '../../shared/services/address.service';
import { Street } from '../../entities/street.entity';
import {Address} from '../../entities/address.entity';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  form: FormGroup;
  streets: Street[];
  houses = [];
  message: string;
  type: string;

  constructor(
    private streetService: StreetService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit() {
    this.streetService.getAll()
      .subscribe((streets: Street[]) => {
        this.streets = streets;
      });

    this.form = new FormGroup({
      streetId: new FormControl(null, [Validators.required]),
      house: new FormControl(null, []),
      building: new FormControl(null, []),
      entrance: new FormControl({value: '', disabled: true}, [])
    });
  }

  onSubmit() {
    const data = this.form.value;
    if (data.house !== null && data.building !== null) {
      console.log('1', data.streetId, data.house, data.building);
      this.addressService.getAddressId(data.streetId, data.house, data.building)
        .subscribe((address: Address[]) => {
          if (address.length) {
            this.router.navigate(['/address-page'], {
              queryParams: {
                'addressId': address[0]['id']
              }
            });
          } else {
            this.showMessage('danger', 'Адрес не найден!');
          }
        });
    } else if (data.house !== null && data.building === null) {
      console.log('2', data.streetId, data.house, data.building);
    } else if (data.house === null && data.building === null) {
      console.log('3', data.streetId, data.house, data.building);
        this.router.navigate(['/middle-result'], {
          queryParams: {
            'streetId': data['streetId']
          }
        });
    } else {
      return;
    }
  }

  showMessage(type: string, message: string) {
    this.message = message;
    this.type = type;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
      }, 5000);
  }
}
