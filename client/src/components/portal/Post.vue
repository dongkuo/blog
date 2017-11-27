<template>
  <div>
    <link href="//cdn.bootcss.com/highlight.js/9.11.0/styles/default.min.css" rel="stylesheet">
    <link href="//cdn.bootcss.com/highlight.js/9.12.0/styles/github.min.css" rel="stylesheet">
    <link href="//cdn.bootcss.com/KaTeX/0.9.0-alpha/katex.min.css" rel="stylesheet">

    <h1 class="title">{{post.title}}</h1>
    <div>
      <span class="attribute">阅读 {{post.reading_number}}</span>
      <span class="attribute">喜欢 {{post.like_number}}</span>
      <span class="attribute">评论 {{post.commenting_number}}</span>
    </div>
    <!--正文-->
    <div id="post">
      <!--封面-->
      <figure v-if="post.cover_image">
        <img :src="post.cover_image">
        <figcaption>{{post.cover_caption}}</figcaption>
      </figure>
      <div v-html="post.html"></div>
      <p class="attribute">
        <i class="fa fa-tags" aria-hidden="true"></i>
        <span v-for="label in post.labels" :key="label">
          <router-link to="" class="link-second">{{label}}</router-link>
          &nbsp;
        </span>
      </p>
      <!--end-->
      <app-divider>{{post.finished_time | date('yyyy/MM/dd')}}</app-divider>
      <!--点赞-->
      <p class="text-center">
        <app-thumbs-up :number="post.like_number"></app-thumbs-up>
      </p>
    </div>
    <app-comment :comments="comments"></app-comment>
  </div>
</template>

<script>
import AppDivider from "../public/Divider";
import AppThumbsUp from "../public/ThumbsUp";
import AppComment from "./comment/Comment";

export default {
  components: { AppDivider, AppThumbsUp, AppComment },
  created() {
    this.getPost();
  },
  data() {
    return {
      post: {
        // title: "梵高先生",
        // labels: ['读书', '散文'],
        // readingNumber: 2302,
        // likeNumber: 1029,
        // cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1506787077&di=6ea65563ad8dfb64e4c892f1d89b68a0&src=http://p1.music.126.net/krwNlZ-AIiMhoHO1IVpb7g==/1402976843038581.jpg',
        // coverCaption: '李志 — 梵高先生',
        // html: '<p><strong>1.</strong></p>\n<p>梵高先生是谁，我不知道。</p>\n<p><strong>2.</strong></p>\n<p>一年前，无意中听到一首歌，来自一名叫做李志的民谣歌手，歌名叫做梵高先生。</p>\n<p>奇怪的歌词，配上略带伤感的吉他旋律，散发出一种说不出的孤独。</p>\n<p>那位被调侃为B哥的男人，在一间不大的酒吧舞台上肆无忌惮地唱，“谁的父亲死了，请你叫我如何悲伤”。</p>\n<p>台下一片欢呼。</p>\n<p>好奇搜索了他的资料，一路坎坷：大学肄业，租房写歌，借钱出唱片……</p>\n<p>之后又看了他的演唱视频。从光头到长发，从年轻的放荡不羁到逐渐走向成熟。那位始终带着眼镜的男人，穿着黑色的T恤，有时光着膀子，抱一把吉他，在人群里嘶吼。声音喑哑低沉，仿佛不像是从喉咙里发出。</p>\n<p>后来又找到了他更多的视频，听了他所有的歌。他会在歌曲的间隙间拼命地吸烟，有时会喝酒；他会不时的和观众的调侃，话语中带着粗话；他会在唱到悲伤时流泪，唱到悲愤时摔掉吉他……</p>\n<p>而台下始终是一片欢呼。</p>\n<p>再后来，看到他说他不再唱《梵高》，原因不太清楚。</p>\n<p>他曾在《梵高》里写：我们生来就是孤独，我们生来就是孤单。</p>\n<p><strong>3.</strong></p>\n<p>几个月前，偶然看到一本书。书名叫作《渴望生活》，画家梵高的传记。</p>\n<p>文森特·梵高是这个世界上最孤独的人之一。欧文·斯通在这本书的前言里这样写道。</p>\n<p>不知道自己是什么时候开始听说梵高。也许是在小学的美术课上，老师指着某幅画说，它的作者是梵高；也许是在初中时看过的某本刊物杂志的封面上，印着那幅大名鼎鼎的《星空》；又或许是几年前在新闻里听说，一位叫做梵高的画家的画，以高价卖出。但直到后来，才认真地去搜集他的资料，了解他的平生。</p>\n<p>资料里，那位年轻的疯狂画家，为了追求自己的表姐把手掌烧烂；用剃须刀割掉自己的一只耳朵献给一个妓女。他一生穷困，画了近九百幅画作，卖出的却寥寥无几，经常需要靠弟弟提奥的资助才能度日；而后来他以赶乌鸦为由，向邻居骗了一把猎枪，最终在希望的麦田上，用那把枪对着自己的脑袋，狠狠地扣动了扳机。他临终时说，这苦难啊，永远也不会终结。</p>\n<p>我不懂得如何去品鉴他的画，更不知如何从中觉察出伟大的艺术气息。但我知道，那些明亮绚丽的，像是孩子所作的画，一定倾注了他一生的追求。我想知道，一个人，是在被逼到了怎样的境地或是在拥有了怎样的勇气或信念后，才能下定决心，痛痛快快地将自己处理掉。他画了《星空》，画了《向日葵》，画了《吃土豆的农民》，甚至还画了《自画像》，可终究还是倒在了自己的枪下。</p>\n<p>安妮在《最孤独的人》解释说，那是一种骚动激越的情绪纠缠在压抑而明丽的色彩中，令人不安的气息扑面而来。是暴雨之前的清新而寒冷的风。是灵魂无法突破的孤独。梵高终于发现，生命的疼痛滋长于自我挖掘的伤口。于是，他给自己开了一枪。</p>\n<p>李志是孤独的，梵高也是孤独的，在这个世界上还存在着无数孤独的人。他们唱着自己的歌，画着自己的画，在坚实的大地上仰望被城市建筑物分割的星空，过着无从选择的生活。他们不被理解，忍受而又享受着孤独。</p>\n<p><strong>4.</strong></p>\n<p>梵高先生是谁？我不知道。</p>\n<p>也许他只是普通人。</p>',
        // commentingNumber: 1872,
        // createdTime: new Date()
      },
      comments: [
//        {
//          avatar: "http://www.qq1234.org/uploads/allimg/140715/163JTZ3-13.png",
//          nickname: "Janus Zhang",
//          content: "别人晚上困觉 我到夜半精神 岂是造物所致 内心烦杂交困 上帝向左，我向右",
//          createdTime: new Date("2016-05-01 08:13:09"),
//          isShowReply: false,
//          isShowReplyInput: false
//        },
//        {
//          avatar:
//            "http://img5.imgtn.bdimg.com/it/u=2748888549,3523102698&fm=27&gp=0.jpg",
//          nickname: "狂曲想",
//          content: "写的很好，文笔不错！，正如青春无悔，怎奈失去才珍惜！人生本是不断救赎与反思中，每一次脱胎换骨是为了飞向天空的铺垫。",
//          createdTime: new Date("2017-03-04 12:43:09"),
//          isShowReply: false,
//          isShowReplyInput: false,
//          replies: [
//            {
//              avatar:
//                "http://img1.2345.com/duoteimg/qqTxImg/11/2012091910313510745.jpg",
//              nickname: "装病的疯子",
//              content: "所以，求教师兄有什么好的建议",
//              createdTime: new Date("2017-03-04 16:21:45"),
//              isShowReply: false,
//              isShowReplyInput: false
//            },
//            {
//              avatar:
//                "http://www.shishanghezi.com/data/attachment/forum/201310/05/230529hen06yvddrrt68o0.jpg",
//              nickname: "花晓柳",
//              content:
//                "其实，按照别人说的改也没什么不好，前期自己的储备量不够，多听听别人的建议，但一定要明白为什么他要这么改，有没有更好的办法，以后遇到类似的该怎么处理",
//              createdTime: new Date("2017-03-05 09:22:19"),
//              isShowReply: false,
//              isShowReplyInput: false
//            }
//          ]
//        },
//        {
//          avatar: "http://p.3761.com/pic/31241424996562-lp.jpg",
//          nickname: "蒋小坏",
//          content:
//            "是的，通常公司是不会让一个人掌握研发和采购两个渠道的资源的，因为这样锻炼出来的员工留下来的几率很小，人的想法是随着能力的不断提升而改变的，眼界也是，所以一个单兵能力强的人，最后的归属一定一定自主创业，这是唯一的出路。",
//          createdTime: new Date("2017-09-30 18:25:24"),
//          isShowReply: false,
//          isShowReplyInput: false
//        }
      ]
    };
  },
  methods: {
    getPost() {
      this.$http.api.post
        .get(this.$route.params.id)
        .then(resp => {
          this.post = resp.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 30px;
  margin: 16px 0;
}

.attribute {
  color: #8590a6;
  font-size: 13px;
  margin-right: 8px;
}

@media screen and (max-width: 720px) {
  .title {
    font-size: 24px;
    margin: 16px 0 8px 0;
  }
}
</style>
