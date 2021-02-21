<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>インボックス</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list
        :tasks="tasks"
        :isShowProjectName="false"
        @done-task="doneTask"
      ></task-list>
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import { mapActions } from "vuex";
export default {
  components: { TaskList },
  name: "Inbox",
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    //
  },
  methods: {
    ...mapActions(["doneTask"]),
  },
  created() {
    // プロジェクトIDがインボックスのIDと一致するもののみにする
    let tasks = this.$store.state.tasks.slice();
    let result = tasks.filter((el) => {
      return el.fields.projectId.stringValue == "RHlmhCvIUREZGEUAhGbd";
    });

    this.tasks = result;
    // console.log(tasks);
  },
};
</script>

<style lang="scss" scoped>
</style>
