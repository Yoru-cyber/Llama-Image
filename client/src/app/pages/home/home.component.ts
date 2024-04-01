import { Component } from '@angular/core';
import { ImageFormComponent } from '../../components/image-form/image-form.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomePageComponent {}
