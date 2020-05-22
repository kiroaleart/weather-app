import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private BASE_URL: string = 'http://api.openweathermap.org/data/2.5/weather?q=';
  dataEmitter = new Subject<JSON>();

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(`${this.BASE_URL}${city}&appid=${environment.API_KEY}&units=metric`);
  }

}