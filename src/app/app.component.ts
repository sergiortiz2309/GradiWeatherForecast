import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OneCallResponse } from '../oneCallResponse';
import { HttpClient } from '@angular/common/http';
import { ConfigParameters } from '../configParameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'GradiWeatherForecast';
  bogOneCallResponse: OneCallResponse;
  bogIconUrl: string;  
  bogIcon1Url: string; 
  bogIcon2Url: string; 
  bogIcon3Url: string; 
  parisIconUrl: string;
  parisOneCallResponse: OneCallResponse;

  constructor(private httpClient: HttpClient) {

    this.getOneCallResponse(ConfigParameters.bogotaLat, ConfigParameters.bogotaLon)
        .subscribe(data => {
          this.bogOneCallResponse = data;
          this.bogOneCallResponse.current.dt = new Date (Number(data.current.dt) * 1000);
          this.bogIconUrl = this.getIconUrl(this.bogOneCallResponse.current.weather[0].main);
          

          this.bogOneCallResponse.daily[1].dt = new Date (Number(data.daily[1].dt) * 1000);
          this.bogOneCallResponse.daily[2].dt = new Date (Number(data.daily[2].dt) * 1000);
          this.bogOneCallResponse.daily[3].dt = new Date (Number(data.daily[3].dt) * 1000);
          this.bogIcon1Url = this.getIconUrl(this.bogOneCallResponse.daily[1].weather[0].main);
          this.bogIcon2Url = this.getIconUrl(this.bogOneCallResponse.daily[2].weather[0].main);
          this.bogIcon3Url = this.getIconUrl(this.bogOneCallResponse.daily[3].weather[0].main); 
          console.log(data.daily[1].weather);
        })

        this.getOneCallResponse(ConfigParameters.parisLat, ConfigParameters.parisLon)
        .subscribe(data => {
          this.parisOneCallResponse = data;
          this.parisOneCallResponse.current.dt = new Date (Number(data.current.dt) * 1000);
          this.parisIconUrl = this.getIconUrl(this.parisOneCallResponse.current.weather[0].main);

          this.parisOneCallResponse.daily[1].dt = new Date (Number(data.daily[1].dt) * 1000);
          this.parisOneCallResponse.daily[2].dt = new Date (Number(data.daily[2].dt) * 1000);
          this.parisOneCallResponse.daily[3].dt = new Date (Number(data.daily[3].dt) * 1000); 
          console.log(data.daily[1].weather);
        })
  }

  private getOneCallResponse(lat: number, lon: number): Observable<OneCallResponse> {
    var url = `${ConfigParameters.apiUrl}?lat=${lat}&lon=${lon}&units=${ConfigParameters.unit}&appId=${ConfigParameters.key}`
    return this.httpClient.get<OneCallResponse>(url);
  }

  private getIconUrl(main: string): string {
    
    const baseUrl = "http://openweathermap.org/img/wn/";
    
    switch (main.toLowerCase()) {

      case "thunderstorm": return `${baseUrl}/${ConfigParameters.thunderStormIconId}@2x.png`;
      case "drizzle": return `${baseUrl}/${ConfigParameters.drizzleIconId}@2x.png`;
      case "rain": return `${baseUrl}/${ConfigParameters.rainIconId}@2x.png`;
      case "snow": return `${baseUrl}/${ConfigParameters.snowIconId}@2x.png`;
      case "mist": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "smoke": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "haze": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "dust": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "fog": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "sand": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "ash": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "squall": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "tornado": return `${baseUrl}/${ConfigParameters.mistIconId}@2x.png`;
      case "clear": return `${baseUrl}/${ConfigParameters.clearIconId}@2x.png`;
      case "clouds": return `${baseUrl}/${ConfigParameters.clearIconId}@2x.png`;     

      default: return "clear";
    }
  }
}