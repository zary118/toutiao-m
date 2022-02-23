<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据的时间戳
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳
        with_top: 1 // 是否包含置顶
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false

      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: Date.now(), // 时间戳
        with_top: 1 // 是否包含置顶
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  width: 100%;
  position: fixed;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
