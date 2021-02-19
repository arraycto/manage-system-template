<template>
  <div class="menu-ui-view" v-show="menuState">
    <div style="height: 64px;">
      <Icon type="md-menu" :size="30" color="#fff" class="icon-logo" @click="toggleHandler" />
      <img class="img-logo" src="../../public/logo.svg" alt="">
    </div>
    <Menu ref="leftMenu" :open-names="openName" width="200" theme="dark" :active-name="active">
      <template v-for="(item, index) in menuListData">
        <Submenu :name="'' + index" :key="'menu_' + index" class="sub-title">
          <template slot="title">
            <!-- <Icon :type="item.type" /> -->
            <img :src="require('../../public/' + item.type + '.png')" alt="">
            {{ item.title }}
          </template>
          <MenuItem :to="val.routePath" :key="num" :name="val.routeName" v-for="(val, num) in item.subMenuList">
          <span>{{val.menuTitle}}</span>
          </MenuItem>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>
<script>
export default {
  name: 'MenuUI',
  props: {
    menuListData: { // 菜单数据
      type: Array,
      default: () => []
    },
    menuState: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: '',
      openName: ['0']
    }
  },
  watch: {
    menuListData: {
      handler (val) {
        val.length > 0 && this.showMenu()
        this.$nextTick(() => {
          this.$refs.leftMenu.updateActiveName()
          this.$refs.leftMenu.updateOpened()
        })
      }
    },
    $route: {
      immediate: true,
      handler (val) {
        this.menuListData.length > 0 && this.showMenu()
      }
    }
  },
  methods: {
    selectMenu (name) {
      this.active = name
    },
    // 一级菜单展示
    showMenu () {
      const name = this.$route.meta.name
      if (name !== this.active) {
        this.active = name
      }
      this.menuListData.forEach((item, index) => {
        const len = item.subMenuList.filter(i => {
          return i.routeName === this.active
        }).length
        if (+len > 0 && this.openName.indexOf(index.toString()) < 0) {
          this.openName.push(index.toString())
        }
      })
    },
    toggleHandler () {
      this.$emit('hideMenu', false)
    }
  },
  created () {
    const name = this.$route.meta.name
    if (name) {
      this.active = name
    } else {
      this.active = this.menuListData[0] && this.menuListData[0].routeName
    }
  }
}
</script>

<style lang="less">
.menu-ui-view {
  height: 100% !important;
  background-color: #2b2f42;
  .icon-logo {
    margin-left: 20px;
    line-height: 64px;
    cursor: pointer;
  }
  .img-logo {
    width: 130px;
    height: 35px;
    margin-top: -85px;
    margin-left: 60px;
    display: inline-block;
  }
  .sub-title {
    img {
      height: 20px;
      display: inline-block;
      margin-right: 10px;
      margin-top: -5px;
    }
  }
}
</style>
