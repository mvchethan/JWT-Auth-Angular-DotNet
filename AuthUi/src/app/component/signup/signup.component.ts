import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/formvalidate';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private _auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideshowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this._auth.signUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },error(err){
          alert(err.error.title)
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
