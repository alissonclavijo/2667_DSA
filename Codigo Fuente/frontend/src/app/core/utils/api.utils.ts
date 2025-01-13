import { environment } from '@env/environment';

export class ApiUtils {
    static getApiUrl(path: string, version: string = 'v1.0') {
        return `${environment.api.applicantService.url}/api/${version}${path.startsWith('/') ? '' : '/'}${path}`;
    }
}
