import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonById } from 'src/app/models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon?: PokemonById;

  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location) { }

  ngOnInit(): void {
    this.getPokemonById();
  }

  getPokemonById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonById(id)
      .subscribe(result => this.pokemon = result);
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
}
