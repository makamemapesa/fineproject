import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles'; // Import VehiclesComponent


@Component({
  selector: 'app-dispatcher',
  imports: [RouterModule ],
  templateUrl: './dispatcher.html',
  styleUrl: './dispatcher.css'
})
export class Dispatcher {

}
