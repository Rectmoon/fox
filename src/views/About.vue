<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <Notification content="1" btn="2" @close="close"></Notification> -->
    <button @click="notify">click me1</button>

    <p>
      <button @click="getUserInfo">获取用户信息</button>
    </p>

    <p>
      <button @click="cancel">取消</button>
    </p>

    <DatePicker formatter="yyyy-mm-dd" v-model="t"></DatePicker>
  </div>
</template>

<script>
import DatePicker from '@/components/date-picker/date-picker'
import { getMenuData } from '@/api/auth'
import { removePending } from '@/api/instance'
export default {
  data () {
    return {
      t: new Date()
    }
  },
  components: {
    DatePicker
  },
  methods: {
    close () {
      console.log(2)
    },
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close',
        autoClose: false
      })
      this.$bus('a', 222)
    },
    getUserInfo () {
      getMenuData()
    },
    cancel () {
      removePending({
        url: '/userinfo',
        method: 'get'
      })
    }
  }
}
</script>

<style>
</style>
