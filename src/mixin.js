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
    // // 今日の日付をyyyy-mm-ddの形式で作成
    // createYMD(date) {
    //   let y = date.getFullYear();
    //   let m = ("00" + (date.getMonth() + 1)).slice(-2);
    //   let d = ("00" + date.getDate()).slice(-2);
    //   return `${y}-${m}-${d}`;
    // },
  }
};
