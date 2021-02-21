<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>{{ projectName }}</h1>
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
      tasks: null,
      projectName: "",
    };
  },
  computed: {
    //
  },
  methods: {
    ...mapActions(["doneTask"]),
  },
  created() {
    // タスクをコピー
    let tasks = this.$store.state.tasks.slice();
    this.tasks = tasks;

    // URLからプロジェクト名を特定する
    let path = location.pathname.split("/");
    let pathProjectId = path[path.length - 1];
    let projects = this.$store.state.projects.slice();

    let result = projects.find((el) => {
      console.log(el);

      return el.name == pathProjectId;
    });
    // this.projectName = result.
    console.log(result);
  },
};
</script>

<style lang="scss" scoped>
</style>
