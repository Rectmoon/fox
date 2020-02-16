<template>
  <div v-click-out-side="handleClickOutSide" @click="focus" class="container">
    <input type="text" :value="formatedDate" />
    <div class="pannel" v-if="isVisible">
      <div class="pannel-nav">
        <span @click="preYear">&lt;</span>
        <span @click="preMonth">&lt;&lt;</span>
        <span>{{ time[0] }}年</span>
        <span>{{ time[1] * 1 + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="days">
          <span v-for="k in 7" :key="k + 'x'" class="cell">{{
            weekDays[k - 1]
          }}</span>
          <div v-for="i in 6" :key="i">
            <span
              v-for="j in 7"
              :key="j"
              class="cell cell-day"
              :class="[
                {
                  'not-current-month': !isCurrentMonth(
                    visibleDays[(i - 1) * 7 + (j - 1)]
                  ),
                  today: isToday(visibleDays[(i - 1) * 7 + (j - 1)]),
                  selected: isSelect(visibleDays[(i - 1) * 7 + (j - 1)])
                }
              ]"
              @click="chooseDay(visibleDays[(i - 1) * 7 + (j - 1)])"
              >{{ visibleDays[(i - 1) * 7 + j - 1].getDate() }}</span
            >
          </div>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>

<script>
import clickOutSide from '@/directives/clickOutSide'
import { getYmd, getDate, formatDate } from '@/utils/date'

export default {
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    formatter: {
      type: String,
      default: 'yyyy-mm-dd hh:ii:ss'
    }
  },
  data () {
    const a = getYmd(this.value)
    return {
      time: a,
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      isVisible: true
    }
  },
  computed: {
    visibleDays () {
      const [y, m] = getYmd(new Date(this.time[0], this.time[1]))
      const currentFirstDay = getDate(y, m, 1)
      const week = currentFirstDay.getDay()
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
      const arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
    formatedDate () {
      return formatDate(this.value, this.formatter)
    }
  },
  directives: {
    clickOutSide
  },
  methods: {
    handleClickOutSide () {
      if (this.isVisible) this.isVisible = false
    },
    focus () {
      this.isVisible = true
    },
    blur () {
      this.isVisible = false
    },
    isCurrentMonth (date) {
      const [y, m] = getYmd(new Date(this.time[0], this.time[1]))
      const [y1, m1] = getYmd(date)
      return y === y1 && m === m1
    },
    isToday (date) {
      const [y, m, d] = getYmd(new Date())
      const [y1, m1, d1] = getYmd(date)
      return y === y1 && m === m1 && d === d1
    },
    isSelect (date) {
      const [y, m, d] = getYmd(this.value)
      const [y1, m1, d1] = getYmd(date)
      return y === y1 && m === m1 && d === d1
    },
    chooseDay (date) {
      this.time = getYmd(date)
      this.$emit('input', date)
      this.blur()
    },

    preMonth () {
      const [y, m] = this.time
      const d = getDate(y, m)
      d.setMonth(d.getMonth() - 1)
      this.time = getYmd(d)
    },
    nextMonth () {
      const [y, m] = this.time
      const d = getDate(y, m)
      d.setMonth(d.getMonth() + 1)
      this.time = getYmd(d)
    },
    preYear () {
      const [y, m] = this.time
      const d = getDate(y, m)
      d.setYear(d.getFullYear() - 1)
      this.time = getYmd(d)
    },
    nextYear () {
      const [y, m] = this.time
      const d = getDate(y, m)
      d.setYear(d.getFullYear() + 1)
      this.time = getYmd(d)
    }
  }
}
</script>

<style lang='stylus'>
.container
  position relative

  .pannel
    position absolute
    left 0
    box-shadow 0 0 4px rgba(0, 0, 0, 0.4)

    .pannel-nav
      display flex
      justify-content space-around
      height 30px

      span
        cursor pointer
        user-select none

    .pannel-content
      .cell
        display inline-flex
        justify-content center
        align-items center
        width 32px
        height 32px
        font-weight bold

        &.cell-day:hover, &.selected
          border 1px solid #ddd

        &.not-current-month
          color #ccc

        &.today
          background orange
          border-radius 50%
          color #fff

    .pannel-footer
      height 30px
      text-align center
</style>
