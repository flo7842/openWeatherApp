import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecastService } from './service/weather-forecast.service';
import { faCloud, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  WeatherData:any;
  faCloud = faCloud;
  faMoon = faMoon;
  faSun = faSun;

  constructor(private forecastService: WeatherForecastService){}
  
  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.LoadCurrentWeather();
    console.log(this.WeatherData);
  }


  LoadCurrentWeather(){
    this.forecastService.getWeatherData()
      .toPromise()
      .then((response: any)=> this.setWeatherData(response))
      .then(data=>{;})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}
