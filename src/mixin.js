export default {
  computed: {
    // 期日の状態（本日、明日etc）によって表示の色を変更するためのプロパティ
    classObj() {
      return function(dueDate) {
        // 期日を本日、明日、期限切れに変換
        dueDate = this.convertDueDate(dueDate);

        let resultObj = {
          today: false,
          tomorrow: false,
          expired: false,
        };
        // 変換後の状態に応じて有効にするClassをtrueにする
        if (dueDate == "今日") {
          resultObj.today = true;
        } else if (dueDate == "明日") {
          resultObj.tomorrow = true;
        } else if (dueDate.match(/期限切れ/)) {
          resultObj.expired = true;
        }
        return resultObj;
      };
    },
  },
  methods: {
    // 日付を変換するメソッド
    convertDueDate(dueDate) {
      // 今日とタスクの日付を取得
      const today = new Date();
      const todayD = today.getDate();
      let date = null;
      let dateD = null;
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tomorrowD = tomorrow.getDate();

      // stateから取得した場合のために型変換を2種類用意する
      if (dueDate.seconds) {
        date = new Date(dueDate.seconds * 1000);
        dateD = date.getDate();
      } else {
        date = new Date(dueDate);
        dateD = date.getDate();
      }

      // 今日の日付とタスクの期日を比較して、今日なら今日 明日なら明日に変換 以外は日本形式に変換
      if (dateD == todayD) {
        return "今日";
      } else if (dateD == tomorrowD) {
        return "明日";
      } else {
        let format = "";
        date < today ? (format = "期限切れ(MM月DD日)") : (format = "MM月DD日");
        format = format.replace(/MM/, date.getMonth() + 1);
        format = format.replace(/DD/, dateD);
        return format;
      }
    },
  },
};
