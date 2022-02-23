<template>
  <div class="login-container">
    <van-nav-bar
      title="登录 / 注册"
      left-arrow
      class="app-nav-bar"
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      validate-first
      ref="login-form"
    >
      <van-cell-group inset>
        <van-field
          clearable
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          right-icon="warning-o"
          placeholder="请输入手机号"
          name="mobile"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          name="code"
          :rules="formRules.code"
        >
          <template #button>
            <v-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-if="!isCountDownShow"
              type="info"
              class="send-btn"
              size="mini"
              round
              @click.prevent="onSendSms"
              :loading="isSendSmsLoading"
            >获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: '246810'
      },
      // 验证规则
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'onBlur'
          },
          {
            pattern: /^1[3|5|7|9]\d{9}$/,
            message: '请输入正确的手机号!',
            trigger: 'onBlur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码!',
            trigger: 'onBlur'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
            trigger: 'onBlur'
          }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 找到数据接口
      // 封装请求方法
      // 请求调用登录
      try {
        const { data } = await login(this.user)
        // 处理响应结果
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态（token等）放到Vuex容器中
        this.$store.commit('setUser', data.data)
        // 登陆成功，跳转回原来的页面
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败, 手机号或者验证码错误！')
      }
    },
    // 提交表单且验证不通过后触发(failed)
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          position: 'top',
          message: error.errors[0].message
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        await sendSms(this.user.mobile)
        // 短信发送显示倒计时
        this.isCountDownShow = true
        // loading状态、
        this.isSendSmsLoading = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败
          message = err.message
        } else {
          // 其它错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          position: 'top',
          message
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  color: #000;

  .send-btn {
    background: #eeeeee;
    color: #666666;
    border: none;
  }

  .login-btn-wrap {
    padding: 26px 16px;

    .login-btn {
      background: #66b0ff;
      border: none;
    }
  }

}
</style>
