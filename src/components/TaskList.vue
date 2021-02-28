<template>
  <ul class="task-list" v-if="hasTasks">
    <li class="task-item" v-for="task in tasks" :key="task.id">
      <span class="sort-icon" uk-icon="icon: move;"></span>
      <div class="task-item-inner">
        <label class="checkBox-box">
          <input type="checkbox" @change="doneTask(task)" />
        </label>
        <div @click="openModal(task)" class="task-content">
          <p>
            {{ task.title }}
          </p>
          <!-- 2回同じようなことをしている気がする？？ -->
          <p :class="classObj(task.dueDate)">
            {{ convertDueDate(task.dueDate) }}
          </p>
        </div>
      </div>
    </li>
  </ul>
  <div v-else>
    <p>まだタスクが登録されていません。</p>
  </div>
</template>

<script>
import Mixin from "../mixin";

export default {
  // mixinsは配列で書く
  mixins: [Mixin],

  props: {
    tasks: {
      type: Array,
    },
  },
  data() {
    return {
      modalTask: null,
      isOpenModal: false,
    };
  },
  computed: {
    hasTasks() {
      if (this.tasks.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // タスクを完了とするメソッド
    doneTask(task) {
      this.$store.dispatch("tasksModule/doneTask", task);
    },

    // タスクの完了未完了を見るメソッド

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

    openModal(task) {
      this.isOpenModal = true;
      this.modalTask = task;
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
</style>
