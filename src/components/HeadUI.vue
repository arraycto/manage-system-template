<template>
  <div class="head">
    <span v-show="!menuState">
      <Icon type="md-arrow-round-forward" class="show-menu-btn" :size="26" @click="showMenuHandler" />
    </span>
    <span class="user">
      <Avatar icon="md-person" />
      <span class="user-name">{{userName}}</span>
      <Dropdown placement="bottom-end" trigger="hover" @on-click="quit">
        <a href="javascript:void(0)">
          <Icon type="ios-arrow-down" style="color: #444A54; margin-left: 10px;" size="20"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="quit">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    title: { // 平台名称
      type: String,
      default: ''
    },
    userName: { // 登录用户名
      type: String,
      default: ''
    },
    menuState: {
      type: Boolean,
      default: true
    },
    tabsList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    quit () { // 退出登录
      this.$emit('on-logout')
    },
    showMenuHandler () {
      this.$emit('show-menu', true)
    }
  }
}
</script>
<style lang="less" scoped>
.head {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    font-weight: 700;
    color: #444a54;
    letter-spacing: 0;
    margin-left: -10px;
  }
  .user {
    float: right;

    .user-name {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #444a54;
      letter-spacing: 0;
      line-height: 32px;
      margin-left: 10px;
    }
  }
  .show-menu-btn {
    cursor: pointer;
    margin-left: 40px;
  }
}
</style>
