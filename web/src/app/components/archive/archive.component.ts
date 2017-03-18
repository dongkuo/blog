import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import "rxjs/add/operator/groupBy";

@Component({
  selector: 'blog-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  archives = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getArchives().subscribe((articles) => {
      let array;
      let lastYear = -1;
      for (let article of articles) {
        article.date = new Date(article.date);
        if (lastYear !== article.date.getFullYear()) {
          array = [];
          this.archives.push(array);
        }
        array.push(article);
        lastYear = article.date.getFullYear();
      }
    });
  }

}
