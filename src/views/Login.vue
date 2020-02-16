<template>
  <div class="page">
    <button @click="handleLogin">登录</button>
    <button @click="handleToggle">{{platform ? '系统' : '第三方'}}登录</button>
    <transition v-bind="animatedCls">
      <div class="box box1 animated" v-if="!platform" key="1">系统</div>
      <div class="box box2 animated" v-else key="2">第三方</div>
    </transition>
  </div>
</template>

<script>
import s from '@/utils/storage'
export default {
  data () {
    return {
      platform: 1
    }
  },
  computed: {
    animatedCls () {
      return {
        'enter-active-class': this.platform ? 'zoomInRight' : 'zoomInLeft',
        'leave-active-class': this.platform ? 'zoomOutLeft' : 'zoomOutRight'
      }
    }
  },
  methods: {
    handleLogin () {
      s.session.set('username', 'lzx')
      this.$router.push('/home')
    },
    handleToggle () {
      this.platform = !this.platform - 0
    }
  }
}
</script>

<style lang='stylus'>
body
  overflow hidden

.box
  position absolute
  width 400px
  height 400px
  left 0
  top 0
  right 0
  bottom 0
  margin auto

  &.box1
    background orange

  &.box2
    background red
</style>
