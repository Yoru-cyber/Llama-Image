import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { ImagesPage } from './pages/images/images.component';
export const routes: Routes = [
    {'path': 'home', component: HomePage},
    {'path': '', redirectTo: '/home', pathMatch: 'full'},
    { 'path': 'images', component: ImagesPage}
];
