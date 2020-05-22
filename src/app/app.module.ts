import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { WeatherSearchComponent } from './weather-container/weather-search/weather-search.component';
import { WeatherDisplayComponent } from './weather-container/weather-display/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherContainerComponent,
    WeatherSearchComponent,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
