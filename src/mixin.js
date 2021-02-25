export default {
  methods: {
    // 日付を変換するメソッド
    convertDueDate(dueDate) {
      // 今日とタスクの日付を取得
      const today = new Date();
      const date = new Date(dueDate);
      let todayD = today.getDate();
      let dateD = date.getDate();

      // 今日の日付とタスクの期日を比較して、今日なら今日 明日なら明日に変換 以外は日本語形式に変換
      if (dateD == todayD) {
        return "今日";
      } else if (dateD == todayD + 1) {
        return "明日";
      } else {
        let format = "";
        dateD < todayD ? (format = "期限切れ(MM月DD日)") : "MM月DD日";
        format = format.replace(/MM/, date.getMonth() + 1);
        format = format.replace(/DD/, date.getDate());
        return format;
      }
    },
  },
};
