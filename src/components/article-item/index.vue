<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-ellipsis">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-wrap-item">
          <van-image
            fit="cover"
            v-for="(img, index) in article.cover.images"
            :src="img"
            :key="index"
            class="right-cover"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-right: 12px;
  }

  .right-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
