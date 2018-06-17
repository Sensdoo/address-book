import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AddressPageComponent } from './address-page/address-page.component';
import {EntranceFormComponent} from './entrance-form/entrance-form.component';
import {AppGuard} from '../shared/services/app-guard.service';
import {MiddleResultComponent} from './middle-result/middle-result.component';

const routes: Routes = [
  // todo добавить canActivate: [AppGuard]
  { path: '', component: SystemComponent, children: [
    { path: 'search-form', component: SearchFormComponent },
    { path: 'address-page', component: AddressPageComponent },
    { path: 'add-entrance', component: EntranceFormComponent },
    { path: 'middle-result', component: MiddleResultComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
