import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthApplicant } from '@app/auth/models/auth-applicant.model';
import { Applicant } from '@app/job-application/models';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { ApiUtils } from '@app/core/utils';

@Injectable({ providedIn: 'root' })
export class ApplicantService {
    #httpClient: HttpClient = inject(HttpClient);

    getAuthenticatedApplicant(): Observable<Applicant> {
        return this.#httpClient.get<Applicant>(ApiUtils.getApiUrl('/applicant/me'));
    }
}
