let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let ObjectId = require('mongodb').ObjectId;
let marked = require('marked');
let highlight = require('highlight.js');
let renderer = new marked.Renderer();

renderer.image = function (href, title, text) {
  return "<figure><img src=" + href + " title='" + text + "'/><figcaption>" + text + "</figcaption></figure>";
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

/**
 * 新建文章
 */
router.post('/', (req, res) => {
  let article = req.body;
  article.date = new Date(article.date);
  article.html = marked(article.markdown);
  article.content = clearTag(article.html);
  article.summary = article.content.substring(0, 180);
  mongo.getCollection('articles')
    .insertOne(article, (err, r) => {
      if (err) {
        console.err(err);
        res.status(500).end();
        return;
      }
      res.json({code: 0, message: '', data: r.ops[0]})
    });
});

/**
 * 根据id获取文章
 */
router.get('/:id', (req, res) => {
  mongo.getCollection('articles').findOne({_id: ObjectId(req.params.id)}, (err, r) => {
    if (err) {
      console.err(err);
      res.status(500).end();
      return;
    }
    res.json({code: 0, message: '', data: r})
  });
});


/**
 * 更新文章
 */
router.put('/:id', (req, res) => {
  let article = req.body;
  article.date = new Date(article.date);
  article.html = marked(article.markdown);
  article.content = clearTag(article.html);
  article.summary = article.content.substring(0, 180);
  mongo.getCollection('articles').updateOne({_id: ObjectId(req.params.id)}, {$set: article}, (err, r) => {
    if (err) {
      console.err(err);
      res.status(500).end();
      return;
    }
    res.json({code: 0, message: '', data: r})
  });
});

/**
 * 删除文章
 */
router.delete('/:id', (req, res) => {
  mongo.getCollection('articles').deleteOne({_id: ObjectId(req.params.id)}, (err, r) => {
    if (err) {
      console.err(err);
      res.status(500).end();
      return;
    }
    res.json({code: 0, message: '', data: r})
  });
});

/**
 * 清除html标签
 * @param html
 */
function clearTag(html) {
  return html.replace(/<.*?>/g, '');
}

router.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).json({code: 1, message: 'Internal Server Error', data: ''});
});

module.exports = router;
