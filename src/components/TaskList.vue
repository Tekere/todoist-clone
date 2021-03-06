<template>
  <transition-group tag="ul" class="task-list" v-if="hasTasks">
    <li class="task-item" v-for="task in tasks" :key="task.id">
      <span class="sort-icon" uk-icon="icon: move;"></span>
      <div class="task-item-inner">
        <label class="checkBox-box">
          <input type="checkbox" @change="doneTask(task)" />
        </label>
        <div class="task-content">
          <p>
            {{ task.data.title }}
          </p>
          <!-- 2回同じようなことをしている気がする？？ -->
          <p :class="classObj(task.data.dueDate)">
            {{ convertDueDate(task.data.dueDate) }}
          </p>
        </div>
      </div>
    </li>
  </transition-group>
  <div v-else>
    <p>タスクが登録されていません。</p>
  </div>
</template>

<script>
import { addClassDateColor } from "../helper";
export default {
  props: {
    tasks: {
      type: Array,
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
        return addClassDateColor(dueDate);
      };
    },
  },
  methods: {
    // タスクを完了とするメソッド
    doneTask(task) {
      this.$store.dispatch("tasksModule/doneTask", task);
    },

    // 日付を変換するメソッド
    convertDueDate(dueDate) {
      // 今日とタスクの日付を取得
      // 今日
      let today = new Date();
      let todayD = today.getDate();
      // タスクの期日
      let date = new Date(dueDate.seconds * 1000);
      let dateD = date.getDate();
      // 明日
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tomorrowD = tomorrow.getDate();

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
</script>

<style lang="scss" scoped>
.task-list {
  padding-left: 0;
}
.task-item {
  list-style: none;
  position: relative;
  display: block;

  .sort-icon {
    display: none;
    position: absolute;
    left: 0.5em;
    top: 50%;
    transform: translateY(-50%);
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
      transform: scale(1.8);
      cursor: pointer;
    }
  }

  .task-content {
    padding-left: 10px;
    width: 100%;
    p {
      margin: 0;
      line-height: 2.6;

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
  }
}
.v-move {
  transition: transform 1s;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
  // position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
</style>
