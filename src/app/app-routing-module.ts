import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Maincomponent } from './components/maincomponent/maincomponent';
import { Destacadoscomponent } from './components/destacadoscomponent/destacadoscomponent';
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
    path: 'misreservas',
    component: Misreservascomponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
