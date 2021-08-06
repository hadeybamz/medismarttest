import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { ApiService } from './api.service';
import { IAppConfig } from 'src/app/interfaces/app-config.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http: HttpClient;

  config: IAppConfig | undefined;

  constructor(handler: HttpBackend, private apiService: ApiService) {
    this.http = new HttpClient(handler);
  }

  load() {
    const file = `assets/config/app-config.json`;

    return new Promise<void>((resolve, reject) => {
      this.http
        .get<IAppConfig>(file)
        .toPromise()
        .then((response: IAppConfig) => {
          this.config = <IAppConfig>response;

          if (this.config && this.config.data) {
            console.log(this.config);
            this.apiService.apiBaseURL = this.config.data.api;
          }

          this.apiService.version = environment.version;

          resolve();
        })
        .catch((response: any) => {
          console.log(response);
          reject(`Could not load config file: ${JSON.stringify(response)}`);
        });
    });
  }
}
