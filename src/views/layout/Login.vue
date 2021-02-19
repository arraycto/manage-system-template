<template>
  <div class="login">
    <div class="login-content">
      <h1>
        {{title}}
        <small>{{sub_title}}</small>
      </h1>
      <div id="login-form">
        <h3>Hi, 欢迎使用</h3>
        <Form ref="loginForm" :model="loginForm" @keyup.native.enter="submitHandler">
          <FormItem prop="name" :rules="{ required: true, message: ' ', trigger: 'change' }">
            <Input type="text" v-model="loginForm.name" placeholder="请输入您的员工编号" class="login-form-item" />
          </FormItem>
          <FormItem prop="password" :rules="{ required: true, message: ' ', trigger: 'change' }">
            <Input type="password" v-model="loginForm.password" placeholder="请输入您的密码" class="login-form-item" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submitHandler" :loading="isLoading" class="login-form-item linear-gradient login-btn">立即登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Modal v-model="cancelModal" title="提示信息" :mask-closable="false" :footer-hide="true" :closable="false">
      <div class="no-auth-model">
        <Icon type="md-warning" />
        <span style="padding-left: 5px;">{{ noAuthInfo }}</span>
      </div>
      <div class="no-auth-btn">
        <Button type="primary" @click="handleModalOk">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      title: '外部数据管理平台', // 标题
      sub_title: 'External Data Management Platform', // 副标题
      loginForm: {},
      cancelModal: false,
      noAuthInfo: '外部数据管理系统用户合法性校验没有通过，可能的原因是您没有系统合法用户或没有系统访问权限，若需访问，请联系外部数据管理系统支持人员！'
    }
  },
  computed: {
    ...mapState('user', ['isLoading', 'menuList'])
  },
  methods: {
    ...mapActions('user', ['loginHandler', 'getUserInfo']),
    submitHandler () {
      // 登录
      let me = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const data = {
            ...this.loginForm,
            name: this.loginForm.name.trim()
          }
          me.loginHandler(data).then(() => {
            me.getUserInfo().then(() => {
              const name = this.menuList[0].subMenuList[0].routeName
              me.$router.push({
                name
              })
            }).catch(err => {
              this.$Message.error(err || '获取用户信息失败')
            })
          }).catch(err => {
            this.$Message.error(err || '登录失败')
          })
        }
      })
    },
    handleModalOk () {
      this.cancelModal = false
    }
  },
  created () {
    this.cancelModal = this.$route.query && !!this.$route.query.noauth
  }
}
</script>
<style lang="less">
.login {
  .login-content {
    height: calc(100vh);
    position: relative;
    padding-left: 210px;
    padding-top: 193px;
    background: #000 url('../../../public/login.png') no-repeat 0px 0px;
    background-size: 100% 100%;

    h1 {
      font-size: 62px;
      color: #ffffff;
      letter-spacing: -1.27px;
      text-shadow: 0 4px 6px #0a215f;
      margin-top: 98px;

      small {
        font-size: 37px;
        letter-spacing: -0.76px;
        display: block;
        font-weight: normal;
        margin-top: 0px;
        font-family: PingFangSC-Thin;
        color: #fff;
        text-shadow: 0 4px 6px #0a215f;
      }
    }

    .login-des {
      font-size: 20px;
      color: #ffffff;
      letter-spacing: -0.41px;
      margin-top: 40px;
    }

    #login-form {
      background: #ffffff;
      width: 348px;
      padding: 32px 30px;
      position: absolute;
      top: 230px;
      right: 108px;

      h3 {
        font-size: 20px;
        color: #333333;
        letter-spacing: -0.41px;
        margin-bottom: 40px;
      }
    }

    .login-form-item {
      width: 288px;
    }

    .login-btn {
      margin-top: 16px;
    }
  }
}
.no-auth-btn {
  margin-top: 30px;
  padding-top: 16px;
  text-align: right;
  border-top: 1px solid #e8eaec;
  & .ivu-btn {
    margin-left: 20px;

    &:nth-of-type(1) {
      margin-left: 0px;
    }
  }
}
</style>
