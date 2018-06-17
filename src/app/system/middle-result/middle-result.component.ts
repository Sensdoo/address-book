import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/user.entity';
import {ActivatedRoute, Params} from '@angular/router';
import {Address} from '../../entities/address.entity';
import {AddressService} from '../../shared/services/address.service';
import {Street} from '../../entities/street.entity';
import {StreetService} from '../../shared/services/street.service';

@Component({
  selector: 'app-middle-result',
  templateUrl: './middle-result.component.html',
  styleUrls: ['./middle-result.component.css']
})
export class MiddleResultComponent implements OnInit {

  user: User;
  street: Street;
  addresses: Address[];

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private streetService: StreetService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['streetId']) {
          this.addressService.getAddressByStreetId(params['streetId'])
            .subscribe((addresses: Address[]) => {
              console.log(addresses);
              this.addresses = addresses;
            });
          this.streetService.getStreetById(params['streetId'])
            .subscribe((street: Street) => {
              this.street = street;
            });
        }
      });
  }

}
