import Notification from './notification'

export default {
  extends: Notification,
  data() {
    return {
      verticalOffset: 0,
      visible: false,
      height: 0,
      autoClose: 3000
    }
  },
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted() {
    this.createTimer()
  },
  beforeDestory() {
    this.clearTimer()
  },
  methods: {
    createTimer() {
      console.log(this.autoClose)
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer() {
      this.timer && clearTimeout(this.timer)
    },
    afterEnter() {
      this.height = this.$el.offsetHeight
    }
  }
}
