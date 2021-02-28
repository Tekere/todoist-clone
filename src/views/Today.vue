<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>今日</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list :tasks="tasks"></task-list>
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
// import { mapActions } from "vuex";

export default {
  components: { TaskList },
  name: "Today",
  data() {
    return {
      tasks: null,
    };
  },
  computed: {
    //
  },
  methods: {
    // ...mapActions(["tasksModule/doneTask"]),
  },
  created() {
    let tasks = this.$store.getters["tasksModule/tasks"];
    // 今日のタスクのみにする
    const today = new Date();
    tasks = tasks.filter((el) => {
      const date = new Date(el.dueDate.seconds * 1000);

      return date.getDate() == today.getDate();
    });
    this.tasks = tasks;
  },
};
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
