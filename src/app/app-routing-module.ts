import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Maincomponent } from './components/maincomponent/maincomponent';
import { Destacadoscomponent } from './components/destacadoscomponent/destacadoscomponent';
import { Favoritoscomponent } from './components/favoritoscomponent/favoritoscomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';

const routes: Routes = [
  {
    path: '',
    component: Maincomponent,
  },
  {
    path: 'destacados',
    component: Destacadoscomponent,
  },
  {
    path: 'favoritos',
    component: Favoritoscomponent,
  },
  {
    path: 'misreservas',
    component: Misreservascomponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
