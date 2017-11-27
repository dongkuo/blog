<template>
  <div class="wrapper">
    <div v-for="group in momentGroups">
      <!--年月-->
      <div class="timeline">
        <div class="label-wrapper label-wrapper-title">
          <div class="label-box label-box-title">{{new Date(group.time).toDateString().split(' ')[1]}}</div>
        </div>
        <h2 class="content content-title">{{group.time | date('yyyy年MM月')}}</h2>
      </div>
      <!--日期、内容-->
      <div v-for="moment in group.moments" class="timeline">
        <div class="label-wrapper">
          <div class="label-box">{{moment.created_time | date('dd')}}</div>
        </div>
        <p class="content">{{moment.content}}</p>
      </div>
    </div>
    <infinite-loading @infinite="getMoments">
      <!--结束-->
      <div class="timeline timeline-end" slot="no-more">
        <div class="label-wrapper label-wrapper-end">
          <div class="label-box label-box-end">End</div>
        </div>
        <h2 class="content content-title"></h2>
      </div>
      <p slot="no-results">
        <app-emoji :size="2">🐒</app-emoji><br/>啥都没有啊 …
      </p>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from "vue-infinite-loading";
  import AppEmoji from "../public/Emoji";

  export default {
    components: {
      InfiniteLoading,
      AppEmoji
    },
    data() {
      return {
        page: 0,
        size: 10,
        total: Number.POSITIVE_INFINITY,
        momentGroups: []
      }
    },
    methods: {
      getMoments($state) {
        if (this.page * this.size >= this.total) {
          $state.complete();
          return;
        }
        this.$http.api.moments
          .list(this.page + 1, this.size)
          .then(resp => {
            if (resp.data.data.content.length === 0) {
              $state.complete();
              return;
            }
            resp.data.data.content.forEach(moment => {
              let date = new Date(moment.created_time)
              let group = this.searchGroup(new Date(date.getFullYear() + '-' + (date.getMonth() + 1)).getTime())
              group.moments.push(moment)
            })
            this.page = resp.data.data.page
            this.total = resp.data.data.total;
            $state.loaded();
          })
          .catch(e => {
            console.error(e)
            $state.complete();
          })
      },
      searchGroup(time) {
        // 二分法查找
        let low = 0, high = this.momentGroups.length - 1
        while (low <= high) {
          let mid = parseInt((low + high) / 2)
          if (this.momentGroups[mid].time === time) {
            return this.momentGroups[mid]
          }
          if (this.momentGroups[mid].time > time) {
            low = mid + 1
          } else {
            high = mid - 1
          }
        }
        // 未找到
        let newGroup = {time, moments: []}
        this.momentGroups.push(newGroup)
        return newGroup
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    margin: 16px 0;
  }

  .wrapper:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #3b90c8;
    position: absolute;
    top: 0;
    left: 23px;
    z-index: 1;
  }

  .timeline {
    position: relative;
    margin-bottom: 48px;
  }

  .timeline-end{
    margin: 0;
  }

  .label-wrapper {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 2px solid #1296db;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: #fbfcfc;
    border-radius: 50%;
    padding: 2px;
  }

  .label-box {
    width: 100%;
    font-weight: bold;
    color: #1296db;
    font-size: 20px;
    line-height: 40px;
  }

  .label-wrapper-title {
    border-radius: 0;
  }

  .label-box-title {
    font-size: 14px;
    color: white;
    background: #1296db;
  }

  .label-box-end {
    color: #ffffff;
    font-size: 14px;
  }

  .content-title {
    margin: 0;
    line-height: 52px;
    font-size: 24px;
  }

  .label-wrapper-end {
    font-weight: bold;
    color: white;
    font-size: 16px;
    background: #1296db;
    border-radius: 0;
  }

  .label-wrapper-end a {
    color: white;
  }

  .label-wrapper-end a:hover {
    color: #5a5239;
  }

  .content {
    margin-left: 80px;
    min-height: 48px;
  }

  @media screen and (max-width: 720px) {

    .timeline {
      margin-bottom: 32px;
    }

    .wrapper:before {
      left: 21px;
      z-index: 1;
    }

    .label-wrapper {
      width: 36px;
      height: 36px;
    }

    .label-box {
      font-size: 14px;
      line-height: 36px;
    }

    .content {
      margin-left: 56px;
      min-height: 40px;
    }

    .content-title {
      line-height: 40px;
      font-size: 20px;
    }

  }
</style>
