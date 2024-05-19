import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HomeComponent } from './pages/home/home.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import { StatsComponent } from './pages/stats/stats.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { TasksListComponent } from './pages/admin/tasks-list/tasks-list.component';
import { TecknicalListComponent } from './pages/admin/tecknical-list/tecknical-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfilComponent } from './pages/profil/profil.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    UserListComponent,
    TasksListComponent,
    TecknicalListComponent,
    LoginComponent,
    DashboardComponent,
    ProfilComponent,
    UserDetailsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DragDropModule,
    NzCardModule,
    NzDividerModule,
    NzModalModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    NzTabsModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
