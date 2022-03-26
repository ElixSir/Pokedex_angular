import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {
  @Output() nouveauIdPokemon = new EventEmitter<number>();

  pokemons : Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonsTeam();
    this.pokemonService.teamChange$.subscribe(
      data => {
        this.getPokemonsTeam();//ne marche pas si il récupère un tableau vide
        if(this.pokemonService.pokemonsTeam?.length == 0)
        {
          this.pokemons = [];
        }
    });
  }

  getPokemonsTeam() : void {
    this.pokemonService.getPokemonsTeam().pipe(
      switchMap(arrayIds => {
        const pokemonObservables : Observable<Pokemon>[]
          = arrayIds.map(id => this.pokemonService.getPokemonById(id));
        return forkJoin(pokemonObservables);
      })
    )
      .subscribe(arrayPokemons =>
        {
          this.pokemons = arrayPokemons;
        });
  }

  renvoyerId(idPokemon:number) : void
  {
    this.nouveauIdPokemon.emit(idPokemon);
  }

}

