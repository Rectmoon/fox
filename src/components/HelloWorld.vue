<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Hello</h3>

    <div v-clickoutside="handleClick">okokok</div>

    <div
      id='container'
      v-scrollunique='true'
    >
      <div class='text'></div>
      <div class='text'></div>
      <div class='text'></div>
      <div class='text'></div>
      <div class='text'></div>
    </div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import Clickoutside from '@/directives/clickOutSide'
import Scrollunique from '@/directives/scrollUnique'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  directives: {
    Clickoutside,
    Scrollunique
  },
  methods: {
    handleClick () {
      console.log(123)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

#container
  width 200px
  background orange
  height 400px
  overflow-y auto

  .text
    height 200px
</style>
