<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        center
        class="base-info"
        :border="false"
      >
        <van-image
          width="50"
          height="50"
          slot="icon"
          round
          fit="cover"
          class="avatar"
          :src="currentUser.photo" />
        <div slot="title">{{ currentUser.name }}</div>
        <van-button
          size="small"
          round
          class="update-btn"
        >编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="num">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="num">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="num">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="num">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img src="./unlogin-img.png" class="mobile" alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid :column-num="2" class="mb-4">
      <van-grid-item
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell
      title="消息通知"
      is-link
      to="/"
    />
    <van-cell
      class="mb-4"
      title="小智同学"
      is-link
      to=""
    />
    <van-cell
      v-if="user"
      title="退出登录"
      class="logout-cell"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {} // 当前登录的用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message:
          '确认退出吗？'
      })
        .then(() => {
          // 确认执行
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 退出执行
        })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    padding: 20px;
    background: url(./banner.png) no-repeat;
    background-size: cover;
    .base-info {
      height: 115px;
      padding: 38px 0px 11px 0px;
      box-sizing: border-box;
      background-color: unset;
    }
    .van-grid-item__content {
      background-color: unset;
    }
    .avatar {
      box-sizing: border-box;
      margin-right: 11px;
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
    }
    .update-btn {
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
    .data-info {
      height: 65px;
      color: #ffffff;
      .text-wrap {
        text-align: center;
        .num {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url(./banner.png) no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
      border-radius: 50%;
    }
    .text {
      color: #ffffff;
      font-size: 14px;
    }
  }
  /deep/.van-grid {
    .van-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #f56e5d;
      }
      .toutiao-lishi {
        color: #ffa016;
      }
      .van-grid-item__text {
        color: #333333;
        font-size: 14px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #e36e62;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
