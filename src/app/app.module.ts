import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { productReducer } from './products/state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './products/state/product.effects';

registerLocaleData(localeCs);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('products', productReducer),
    StoreDevtoolsModule.instrument({
      name: 'Product List App',
      maxAge: 25
    }),
    EffectsModule.forRoot([ProductEffects])
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'cs-CZ'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
