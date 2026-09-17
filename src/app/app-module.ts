import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Maincomponent } from './components/maincomponent/maincomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Destacadoscomponent } from './components/destacadoscomponent/destacadoscomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Favoritoscomponent } from './components/favoritoscomponent/favoritoscomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Maincomponent,
    Footercomponent,
    Destacadoscomponent,
    Misreservascomponent,
    Favoritoscomponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
