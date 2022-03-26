import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule}   from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConnectionTeamComponent } from './connection-team/connection-team.component';




@NgModule({
  declarations: [ConnectionTeamComponent],
  imports: [
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule

  ]
})
export class ConnectionModule { }
