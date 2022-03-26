import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon, PokemonById } from '../models/pokemon.model';
import { PagedData } from '../models/paged.data.model';
import { ConnectionService } from '../connection/connection.service';
import { PokemonTeamComponent } from './pokemon-team/pokemon-team.component';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';
  private apiUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';
  public pokemonsTeam ?: number[];
  private teamChange = new Subject<string>();
  teamChange$ = this.teamChange.asObservable();


  constructor(private http: HttpClient, private connectionService:ConnectionService) { }

  private log(message: string): void {
    console.log('PokemonService: ${message}');
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.error("test"); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemons() : Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl)
      .pipe(tap(_=>this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
      );
  }

  getPokemonsTeam() : Observable<number[]> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.connectionService.getToken()}`)
    }
    const url: string = this.apiUrl + '/trainers/me/team';

    return this.http.get<number[]>(url, header)
      .pipe(tap(arrayIds=>this.pokemonsTeam = arrayIds),
      catchError(this.handleError<number[]>('getPokemons'))
      );

  }

  addPokemonsTeam(pokemonId : number) : void {
    if(this.pokemonsTeam?.length != 6)
    {
      if(this.pokemonsTeam != undefined)
      {
        this.pokemonsTeam.push(pokemonId);
      }
      else
      {
        this.pokemonsTeam = [pokemonId];
      }

      this.changePokemonsTeam().subscribe
        (data => this.teamChangeAnnouncement("add"));
    }
  }

  deletePokemonsTeam(pokemonId : number) : void {
    const listIdsPokemons = this.pokemonsTeam;
    if(listIdsPokemons != undefined)
    {
      for (let index = 0; index < listIdsPokemons.length; index++) {
        const element = listIdsPokemons[index];
        if(element==pokemonId)
        {
          listIdsPokemons.splice(index,1);
          break;
        }
      }
    }
    this.pokemonsTeam = listIdsPokemons;

    this.changePokemonsTeam().subscribe
      (data => this.teamChangeAnnouncement("delete"));

  }

  changePokemonsTeam() : Observable<number[]> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.connectionService.getToken())
        .set('Content-Type', 'application/json')

    }
    const url: string = this.apiUrl + '/trainers/me/team';

    return this.http.put<number[]>(url, this.pokemonsTeam, header)
      .pipe(tap(_=>this.log("pokemons updated")),
      catchError(this.handleError<number[]>('addPokemon'))
      );
  }

  teamChangeAnnouncement(change: string) {
    this.teamChange.next(change);
  }



  getPokemonById(id: number) : Observable<PokemonById> {
    const url: string = this.pokemonUrl + '/' + id;
    this.log(this.http.get<PokemonById>(url) + "");
    return this.http.get<PokemonById>(url)
      .pipe(tap(result=>console.log("Pokemon récupéré")),
      catchError(this.handleError<PokemonById>('getPokemon id=${id}'))
      );
  }

  getPokemonsByQueryParams(offset: number, limit: number) : Observable<PagedData<Pokemon>> {
    const url : string = this.pokemonUrl + "?offset="+ offset + "&limit=" + limit;
    return this.http.get<PagedData<Pokemon>>(url)
      .pipe(tap(Resultat=>console.log("fetched pokemons by query params" + Resultat)),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonsByQueryParams'))
      );
  }

  /* GET pokemons whose name contains search term */
  searchPokemons(term: string): Observable<PagedData<Pokemon>> {
    if (!term.trim()) {
      return this.getPokemonsByQueryParams(0, 20);
    }
    const params = new HttpParams()
      .set('search', term);
    return this.http.get<PagedData<Pokemon>>(`${this.pokemonUrl}`, {params}).pipe(
      tap(_ => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<PagedData<Pokemon>>('searchPokemons'))
    );
  }
}
