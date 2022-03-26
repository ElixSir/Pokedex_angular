import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonById } from 'src/app/models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';
import { PokemonTeamComponent } from '../pokemon-team/pokemon-team.component';


@Component({
  providers:[PokemonTeamComponent ],
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges{
  @Input() idPokemon ?: number;

  pokemon?: PokemonById;

  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private pokemonTeam: PokemonTeamComponent) { }

  ngOnInit(): void {
    //this.getPokemonById();
    //ngOnChanges s'exécute à l'initialisation
  }

  ngOnChanges() : void {
    this.getPokemonById();
  }

  getPokemonById(): void {
    if(this.idPokemon)
    {
    this.pokemonService.getPokemonById(this.idPokemon)
      .subscribe(result => this.pokemon = result);
    }
  }

  playAudio(id: Number): void {
    let audio = new Audio();
    audio.src = "/../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

  goBack(): void {
    this.location.back();
  }

  addTeam(idPoke: number): void {
    this.pokemonService.addPokemonsTeam(idPoke);
  }

  deleteTeam(idPoke: number): void {
    this.pokemonService.deletePokemonsTeam(idPoke);
  }
}
