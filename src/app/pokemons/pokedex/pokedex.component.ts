import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionTeamComponent } from '../../connection/connection-team/connection-team.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  idPokemon ?: number;
  idAddPokemon ?: number;
  idDeletePokemon ?: number;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
