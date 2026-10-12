import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Maincomponent } from './components/maincomponent/maincomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Destacadoscomponent } from './components/destacadoscomponent/destacadoscomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Infoalojamientoscomponent } from './components/infoalojamientoscomponent/infoalojamientoscomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Destacadoscomponent,
    Misreservascomponent,
    Reservacomponent,
    Infoalojamientoscomponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Maincomponent,
    Footercomponent,
    MatDialogModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideNativeDateAdapter(),
  ],
  bootstrap: [App],
  exports: [],
})
export class AppModule {}
