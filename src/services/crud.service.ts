import { from, Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { map } from 'rxjs/operators';
import { omit } from 'lodash';
import { HttpHelper } from '../helper/http.helper';
import { ResourceModel } from '../models';

export abstract class ApiBaseService {
  protected httpClient: AxiosInstance;
  basePath(): string {
    console.log('X12', this.resourcePath);
    if (!this.resourcePath || this.resourcePath.length === 0) {
      return this.resourcePath;
    }
    return `${this.resourcePath}`;
  }
  constructor(public apiUrl?: string, public resourcePath?: string) {
    this.httpClient = axios.create({
      baseURL: apiUrl,
    });
  }
}

export class CrudBaseService<T extends ResourceModel> {
  protected httpClient: AxiosInstance;
  protected apiUrl?: string;
  protected resourcePath?: string;
  protected resourceModel?: T;

  constructor(apiUrl?: string, resourcePath?: string) {
    this.httpClient = axios.create({
      baseURL: apiUrl,
    });
    this.apiUrl = apiUrl;
    this.resourcePath = resourcePath;
  }

  basePath(): string {
    if (!this.resourcePath || this.resourcePath.length === 0) {
      return this.resourcePath;
    }
    return `${this.resourcePath}`;
  }

  get(id: string): Observable<T> {
    return from(this.httpClient.get<T>(`${this.basePath()}/${id}`)).pipe(
      map((res) => res && res.data)
    );
  }

  filter(filterParams: any): Observable<T[]> {
    return from(
      this.httpClient.get<T[]>(this.basePath(), {
        params: HttpHelper.objectToHttpParams({ ...filterParams }),
      })
    ).pipe(map((res) => res && res.data));
  }

  create(model: T): Observable<any> {
    return from(
      this.httpClient.post(this.basePath(), {
        data: omit(model, ['id']),
      })
    );
  }

  update(id: string, model: T): Observable<any> {
    return from(
      this.httpClient.patch(`${this.basePath()}/${id}`, {
        data: omit(model, ['id']),
      })
    );
  }

  delete(id: string): Observable<any> {
    return from(this.httpClient.delete(`${this.basePath()}/${id}`));
  }
}
