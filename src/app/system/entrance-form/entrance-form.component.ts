import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user.entity';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EntranceService} from '../../shared/services/entrance.service';
import {Entrance} from '../../entities/entrance.entity';
import {Message} from '../../entities/message.entity';
import {text} from '@angular/core/src/render3/instructions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EntranceStorageService} from '../../shared/services/entrance-storage.service';

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
  entrance: Entrance;
  isDisabled = false;

  constructor(
    private entranceService: EntranceService,
    private route: ActivatedRoute,
    private router: Router,
    private entranceStorage: EntranceStorageService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.entrance = this.entranceStorage.getEntrance();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['addressId']) {
        this.addressId = +params['addressId'];
      }
    });

    if (this.entrance) {
      this.isDisabled = true;
      this.form = new FormGroup({
        edit: new FormControl(this.user['name'], []),
        description: new FormControl(this.entrance['description'], [Validators.maxLength(125)]),
        domruKey: new FormControl(this.entrance['domruKey'], []),
        lastUpdate: new FormControl(this.date, []),
        entranceNumber: new FormControl(this.entrance['entranceNumber'], [Validators.required]),
        addressId: new FormControl(this.addressId, []),
        access: new FormControl(this.entrance['access'], []),
        id: new FormControl(this.entrance['id'], [])
      });
    } else {
      this.isDisabled = false;
      this.form = new FormGroup({
        edit: new FormControl(this.user['name'], []),
        description: new FormControl(null, [Validators.maxLength(125)]),
        domruKey: new FormControl(0, []),
        lastUpdate: new FormControl(this.date, []),
        entranceNumber: new FormControl(null, [Validators.required]),
        addressId: new FormControl(this.addressId, []),
        access: new FormControl(null, []),
        id: new FormControl(null, [])
      });
    }
  }

  onSubmit() {
    const {domruKey, edit, description, lastUpdate, entranceNumber, access, addressId, id} = this.form.value;
    if (id) {
      this.entranceService.editEntrance({edit, description, domruKey, lastUpdate, entranceNumber, access, addressId, id} as Entrance)
        .subscribe((entrance: Entrance) => {
          this.router.navigate(['/address-page'], {
            queryParams: {
              'addressId': this.addressId,
              'successfully': true
            }
          });
        });
    } else {
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
    console.log(this.form);
  }

  onChangeEntranceField() {
    if (this.form.value['entranceNumber'] > 0) {
      this.entranceService.getEntrance(this.form.value['entranceNumber'], this.addressId)
        .subscribe((entrances: Entrance[]) => {
          if (entrances.length) {
            this.showMessage('danger', 'Указанный подъезд уже существует');
          } else {
            this.message = '';
            this.type = '';
          }
        });
    } else {
      this.showMessage('danger', 'Недопустимое значение');
    }
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
