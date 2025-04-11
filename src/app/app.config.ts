import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom(NgxExtendedPdfViewerModule),
        importProvidersFrom(PdfViewerModule),
        importProvidersFrom(NgxDaterangepickerMd.forRoot()),
        provideHttpClient(),
    ],
};
