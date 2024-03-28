import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css'
})
export class ImageFormComponent {
user_image = new FormControl('');
scale_factor = new FormControl('');
onSubmit():void{
  console.log(this.user_image.value);
  console.log(this.scale_factor.value+'x');
  this.user_image.reset();
  this.scale_factor.reset();
}
}
