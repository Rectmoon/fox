export default {
  data () {
    return {
      ops: '',
      dialogShow: false
    }
  },
  methods: {
    getLists () {},
    addTask () {
      this.ops = '1'
      this.dialogShow = true
    },
    editTask (id) {
      this.ops = ['2', id].join(',')
      this.dialogShow = true
    },
    handleClose () {
      this.ops = ''
      this.dialogShow = false
    },
    handleSubmit () {
      this.dialogShow = false
      this.getLists()
    }
  }
}
