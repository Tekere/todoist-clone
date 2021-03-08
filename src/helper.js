// YMDに変換
export const formatDate = function(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth() + 1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return y + '-' + m + '-' + d;
};
// YMDから日付を取得
export const getDateFromYMD = function(ymd) {
  const result = new Date(ymd);
  return result.getDate();
};

//   // 日付から特定の条件で色分けするためのメソッド
export const addClassDateColor = function(dueDate) {
  const resultObj = {
    today: false,
    tomorrow: false,
    expired: false
  };
  if (dueDate == '今日') {
    resultObj.today = true;
  } else if (dueDate == '明日') {
    resultObj.tomorrow = true;
  } else if (dueDate.match(/期限切れ/)) {
    resultObj.expired = true;
  }
  return resultObj;
};
