import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PainelComponent } from './components/painel/painel.component';
import { AuthCanActivate } from './can-activates/auth.can-activate';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'painel', component: PainelComponent, canActivate: [AuthCanActivate] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
