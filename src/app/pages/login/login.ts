import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  userType = '';
  username = '';
  driverAvailable = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Login failed');
          }
          return response.json();
        })
        .then((user) => {
          console.log('User info:', user);
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          alert(err.message || 'Login failed');
        });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  logout() {
    this.userType = '';
    this.username = '';
    this.loginForm.reset();
  }

  reportEmergency(userReports: any) {
    // Add a new report row (Angular way)
    const now = new Date();
    userReports.unshift({
      date: now.toLocaleString(),
      location: 'Current Location',
      status: 'emergency',
      response: 'Dispatching...'
    });
    alert('Emergency reported! Fire department has been notified. Help is on the way.');
  }

  toggleDriverStatus(status: { status: string }) {
    if (this.driverAvailable) {
      status.status = 'Off Duty';
      this.driverAvailable = false;
    } else {
      status.status = 'Available';
      this.driverAvailable = true;
    }
  }
}
