<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>今日</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list :tasks="todayTasks"></task-list>
      <pre>{{ tasks }}</pre>
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
const today = new Date();
export default {
  components: { TaskList },
  name: "Today",
  data() {
    return {
      tasks: this.$store.getters["tasksModule/tasks"],
    };
  },
  computed: {
    todayTasks() {
      // 今日のタスクのみにする
      return this.tasks.filter((el) => {
        // gettersから取得したタイムスタンプ型の期日
        const date = new Date(el.data.dueDate.seconds * 1000);
        // addTaskで一時的にstateに保存されているString型の期日
        const stateDueDate = new Date(el.data.dueDate);

        return (
          date.getDate() == today.getDate() ||
          stateDueDate.getDate() == today.getDate()
        );
      });
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
