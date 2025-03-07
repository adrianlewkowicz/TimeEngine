import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LandingPageComponent
  ]
})
export class LandingPageModule { }
