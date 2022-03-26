import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { ConnectionTeamComponent } from './connection/connection-team/connection-team.component';


const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'pokemons',
  loadChildren: () => import('./pokemons/pokemons.module').then(m => m.PokemonsModule)},
  { path: 'login', component: ConnectionTeamComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
