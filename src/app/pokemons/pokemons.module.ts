import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatListModule} from '@angular/material/list';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,


  ],
  imports: [
    CommonModule,
    MatListModule,
    PokemonsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class PokemonsModule { }
