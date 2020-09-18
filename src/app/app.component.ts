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
          this.oneCallResponse.daily[0].dt = new Date (data.daily[0].dt);
        })
  }

  private getOneCallResponse(): Observable<OneCallResponse> {
    var url = `${ConfigParameters.apiUrl}?lat=${ConfigParameters.bogotaLat}&lon=${ConfigParameters.bogotaLon}&units=${ConfigParameters.unit}&appId=${ConfigParameters.key}`
    return this.httpClient.get<OneCallResponse>(url);
  }
}