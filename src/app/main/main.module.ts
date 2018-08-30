import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MainComponent } from './components/main/main.component';

import { MainService } from './shared/main.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    MainComponent
  ],
  exports: [
    CommonModule,
    MainComponent
  ],
  providers: [
    MainService
  ]
})

export class MainModule {
}
