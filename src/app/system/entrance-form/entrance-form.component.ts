import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user.entity';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EntranceService} from '../../shared/services/entrance.service';
import {Entrance} from '../../entities/entrance.entity';
import {Message} from '../../entities/message.entity';
import {text} from '@angular/core/src/render3/instructions';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-entrance-form',
  templateUrl: './entrance-form.component.html',
  styleUrls: ['./entrance-form.component.css']
})
export class EntranceFormComponent implements OnInit {

  user: User;
  form: FormGroup;
  message = '';
  type = '';
  addressId: number;
  date = new Date().toISOString().slice(0, -14);

  constructor(
    private entranceService: EntranceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.route.queryParams.subscribe((params: Params) => {
      if (params['addressId']) {
        this.addressId = +params['addressId'];
      }
    });

    this.form = new FormGroup({
      edit: new FormControl(this.user['name'], []),
      description: new FormControl(null, []),
      domruKey: new FormControl(0, []),
      lastUpdate: new FormControl(this.date, []),
      entranceNumber: new FormControl(null, [Validators.required]),
      addressId: new FormControl(this.addressId, []),
      access: new FormControl(null, [])
    });
  }

  onSubmit() {
    const {domruKey, edit, description, lastUpdate, entranceNumber, access, addressId} = this.form.value;
    // const newEntrance = new Entrance(domruKey, edit, description, lastUpdate, entranceNumber, access);
    // console.log(edit, description, domruKey, lastUpdate, entranceNumber, access);
    this.entranceService.addEntrance({edit, description, domruKey, lastUpdate, entranceNumber, access, addressId} as Entrance)
      .subscribe((entrance: Entrance) => {
        this.router.navigate(['/address-page'], {
          queryParams: {
            'addressId': this.addressId,
            'successfully': true
          }
        });
      });
  }

  onChange() {

    console.log(this.form);
    this.entranceService.getEntrance(this.form.value['entranceNumber'], this.addressId)
      .subscribe((entrances: Entrance[]) => {
        if (entrances.length) {
          this.showMessage('danger', 'Указанный подъезд уже существует');
        } else {
          this.message = '';
          this.type = '';
        }
      });
  }

  private showMessage(type: string, message: string) {
    this.message = message;
    this.type = type;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 5000000);
  }
}
