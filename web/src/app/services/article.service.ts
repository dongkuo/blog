import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/groupBy";
import {Observable} from "rxjs/Observable";
import {Article} from "../models/article";


@Injectable()
export class ArticleService {

  constructor(private http: Http) {
  }

  getSummaries(skip = 0, limit = 10): Observable<any> {
    return this.http.get(`/api/articles/summaries?skip=${skip}&limit=${limit}`)
      .map(ArticleService.extractData)
      .catch(ArticleService.handleError);
  }

  getArchives(): Observable<Article[]> {
    return this.http.get('/api/articles/archives')
      .map(ArticleService.extractData)
      .catch(ArticleService.handleError);
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get(`/api/articles/${id}`)
      .map(ArticleService.extractData)
      .catch(ArticleService.handleError);
  }

  private static handleError(error: any): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private static extractData(res: Response) {
    return res.json() || [];
  }
}
