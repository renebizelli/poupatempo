import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

import { NubankService } from './services/nubank.service'
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

import { AuthCanActivate } from './can-activates/auth.can-activate';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';

import { AppComponent } from './app.component';
import { PainelComponent } from './components/painel/painel.component';
import { LoginComponent } from './components/login/login.component';
import { ProgressBarElement } from './elements/progress-bar.element';
import { BillsComponent } from './components/bills/bills.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    LoginComponent,
    ProgressBarElement,
    BillsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [ 
    NubankService, 
    AuthService,
    LocalStorageService,
    LoaderService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthCanActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
