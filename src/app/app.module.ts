import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JoblistingComponent } from './components/joblisting/joblisting.component';
import { JobdetailsComponent } from './components/jobdetails/jobdetails.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { UtilityService } from './services/utility.service';
import { RestapiService } from './services/restapi.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoblistingComponent,
    JobdetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    StoreModule.forRoot({}, {})
  ],
  exports: [RouterModule],
  providers: [RestapiService,UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
