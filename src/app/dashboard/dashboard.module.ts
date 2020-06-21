import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingComponent } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DashboardComponent, ResultComponent, HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule { }
