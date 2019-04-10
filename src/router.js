import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/components',
      name: 'components',
      meta: {
        icon: 'logo-buffer',
        title: '组件'
      },
      component: () =>
        import(/* webpackChunkName: "about" */ './components/HelloWorld.vue'),
      children: [
        {
          path: 'count_to_page',
          name: 'count_to_page',
          meta: {
            icon: 'md-trending-up',
            title: '数字渐变'
          },
          component: () => import('@/components/count-to/count-to.vue')
        }
        // {
        //   path: 'drag_list_page',
        //   name: 'drag_list_page',
        //   meta: {
        //     icon: 'ios-infinite',
        //     title: '拖拽列表'
        //   },
        //   component: () => import('@/view/components/drag-list/drag-list.vue')
        // },
        // {
        //   path: 'tables_page',
        //   name: 'tables_page',
        //   meta: {
        //     icon: 'md-grid',
        //     title: '多功能表格'
        //   },
        //   component: () => import('@/view/components/tables/tables.vue')
        // },
        // {
        //   path: 'split_pane_page',
        //   name: 'split_pane_page',
        //   meta: {
        //     icon: 'md-pause',
        //     title: '分割窗口'
        //   },
        //   component: () => import('@/view/components/split-pane/split-pane.vue')
        // },
        // {
        //   path: 'markdown_page',
        //   name: 'markdown_page',
        //   meta: {
        //     icon: 'logo-markdown',
        //     title: 'Markdown编辑器'
        //   },
        //   component: () => import('@/view/components/markdown/markdown.vue')
        // },
        // {
        //   path: 'editor_page',
        //   name: 'editor_page',
        //   meta: {
        //     icon: 'ios-create',
        //     title: '富文本编辑器'
        //   },
        //   component: () => import('@/view/components/editor/editor.vue')
        // },
        // {
        //   path: 'icons_page',
        //   name: 'icons_page',
        //   meta: {
        //     icon: '_bear',
        //     title: '自定义图标'
        //   },
        //   component: () => import('@/view/components/icons/icons.vue')
        // }
      ]
    }
  ]
})
