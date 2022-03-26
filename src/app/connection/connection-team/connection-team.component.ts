import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from '../connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-team',
  templateUrl: './connection-team.component.html',
  styleUrls: ['./connection-team.component.scss']
})
export class ConnectionTeamComponent implements OnInit {

  private pokedexApiUrl : String = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";
  profileForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });
  error?:string;


  constructor(private connectionService:ConnectionService, private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() : void {
    var password = this.profileForm.get('password');
    var email = this.profileForm.get('email');
    var url = this.pokedexApiUrl + "/auth/login";

    if(password != null && email != null)
    {
      this.connectionService.teamAuthentification(url, email.value, password.value)
        .subscribe(result =>
          {
            if(result["access_token"])
            {
              this.router.navigate(['pokemons']);

            }
            else{
              this.error=result.error.message;
            }
          });


    }


  }

}
