<template>
  <div class="page">
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
import s from '@/utils/storage'
export default {
  methods: {
    handleLogin() {
      s.session.set('username', 'lzx')
      this.$router.push('/403')
    }
  }
}
</script>

<style>
</style>
