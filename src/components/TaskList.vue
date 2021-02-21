<template>
  <ul class="task-list" v-if="hasTasks">
    <li class="task-item" v-for="task in tasks" :key="task.name">
      <div class="task-item-inner">
        <label class="checkBox-box">
          <input
            type="checkbox"
            @change="doneTask(task.name)"
            :checked="isDone(task)"
          />
        </label>
        <div class="task-content" uk-toggle="target: #modal-close-default">
          <p :class="{ 'is-done': task.fields.status.integerValue == 1 }">
            {{ task.fields.title.stringValue }}
          </p>
          <!-- 2回同じようなことをしている気がする？？ -->
          <p :class="classObj(task.fields.dueDate.timestampValue)">
            {{ convertDueDate(task.fields.dueDate.timestampValue) }}
            <!-- <span v-if="isShowProjectName" class="projectName"
              >・{{
                //$store.state.projectNames[task.fields.projectId.integerValue]
              }}</span
            > -->
          </p>
        </div>
      </div>
      <task-modal></task-modal>
    </li>
  </ul>
  <div v-else>
    <p>まだタスクが登録されていません。</p>
  </div>
</template>

<script>
import TaskModal from "./TaskModal";
import { mapActions } from "vuex";
export default {
  components: {
    TaskModal,
  },
  props: {
    tasks: {
      // type: Array,
    },
    // タスクの横にプロジェクトの名前を出すかどうか。インボックスなどではfalseが渡ってくる
    isShowProjectName: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    hasTasks() {
      if (this.tasks.length > 0) {
        return true;
      }
      return false;
    },
    // 期日の状態（本日、明日etc）によって表示の色を変更するためのプロパティ
    classObj() {
      return function (dueDate) {
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
    // タスクを完了とするメソッド
    ...mapActions(["doneTask"]),

    // タスクの完了未完了を見るメソッド
    isDone(task) {
      // 完了ステータスをトグルする
      switch (task.fields.status.integerValue) {
        case "0":
          return false;

        case "1":
          return true;
      }
    },
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
    // 日付から特定の条件で色分けするためのメソッド
    addClassDateColor(dueDate) {
      if (dueDate == "今日") {
        this.classObj.today = true;
      } else if (dueDate == "明日") {
        this.classObj.tomorrow = true;
      } else if (dueDate.match(/期限切れ/)) {
        this.classObj.expired = true;
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  padding-left: 0;
}
.task-item {
  list-style: none;
  cursor: pointer;
  &:hover {
  }
}
.task-item-inner {
  display: flex;
  position: relative;
  border-bottom: 1px solid #f0f0f0;

  .checkBox-box {
    width: 2rem;
    position: relative;
    cursor: pointer;
    input {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .task-content {
    width: 100%;
    p {
      margin: 0;
      line-height: 2.6;
      &.is-done {
        text-decoration: line-through;
      }
      &.date {
        line-height: 1;
        padding-bottom: 0.5rem;
      }
      &.today {
        color: #058527;
      }
      &.tomorrow {
        color: #eb8909;
      }
      &.expired {
        color: #d1453b;
      }
    }
    .projectName {
      float: right;
      color: #666;
    }
  }
}
</style>
