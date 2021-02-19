<template>
  <div class="tabs-ui-view">
    <TabsUI :tabsList="tabsList" style="height: 100%;"></TabsUI>
  </div>
</template>
<script>
import TabsUI from '@/components/TabsUI'
import { getTabsList } from '@/libs/util'
import { mapState } from 'vuex'
export default {
  name: 'TabsMain',
  components: {
    TabsUI
  },
  data () {
    return {
      tabsList: []
    }
  },
  computed: {
    ...mapState('user', ['menuList'])
  },
  watch: {
    menuList: {
      immediate: true,
      handler (val) {
        if (val.length) {
          this.getTabsList()
        }
      }
    }
  },
  methods: {
    getTabsList () {
      // 获取 tabsList
      const { menuName, name, ifParent } = this.$route.meta
      
      this.tabsList = getTabsList(menuName, name, this.menuList)
      // 自动跳转到第一个 tab
      if (this.tabsList.length) {
        // 找到 menuList 中, 第一个 menuName 为 userCenter 的那一项
        const firstMenu = this.menuList.filter(item => item.menuName === menuName)[0]
        // 找到该项的 subMenuList 中, 第一个 routeName 为 demo 的那一项
        const firstSubMenu = firstMenu.subMenuList.filter(item => item.routeName === name)[0]
        
        if (ifParent && firstSubMenu.tabsList && firstSubMenu.tabsList.length) { // 路由重定向
          const firstTab = firstSubMenu.tabsList[0].name
          this.$router.push({
            name: firstTab
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs-ui-view {
  height: 100%;
}
</style>
