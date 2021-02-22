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
      projectName: null,
    };
  },
  computed: {
    //
  },
  methods: {
    ...mapActions(["doneTask"]),
  },
  created() {
    // URLからプロジェクト名を特定する
    let path = location.pathname.split("/");
    let pathProjectId = path[path.length - 1];
    let projects = this.$store.state.projectsArray;
    let result = projects.find((el) => {
      return el.id == pathProjectId;
    });
    this.projectName = result.title;

    // プロジェクトのタスクをコピー
    let tasks = this.$store.state.tasks.slice();
    tasks = tasks.filter((el) => {
      return el.fields.projectId.stringValue == pathProjectId;
    });
    this.tasks = tasks;
  },
};
</script>

<style lang="scss" scoped>
</style>
