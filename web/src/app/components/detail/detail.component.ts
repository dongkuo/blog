import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Article} from "../../models/article";
import 'rxjs/add/operator/switchMap';
import {ScriptLoaderService} from "../../services/script-loader.service";

@Component({
  selector: 'blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: Article = new Article();

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private scriptLoaderService: ScriptLoaderService) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.articleService.getArticle(params['id']))
      .subscribe(article => {
        if(article){
          article.date = new Date(article.date);
          this.article = article;
        }
      });

    this.scriptLoaderService
      .load('http://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML,local/local', true, 1000)
      .subscribe(() => {
        (window as any).MathJax.Hub.Config({
          tex2jax: {inlineMath: [['$', '$']]},
          "HTML-CSS": {scale: 96}
        });
        (window as any).MathJax.Hub.Typeset(document.body);
      });
  }
}
