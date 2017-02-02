import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { StoreModule } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

import '../styles/styles.scss';
import '../styles/headings.css';
import { ScoreSheetComponent } from './scoresheet/scoresheet.component';
import { HttpService } from './shared/service/http.service';
import { UriGenerator } from './shared/service/urigenerator';
import { ScoreService } from './shared/service/score.service';
import { user } from './shared/reducer/user.reducer';
import { event } from './shared/reducer/event.reducer';
import { UserService } from './shared/service/user.service';
import { EventService } from './shared/service/event.service';
import { LoginComponent } from './login/login.component';
import { admin } from './shared/reducer/admin.reducer';
import { scoresheets } from './shared/reducer/scoresheets.reducer';
import { AdminModule } from './admin/admin.module';
import { uriGeneratorFactory } from './factoryfunctions';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
   bootstrap: [ AppComponent ],
   declarations: [
      AppComponent,
      AboutComponent,
      HomeComponent,
      NoContentComponent,
      XLargeDirective,
      ScoreSheetComponent,
      LoginComponent
   ],
   imports: [ // import Angular's modules
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
      StoreModule.provideStore({
         user,
         event,
         admin,
         scoresheets
      }),
      MaterialModule.forRoot(),
      AdminModule
   ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
      ENV_PROVIDERS,
      APP_PROVIDERS,
      HttpService,
      { provide: UriGenerator, useFactory:  uriGeneratorFactory },
      ScoreService,
      UserService,
      EventService,
      MdSnackBar
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
