import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PrimeNG } from 'primeng/config';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TranslateModule,
        ConfirmDialogModule,
        ToastModule,
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'postulacion-espe';

    constructor(
        private faLibrary: FaIconLibrary,
        private primeng: PrimeNG,
        private translateService: TranslateService,
    ) {
        faLibrary.addIconPacks(
            fas,
            far,
            fab,
        );

        this.translateService.addLangs(['es']);
        this.translateService.setDefaultLang('es');

        //const browserLang = translateService.getBrowserLang();
        //const lang = browserLang?.match(/en|es/) ? browserLang : 'es';

        this.translate('es');
    }

    ngOnInit() {}

    translate(lang: string) {
        this.translateService.use(lang);

        setTimeout(() => {
            this.translateService.stream('primeng').subscribe(data => {
                this.primeng.setTranslation(data);
            });
        }, 500);
    }
}
