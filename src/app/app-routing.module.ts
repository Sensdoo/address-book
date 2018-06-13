import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppGuard} from './shared/services/app-guard.service';

const routes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
