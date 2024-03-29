import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent {
  imageForm: FormGroup;
  file: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.imageForm = this.fb.group({
      user_image: ['', Validators.required]
    });
  }
  onFileChange(event: any) {
      this.file = event.target.files[0] as File;
      console.log(this.file);
    
  }
  onSubmit() {
    const formData = new FormData();
    console.log(this.file)
    formData.append('user_image', this.file);
    this.http.post('http://localhost:8000/scale?scaling=2', formData).subscribe((response) => {
    console.log(response)
    });
  }
}
