import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Maincomponent } from './components/maincomponent/maincomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Destacadoscomponent } from './components/destacadoscomponent/destacadoscomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';

@NgModule({
  declarations: [App, Navbarcomponent, Destacadoscomponent, Misreservascomponent, Reservacomponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Maincomponent,
    Footercomponent,
    MatDialogModule,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
