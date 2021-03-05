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
    <create-editor
      :createFormShow="createFormShow"
      @click-toggle="toggleCreateForm"
    ></create-editor>
    <pre>{{ tasks }}</pre>
    <!-- <pre>{{ $store.getters["tasksModule/tasks"] }}</pre> -->
    <pre>{{ $store.state.tasksModule }}</pre>
  </div>
</template>

<script>
import TaskList from "../components/TaskList";
import CreateEditor from "../components/CreateEditor";
import Mixin from "../mixin";
let today = new Date();

export default {
  name: "Inbox",
  mixins: [Mixin],
  components: { TaskList, CreateEditor },

  computed: {
    tasks() {
      return this.$store.getters["tasksModule/tasks"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
