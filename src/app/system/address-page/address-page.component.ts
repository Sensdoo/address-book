import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { AddressService } from '../../shared/services/address.service';
import { Entrance } from '../../entities/entrance.entity';
import {User} from '../../entities/user.entity';

@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.css']
})
export class AddressPageComponent implements OnInit {

  entrances: Entrance[];
  addressId: number;
  message = '';
  type = '';
  user: User;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	private addressService: AddressService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  	this.route.queryParams
      .subscribe((params: Params) => {
        if (params['addressId']) {
          this.addressId = params['addressId'];
          this.addressService.getAllEntrancesByAddressId(this.addressId)
            .subscribe((entrances: Entrance[]) => {
              this.entrances = entrances;
            });
        }
        if (params['successfully']) {
          this.showMessage('success', 'Подъезд успешно добавлен');
        }
    });
  }

  addEntrance() {
    this.router.navigate(['/add-entrance'], {
      queryParams: {
        'addressId': this.addressId
      }
    });
  }

  private showMessage(type: string, message: string) {
    this.message = message;
    this.type = type;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 3000);
  }
}
