<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        color="#52a8ff"
        round
        size="small"
        class="search-btn"
      >搜索
      </van-button>
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div
        slot="nav-right"
        @click="isChannelEditShow=true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      :overlay="false"
      closeable
      close-icon-position
      get-container="body"
    />
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {
  },
  data () {
    return {
      value: '',
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .search-btn {
    width: 277px;
    height: 32px;
    border: none;
  }

  /deep/ .van-nav-bar__title {
    max-width: none;
  }

  .van-icon {
    font-size: 16px;
  }

  .van-button__text {
    font-size: 14px;
  }

  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: #edeff3;
    }
    /deep/.van-tabs__line {
      width: 15px !important;
      bottom: 20px;
      height: 3px;
      background: #3296fa;
    }
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 44px;
    line-height: 44px;
    background: #ffffff;
  }
}
</style>
