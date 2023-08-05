import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class RestService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly http = inject(HttpClient);
}
