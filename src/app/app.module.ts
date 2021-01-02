import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MaterialModule } from './material/material.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import routes from './routes'
import { HttpClientModule } from '@angular/common/http';
import { BadgesComponent } from './components/badges/badges.component';
import { BadgeComponent } from './components/badge/badge.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EditSegmentComponent } from './components/employee-dashboard/edit-segment/edit-segment.component';
import { AddPointComponent } from './components/employee-dashboard/add-point/add-point.component';
import { EditPointComponent } from './components/employee-dashboard/edit-point/edit-point.component';
import { AddSegmentComponent } from './components/employee-dashboard/add-segment/add-segment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SegmentsComponent } from './components/segments/segments.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainPageComponent,
    BadgesComponent,
    BadgeComponent,
    EmployeeDashboardComponent,
    EditSegmentComponent,
    AddPointComponent,
    EditPointComponent,
    AddSegmentComponent,
    SegmentsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
