import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OtpComponent } from './pages/otp/otp.component';
import { userGuardGuard } from './guards/user-guard.guard';

export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent,canActivate: [userGuardGuard]},
    {path:'verify',component:OtpComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
