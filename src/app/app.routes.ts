import { Routes } from '@angular/router';
import { Dispatcher } from './pages/dispatcher/dispatcher';
import { Emergencies } from './pages/dispatcher/emergencies/emergencies';
import { Overview } from './pages/dispatcher/overview/overview';
import { PersonnelComponent } from './pages/dispatcher/personnel/personnel';
import { Reports } from './pages/dispatcher/reports/reports';
import { VehiclesComponent } from './pages/dispatcher/vehicles/vehicles';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },  
  {
    path: 'dashboard',
    component: Dispatcher,
    children: [
      { path: '', component: Overview },
      { path: 'emergencies', component: Emergencies },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'personnel', component: PersonnelComponent },
      { path: 'reports', component: Reports },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },

  // Catch-all redirect to login
  { path: '**', redirectTo: 'login' }
];
