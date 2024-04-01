import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatCheckboxModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent {
  imageForm: FormGroup;
  file: any;
  responseImage: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.imageForm = this.fb.group({
      user_image: ['', Validators.required],
      scale_factor: ['', Validators.required]
    });
  }
  validateForm(){
    return true;
  }
  onFileChange(event: any) {
      this.file = event.target.files[0] as File; 
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('user_image', this.file);
    this.http.post('http://localhost:8000/scale?scaling=2', formData).subscribe((response: any) => {
      if(response){
        const path = response.path;
        this.http.get<Blob>('http://localhost:8000/image/'+path, { headers: new HttpHeaders({ 'Content-Type': 'image/png' }), responseType: 'blob' as 'json' }).subscribe((response: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onload = () => {
          this.responseImage = reader.result;
        };
        reader.onerror = (error) => {
          console.log('Error:', error);
        };
        });
      }

    });
  }
}
