import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { ImagesPageComponent } from './pages/images/images.component';
export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'images', component: ImagesPageComponent },
];
