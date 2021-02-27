<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>インボックス</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list :tasks="tasks"></task-list>
    </div>
    <div class="create-editor">
      <div v-if="createFormShow" class="create-form-editor">
        <div class="create-form-inner">
          <form action="">
            <input
              type="text"
              class="uk-input uk-form-width-medium"
              placeholder="タスク名"
            />
            <input type="date" class="uk-input uk-form-width-medium" />
            <select class="uk-select uk-form-width-medium">
              <option value="">プロジェクト名</option>
              <option>Option 01</option>
            </select>
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
      tasks: [],
      createFormShow: false,
    };
  },
  computed: {
    newTask() {
      return {
        title: "ttt",
        dueDate: "2021-02-28T00:05:19.533413Z",
        status: "0",
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
  },

  created() {
    this.$store.dispatch("tasksModule/setTasks");
    this.tasks = this.$store.getters["tasksModule/tasks"];
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
