import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private connected: boolean = false;
  private access_token : string = "";
  constructor(private http: HttpClient) {}

  teamAuthentification( url:string, email:string, password:string) : Observable<any> {
    return this.http.post<any>(url, { email: email, password: password }).pipe(
      tap(result=>
        {
          console.log(result);
          if(result["access_token"])
          {
            this.connected = true;
            this.access_token = result["access_token"];
            localStorage.setItem("connected", "true");
            localStorage.setItem("access_token", result["access_token"]);
          }
          else{
            this.connected = false;
          }

        }),
      catchError(error=> of(error))
      );
  }


  isLogged() : boolean {
    //Je n'ai pas implémenté le refresh token donc ne fonctionne pas au bout d'un moment
    /*if(localStorage.getItem("connected"))
    {
      return true;
    }*/
    return this.connected;
  }

  getToken() : string {
    return this.access_token;
    //Je n'ai pas implémenté le refresh token donc ne fonctionne pas au bout d'un moment
    //return localStorage.getItem("access_token") ?? this.access_token;
    //si nul ou undefined deuxième option
  }
}
