<template>
  <div class="few-days">
    <div class="header">
      <div class="header-content">
        <h1>近日予定</h1>
      </div>

      <ul uk-tab>
        <li
          v-for="day in selectedWeek"
          :key="day.date"
          :class="{ 'uk-active': day.isToday, disabled: day.isPast }"
        >
          <a href="#" @click="selectDate(day.date)"
            ><span>{{ day.day }} </span> {{ day.date }}</a
          >
        </li>
      </ul>
    </div>
    <div class="list-editor">
      <task-list :tasks="tasksOfSelectedDay"></task-list>
    </div>
    <create-editor
      :createFormShow="createFormShow"
      :selectedDay="selectedDay"
      @click-toggle="toggleCreateForm"
    ></create-editor>
  </div>
</template>
<script>
import TaskList from "../components/TaskList.vue";
import CreateEditor from "../components/CreateEditor";
import Mixin from "../mixin";
const DAY = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
const todayDate = today.getDate();

export default {
  name: "Fewdays",
  mixins: [Mixin],
  components: { TaskList, CreateEditor },
  data() {
    return {
      selectedDay: null,
      selectedWeek: null,
    };
  },
  computed: {
    // 選択された日のタスクを取得
    tasksOfSelectedDay() {
      let tasks = this.$store.getters["tasksModule/tasks"];
      const that = this;

      let result = tasks.filter((el) => {
        let taskDueDate = new Date(el.data.dueDate.seconds * 1000);
        let stateDueDate = new Date(el.data.dueDate);

        return (
          taskDueDate.getDate() == that.selectedDay ||
          stateDueDate.getDate() == that.selectedDay
        );
      });
      return result;
    },
  },
  methods: {
    selectDate(val) {
      this.selectedDay = val;
    },
  },
  created() {
    this.selectedDay = today.getDate();

    // 現在の１週間を作成
    let dayNum = today.getDay();
    let i = 0;
    this.selectedWeek = DAY.reduce((acc, el) => {
      let date = new Date();
      date.setDate(date.getDate() - dayNum + i);
      let d = {
        date: date.getDate(),
        day: el,
        isToday: false,
        isPast: false,
      };
      if (d.date == todayDate) {
        d.isToday = true;
      } else if (date < today) {
        d.isPast = true;
      }
      acc.push(d);
      i++;
      return acc;
    }, []);
  },
};
</script>

<style lang="scss" scoped>
#container .header .header-content {
  border-bottom: none;
}

.few-days {
  //
}
.list-editor {
  margin-top: 5%;
}
.buttons {
  text-align: right;
  a {
    display: inline-block;
    margin-right: 10px;
    font-size: 1.3em;
  }
}
.uk-tab {
  width: 100%;
  margin-left: 0;

  li {
    box-sizing: border-box;
    width: calc(100% / 7);
    font-weight: 600;
    padding-left: 0;

    a {
      color: black;
    }
  }
  .uk-active > a {
    border-color: #db4c3f;
    color: #db4c3f;
  }
  .disabled {
    a {
      color: #999;
    }
  }
}
</style>
