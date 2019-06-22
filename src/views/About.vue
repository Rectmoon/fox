<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <Notification content="1" btn="2" @close="close"></Notification> -->
    <button @click="notify">click me1</button>

    <DatePicker formatter="yyyy-mm-dd" v-model='t'></DatePicker>
  </div>
</template>
 
<script>
import DatePicker from '@/components/date-picker/date-picker'
export default {
  data() {
    return {
      t: new Date()
    }
  },
  components: {
    DatePicker
  },
  methods: {
    close() {
      console.log(2)
    },
    notify() {
      this.$notify({
        content: 'test $notify',
        btn: 'close',
        autoClose: false
      })
    }
  }
}
</script>


<style>
</style> 