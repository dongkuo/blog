export class Article {

  _id: string;
  title: string;
  word: number; // 字数
  view: number; // 阅读数
  comment: number; // 评论
  comments: string[]; // 评论
  labels: string[]; //标签
  summary: string; // 摘要
  html: string; // html 格式内容
  date: Date;
}
