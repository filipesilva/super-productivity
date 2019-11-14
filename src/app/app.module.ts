import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {UiModule} from './ui/ui.module';
import {reducers} from './root-store';
import {CoreModule} from './core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {PagesModule} from './pages/pages.module';
import {MainHeaderModule} from './core-ui/main-header/main-header.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TasksModule} from './features/tasks/tasks.module';
import {TimeTrackingModule} from './features/time-tracking/time-tracking.module';
import {BookmarkModule} from './features/bookmark/bookmark.module';
import {NoteModule} from './features/note/note.module';
import {ReminderModule} from './features/reminder/reminder.module';
import {CoreUiModule} from './core-ui/core-ui.module';
import {GlobalErrorHandler} from './core/error-handler/global-error-handler.class';
import {MyHammerConfig} from '../hammer-config.class';
import {ProcrastinationModule} from './features/procrastination/procrastination.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageCode} from './app.constants';
import {LanguageService} from './core/language/language.service';
import {ConfigModule} from './features/config/config.module';
import {ProjectModule} from './features/project/project.module';
import {EntityDataModule} from '@ngrx/data';
import {MaterialCssVarsModule} from 'angular-material-css-vars';
import { GestureConfig } from "../gesture-config";

// NOTE: export required for aot to work
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Those features need to be included first for store not to mess up, probably because we use it initially at many places
    ConfigModule,
    ProjectModule,

    // Local
    CoreModule,
    UiModule,
    CoreUiModule,
    PagesModule,
    MainHeaderModule,
    MatSidenavModule,
    ProcrastinationModule,
    TimeTrackingModule,
    ReminderModule,
    CoreUiModule,
    NoteModule,
    BookmarkModule,
    TasksModule,
    MaterialCssVarsModule.forRoot(),

    // External
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    // NOTE: both need to be present to use forFeature stores
    StoreModule.forRoot(reducers,
      environment.production
        ? {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
            strictStateSerializability: false,
            strictActionSerializability: false,
          },
        }
        : {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictStateSerializability: true,
            strictActionSerializability: true,
          },
        }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
    FormlyModule.forRoot({
      extras: {
        immutable: true
      },
      validationMessages: [
        {name: 'required', message: 'This field is required'},
        {name: 'pattern', message: 'Invalid input'},
      ],
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    EntityDataModule,
    HammerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ],
})
export class AppModule {
  constructor(
    private _languageService: LanguageService,
  ) {
    this._languageService.setDefault(LanguageCode.en);
    this._languageService.setFromBrowserLngIfAutoSwitchLng();
  }
}
