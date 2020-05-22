import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  cityName: string = '';
  faSearch = faSearch;
  searched = false;
  loading: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  searchCity() {
    this.searched = true;
    this.loading = true;
    this.subscription = this.weatherService.getWeather(this.cityName).subscribe(
      data => {
        this.weatherService.dataEmitter.next(<JSON>data);
        this.loading = false;
      },
      err => {
        this.weatherService.dataEmitter.next(<JSON>err);
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
