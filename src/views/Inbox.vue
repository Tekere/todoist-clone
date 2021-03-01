<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>インボックス</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list :tasks="tasks" @done-check="doneTask"></task-list>
      <pre>{{ tasks }}</pre>
      <pre>{{ $store.getters["tasksModule/tasks"] }}</pre>
      <pre>{{ $store.state.tasksModule.tasks }}</pre>
    </div>
    <div class="create-editor">
      <div v-if="createFormShow" class="create-form-editor">
        <div class="create-form-inner">
          <form action="">
            <input
              type="text"
              class="uk-input uk-form-width-medium"
              placeholder="タスク名"
              v-model="formData.title"
            />
            <input
              type="date"
              class="uk-input uk-form-width-medium"
              v-model="formData.dueDate"
            />

            <div class="btns">
              <button
                @click.prevent="addTask(newTask)"
                class="uk-button uk-button-primary uk-button-small"
              >
                タスクを作成
              </button>
              <button
                @click.prevent="toggleCreateForm"
                class="uk-button uk-button-default uk-button-small"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-else @click="toggleCreateForm" class="create-editor-inner">
        <span uk-icon="plus" class="plus-icon"></span>
        <span class="create-txt">タスクを追加</span>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";

export default {
  components: { TaskList },
  name: "Inbox",
  data() {
    return {
      tasks: this.$store.getters["tasksModule/tasks"],
      createFormShow: false,
      formData: {
        title: "",
        dueDate: "",
      },
    };
  },
  computed: {
    newTask() {
      // フォームのデータからtimestampを作成  2ヶ月くらいずれる？？
      // let date = new Date(this.formData.dueDate);
      //     date = date.getTime();
      //     date = Math.floor(date / 1000);

      // 一時的に Date型で保存
      return {
        title: this.formData.title,
        dueDate: new Date(this.formData.dueDate),
      };
    },
  },
  methods: {
    toggleCreateForm() {
      this.createFormShow = !this.createFormShow;
    },
    addTask(newTask) {
      this.$store.dispatch("tasksModule/addTask", newTask);
    },
    doneTask(task) {
      this.$store.dispatch("tasksModule/doneTask", task);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-form-inner {
  padding: 0 55px 0;
}
.create-editor-inner {
  padding: 0 55px 0;
  cursor: pointer;
  .plus-icon {
    border-radius: 50%;
    padding: 3px;
    margin-left: -3px;
    color: #dd4b39;
    transition: all 0.2s;
    svg {
      height: 24px;
    }
  }
  .create-txt {
    transition: all 0.2s;
    display: inline-block;
    color: grey;
    line-height: 24px;
    padding-left: 1rem;
  }
  &:hover {
    .plus-icon {
      border-radius: 50%;

      background-color: #dd4b39;
      color: #fff !important;
    }
    .create-txt {
      color: #dd4b39;
    }
  }
}
.create-form-inner {
  input,
  select {
    display: block;
    margin-bottom: 0.5em;
  }
  button {
    margin-right: 1em;
  }
}
</style>
