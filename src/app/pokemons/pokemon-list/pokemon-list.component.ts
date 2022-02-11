import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../../models/pokemon.model';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons ?: Pokemon[];
  itemsAffiches : number = 0;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    //this.getPokemons();
    this.pokemonService.getPokemonsByQueryParams(0,20)
      .subscribe(Resultat => this.pokemons = Resultat.data);
    this.itemsAffiches = 20;
  }

  getPokemons() : void {
    this.pokemonService.getPokemons()
      .subscribe(Resultat => this.pokemons = Resultat.data);
  }

  onScroll() : void {
    this.itemsAffiches += 10;
    this.pokemonService.getPokemonsByQueryParams(0,this.itemsAffiches)
      .subscribe(Resultat => this.pokemons = Resultat.data);

  }
}
