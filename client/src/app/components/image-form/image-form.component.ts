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
  checked_2_factor: boolean = false;
  checked_4_factor: boolean = false;
  scale_factor: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.imageForm = this.fb.group({
      user_image: ['', Validators.required],
      scale_factor: ['', Validators.required]
    });
  }
  validateForm(){
    if(this.checked_2_factor === true && this.checked_4_factor === true){
      this.scale_factor = 0;
     return window.alert('You need to select only one value')
    }
    else if(this.checked_2_factor === false && this.checked_4_factor === false){
      this.scale_factor = 0;
      return window.alert('You need to select a value');
    }
    this.checked_2_factor === true ? this.scale_factor = 2: this.scale_factor = 4
    this.onSubmit()
  }
  onFileChange(event: any) {
      this.file = event.target.files[0] as File; 
  }
  onCheckChange_2_factor(){
  this.checked_2_factor === true ? this.checked_2_factor = false : this.checked_2_factor = true;
  console.log(this.checked_2_factor);
  }
  onCheckChange_4_factor(){
    this.checked_4_factor === true ? this.checked_4_factor = false : this.checked_4_factor = true;
    console.log(this.checked_4_factor);
    }
  onSubmit() {
    const formData = new FormData();
    formData.append('user_image', this.file);
    this.http.post(`http://localhost:8000/scale?scaling=${this.scale_factor}`, formData).subscribe((response: any) => {
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
