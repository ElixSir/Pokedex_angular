import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Output() nouveauIdPokemon = new EventEmitter<number>();

  private searchTerms = new Subject<string>();
  pokemons ?: Pokemon[];
  itemsAffiches : number = 0;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    //this.getPokemons();
    this.pokemonService.getPokemonsByQueryParams(0,20)
      .subscribe(Resultat => this.pokemons = Resultat.data);
    this.itemsAffiches = 20;

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.pokemonService.searchPokemons(term),
      )).subscribe(result => this.pokemons = result.data)
      ;
  }

  getPokemons() : void {
    this.pokemonService.getPokemons()
      .subscribe(Resultat => this.pokemons = Resultat.data);
  }

  onScroll() : void {
    console.log("on scroll");
    this.itemsAffiches += 10;

    this.pokemonService.getPokemonsByQueryParams(0,this.itemsAffiches)
      .subscribe(Resultat => this.pokemons = Resultat.data);

  }

  renvoyerId(idPokemon:number) : void
  {
    this.nouveauIdPokemon.emit(idPokemon);
  }


  search(term:string) : void {
      this.searchTerms.next(term);
  }
}
