import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonById } from '../models/pokemon.model';
import { PagedData } from '../models/paged.data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';


  constructor(private http: HttpClient) { }

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

  getPokemonById(id: number) : Observable<PokemonById> {
    const url: string = this.pokemonUrl + '/' + id;
    this.log(this.http.get<PokemonById>(url) + "");
    return this.http.get<PokemonById>(url)
      .pipe(tap(result=>console.log(result)),
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

}
