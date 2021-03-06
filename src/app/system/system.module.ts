import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';
import { AddressPageComponent } from './address-page/address-page.component';
import { EntranceFormComponent } from './entrance-form/entrance-form.component';
import { MiddleResultComponent } from './middle-result/middle-result.component';

@NgModule({ 
  declarations: [
  	SystemComponent,
  	SearchFormComponent,
  	AddressPageComponent,
  	EntranceFormComponent,
  	MiddleResultComponent
  ],
  imports: [
  	CommonModule,
  	SystemRoutingModule,
  	SharedModule
  ]
})
export class SystemModule {}