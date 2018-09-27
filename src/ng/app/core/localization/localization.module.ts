import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';

registerLocaleData(locale);

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class LocalizationModule {}
