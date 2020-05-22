import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faThermometerEmpty,
  faThermometerQuarter,
  faThermometerHalf,
  faThermometerThreeQuarters,
  faThermometerFull,
  faClock,
  faWind,
  faTint,
  faSortAmountDownAlt,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

const IconColors = Object.freeze({
  CLEAR: { color: 'orange' },
  CLOUD: { color: '#969696' },
  CLOUD_RAIN: { color: '#5c5c5c' },
  SNOW: { color: '#a2d2df' }
});

const Temperatures = Object.freeze({
  EMPTY: faThermometerEmpty,
  QUARTER: faThermometerQuarter,
  HALF: faThermometerHalf,
  THREE_QUARTERS: faThermometerThreeQuarters,
  FULL: faThermometerFull
});

const TempColors = Object.freeze({
  EMPTY: { color: 'blue' },
  QUARTER: { color: 'cyan' },
  HALF: { color: 'yellow' },
  THREE_QUARTERS: { color: 'orange' },
  FULL: { color: 'red' }
});

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  data: JSON;

  gotError: boolean = false;

  errorMessage: string = '';
  errorStatus: number;

  gotData: boolean = false;

  cityName: string = '';
  countryCode: string = '';

  tempAvg: number;
  tempAvgIcon: IconDefinition = null;
  tempAvgIconColor: {};

  tempMax: number;
  tempMaxIcon: IconDefinition = null;
  tempMaxIconColor: {};

  tempMin: number;
  tempMinIcon: IconDefinition = null;
  tempMinIconColor: {};
  
  pressure: number;

  humidity: number;

  windSpeed: number;

  currentWeather: IconDefinition = null;
  iconColor: {} = '';

  timeZoneOffset: number;
  currentTime: string;

  faClock = faClock;
  faWind = faWind;
  faTint = faTint;
  faSortAmountDownAlt = faSortAmountDownAlt;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = this.weatherService.dataEmitter.subscribe(
      data => {
        this.data = data;
        this.showResults();
      }
    );
  }

  showResults(): void {
    console.log(this.data);
    if (this.data['cod'] === 200) {
      this.gotError = false;
      this.gotData = true;
      this.cityName = this.data['name'];
      this.countryCode = this.data['sys']['country'];

      this.setCurrentTime();

      switch (this.data['weather'][0]['main']) {
        case 'Clear':
          this.currentWeather = faSun;
          this.iconColor = IconColors.CLEAR;
          break;

        case 'Clouds':
          this.currentWeather = faCloud;
          this.iconColor = IconColors.CLOUD;
          break;

        case 'Rain':
          this.currentWeather = faCloudRain;
          this.iconColor = IconColors.CLOUD_RAIN;
          break;

        case 'Snow':
          this.currentWeather = faSnowflake;
          this.iconColor = IconColors.SNOW;
          break;

        default:
          break;
      }

      this.tempMin = Math.floor(this.data['main']['temp_min']);
      if (this.tempMin <= 0) {
        this.tempMinIcon = Temperatures.EMPTY;
        this.tempMinIconColor = TempColors.EMPTY;
      }
      else if (this.tempMin > 0 && this.tempMin <= 10) {
        this.tempMinIcon = Temperatures.QUARTER;
        this.tempMinIconColor = TempColors.QUARTER;
      }
      else if (this.tempMin > 10 && this.tempMin <= 20) {
        this.tempMinIcon = Temperatures.HALF;
        this.tempMinIconColor = TempColors.HALF;
      }
      else if (this.tempMin > 20 && this.tempMin <= 30) {
        this.tempMinIcon = Temperatures.THREE_QUARTERS;
        this.tempMinIconColor = TempColors.THREE_QUARTERS;
      }
      else {
        this.tempMinIcon = Temperatures.FULL;
        this.tempMinIconColor = TempColors.FULL;
      }

      this.tempAvg = Math.floor(this.data['main']['temp']);
      if (this.tempAvg <= 0) {
        this.tempAvgIcon = Temperatures.EMPTY;
        this.tempAvgIconColor = TempColors.EMPTY;
      }
      else if (this.tempAvg > 0 && this.tempAvg <= 10) {
        this.tempAvgIcon = Temperatures.QUARTER;
        this.tempAvgIconColor = TempColors.QUARTER;
      }
      else if (this.tempAvg > 10 && this.tempAvg <= 20) {
        this.tempAvgIcon = Temperatures.HALF;
        this.tempAvgIconColor = TempColors.HALF;
      }
      else if (this.tempAvg > 20 && this.tempAvg <= 30) {
        this.tempAvgIcon = Temperatures.THREE_QUARTERS;
        this.tempAvgIconColor = TempColors.THREE_QUARTERS;
      }
      else {
        this.tempAvgIcon = Temperatures.FULL;
        this.tempAvgIconColor = TempColors.FULL;
      }

      this.tempMax = Math.floor(this.data['main']['temp_max']);
      if (this.tempMax <= 0) {
        this.tempMaxIcon = Temperatures.EMPTY;
        this.tempMaxIconColor = TempColors.EMPTY;
      }
      else if (this.tempMax > 0 && this.tempMax <= 10) {
        this.tempMaxIcon = Temperatures.QUARTER;
        this.tempMaxIconColor = TempColors.QUARTER;
      }
      else if (this.tempMax > 10 && this.tempMax <= 20) {
        this.tempMaxIcon = Temperatures.HALF;
        this.tempMaxIconColor = TempColors.HALF;
      }
      else if (this.tempMax > 20 && this.tempMin <= 30) {
        this.tempMaxIcon = Temperatures.THREE_QUARTERS;
        this.tempMaxIconColor = TempColors.THREE_QUARTERS;
      }
      else {
        this.tempMaxIcon = Temperatures.FULL;
        this.tempMaxIconColor = TempColors.FULL;
      }

      this.humidity = this.data['main']['humidity'];
      this.pressure = this.data['main']['pressure'];
      this.windSpeed = this.data['wind']['speed'];

    }
    else {
      this.gotData = false;
      this.gotError = true;
      this.errorStatus = this.data['status'];
      this.errorMessage = this.data['error']['message'];

      // setTimeout(() => this.gotError = false, 2000);
    }
  }

  setCurrentTime(): void {
    let date = new Date();
    this.timeZoneOffset = this.data['timezone'] / 3600;
    this.currentTime = `${date.getUTCHours() + this.timeZoneOffset}:${date.getUTCMinutes()}`;
  }

  // toCelsius(temperature: number): number {
  //   return (temperature - 32) * 5 / 9;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
