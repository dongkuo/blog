import {Component, OnInit} from '@angular/core';
import {Article} from '../../models/article'
import {ArticleService} from '../../services/article.service'

@Component({
  selector: 'blog-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  articles: Article[];
  skip = 0;
  limit = 10;
  total = 0;
  hasMore = true;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getSummaries(0, this.limit).subscribe(res => {
      this.articles = res.data;
      this.total = res.total;
    });
  }

  onScroll() {
    if (!this.hasMore) {
      return;
    }
    this.articleService.getSummaries(++this.skip * this.limit, this.limit).subscribe(res => {
      for (let article of res.data) {
        this.articles.push(article);
      }
      this.hasMore = this.articles.length < res.total;
    });
  }

}
