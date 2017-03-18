class Article {

  constructor(id, title, date, word, view, comment, labels, summary) {
    this.id = id;
    this.title = title;
    this.word = word;
    this.view = view;
    this.comment = comment;
    this.labels = labels;
    this.summary = summary;
    this.date = date;
  }
}

module.exports = Article;
