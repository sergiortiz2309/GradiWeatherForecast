import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OneCallResponse } from '../oneCallResponse';
import { HttpClient } from '@angular/common/http';
import { ConfigParameters } from '../confirgParameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'GradiWeatherForecast';
  oneCallResponse: OneCallResponse;  

  constructor(private httpClient: HttpClient) {

    this.getOneCallResponse()
        .subscribe(data => {
          this.oneCallResponse = data;
          this.oneCallResponse.current.dt = new Date (Number(data.current.dt) * 1000);
          this.oneCallResponse.daily[1].dt = new Date (Number(data.daily[1].dt) * 1000);
          this.oneCallResponse.daily[2].dt = new Date (Number(data.daily[2].dt) * 1000);
          this.oneCallResponse.daily[3].dt = new Date (Number(data.daily[3].dt) * 1000); 
          console.log(data.daily[1].weather);
        })
  }

  private getOneCallResponse(): Observable<OneCallResponse> {
    var url = `${ConfigParameters.apiUrl}?lat=${ConfigParameters.bogotaLat}&lon=${ConfigParameters.bogotaLon}&units=${ConfigParameters.unit}&appId=${ConfigParameters.key}`
    return this.httpClient.get<OneCallResponse>(url);
  }
}