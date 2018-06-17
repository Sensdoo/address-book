import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { AddressService } from '../../shared/services/address.service';
import { Entrance } from '../../entities/entrance.entity';
import {User} from '../../entities/user.entity';
import {EntranceStorageService} from '../../shared/services/entrance-storage.service';
import {EntranceService} from '../../shared/services/entrance.service';
import {Street} from '../../entities/street.entity';
import {Address} from '../../entities/address.entity';
import {StreetService} from '../../shared/services/street.service';

@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.css']
})
export class AddressPageComponent implements OnInit {

  entrances: Entrance[];
  street: Street;
  address: Address;
  addressId: number;
  message = '';
  type = '';
  user: User;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	private addressService: AddressService,
    private streetService: StreetService,
    private entranceService: EntranceService,
    private entranceStorage: EntranceStorageService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.entranceStorage.setEntrance(null);
  	this.route.queryParams
      .subscribe((params: Params) => {
        if (params['addressId']) {
          this.addressId = params['addressId'];
          this.addressService.getAddressAndAllHisEntrances(this.addressId)
            .subscribe((entrances: Entrance[]) => {
              this.entrances = entrances;
            });
          this.addressService.getAddressById(this.addressId)
            .subscribe((address: Address) => {
              this.address = address;
              this.streetService.getStreetById(address['streetId'])
                .subscribe((street: Street) => {
                  this.street = street;
                });
            });
        }
        if (params['successfully']) {
          this.showMessage('success', 'Подъезд успешно добавлен(изменён)');
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

  editEntrance(entrance: Entrance) {
    this.entranceStorage.setEntrance(entrance);
    this.router.navigate(['/add-entrance'], {
      queryParams: {
        'addressId': this.addressId
      }
    });
  }

  deleteEntrance(id: number) {
    this.entranceService.deleteEntrance(id)
      .subscribe(data => {
        this.entrances = this.entrances.filter(e => e['id'] !== id);
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
