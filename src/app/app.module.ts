import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from './shared/shared.module';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AppConfigService } from './shared/services/app-config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/services/interceptor.service';
import { environment } from 'src/environments/environment';

export function initializeAppConfig(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'contact',
  },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContactComponent,
    ContactFormComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfig,
      deps: [AppConfigService],
      multi: true,
    },
    { provide: 'partialDocumentTitle', useValue: ` | ${environment.appName}` },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
