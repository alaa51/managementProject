import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ProfilComponent} from "./pages/profil/profil.component";
import {TasksListComponent} from "./pages/admin/tasks-list/tasks-list.component";
import {TecknicalListComponent} from "./pages/admin/tecknical-list/tecknical-list.component";
import {UserListComponent} from "./pages/admin/user-list/user-list.component";
import {StatsComponent} from "./pages/stats/stats.component";
import {UserDetailsComponent} from "./pages/admin/user-details/user-details.component";
import {AuthGuard} from "./config/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'stats', component: StatsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfilComponent },
      { path: 'tasksList', component: TasksListComponent },
      { path: 'technical-list', component: TecknicalListComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-details', component: UserDetailsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
