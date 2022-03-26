import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';
import { ConnectionTeamComponent } from '../connection/connection-team/connection-team.component';
import { AccessGuard } from '../connection/access.guard';

const routes: Routes = [
  { path: '', component: PokedexComponent, canActivate:[AccessGuard], data:{requiresLogin: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
