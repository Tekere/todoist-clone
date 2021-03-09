// Inbox Today Fewdays で共通する部分をまとめる
export default {
  data() {
    return {
      createFormShow: false
    };
  },
  methods: {
    // タスク作成エディタのオープン・クローズ
    toggleCreateForm() {
      this.createFormShow = !this.createFormShow;
    },
    // タスク完了メソッド
    doneTask(task) {
      this.$store.dispatch('tasksModule/doneTask', task);
    }
  }
};
