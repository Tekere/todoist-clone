<template>
  <div class="home">
    <div class="header">
      <div class="header-content">
        <h1>今日</h1>
      </div>
    </div>
    <div class="list-editor">
      <task-list :tasks="todayTasks"></task-list>
    </div>
    <create-editor
      :createFormShow="createFormShow"
      @click-toggle="toggleCreateForm"
    ></create-editor>
  </div>
</template>

<script>
import TaskList from '../components/TaskList';
import CreateEditor from '../components/CreateEditor';
import Mixin from '../mixin';
const today = new Date();
export default {
  name: 'Today',
  mixins: [Mixin],
  components: { TaskList, CreateEditor },

  computed: {
    todayTasks() {
      const tasks = this.$store.getters['tasksModule/tasks'];
      // 今日のタスクのみにする
      return tasks.filter(el => {
        // gettersから取得したタイムスタンプ型の期日
        const taskDueDate = new Date(el.data.dueDate.seconds * 1000);
        // addTaskで一時的にstateに保存されているString型の期日
        const stateDueDate = new Date(el.data.dueDate);

        return (
          taskDueDate.getDate() == today.getDate() ||
          stateDueDate.getDate() == today.getDate()
        );
      });
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
