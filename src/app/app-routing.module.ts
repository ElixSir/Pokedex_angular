import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'pokemons',
  loadChildren: () => import('./pokemons/pokemons.module').then(m => m.PokemonsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
