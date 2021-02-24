<template>
  <div class="few-days">
    <div class="header">
      <div class="header-content">
        <h1>近日予定</h1>
      </div>
      <div class="buttons">
        <a
          href=""
          class="back-btn"
          uk-icon="icon: chevron-left; ratio:1.5;"
        ></a>
        <a
          href=""
          class="next-btn"
          uk-icon="icon: chevron-right; ratio:1.5;"
        ></a>
        <a class="today-btn">今日</a>
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
      <!-- <pre>{{ selectedWeek }}</pre> -->
    </div>
    <div class="list-editor">
      <task-list :tasks="tasksOfSelectedDay" @done-task="doneTask"></task-list>
    </div>
  </div>
</template>
<script>
import TaskList from "../components/TaskList.vue";
import { mapActions } from "vuex";
const DAY = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
const todayDate = today.getDate();
const dayNum = today.getDay();
const thisSunday = todayDate - dayNum;

export default {
  components: { TaskList },
  name: "Fewdays",
  data() {
    return {
      tasks: [],
      selectedDay: null,
      selectedWeek: null,
    };
  },
  computed: {
    // 選択された日のタスクを取得
    tasksOfSelectedDay() {
      let tasks = [];
      tasks = this.tasks;
      const that = this;
      let result = [];
      result = tasks.filter((el) => {
        let taskDueDate = new Date(el.fields.dueDate.timestampValue);
        taskDueDate = taskDueDate.getDate();
        return taskDueDate == that.selectedDay;
      });
      return result;
    },
  },
  methods: {
    ...mapActions(["doneTask"]),
    selectDate(val) {
      this.selectedDay = val;
    },
  },
  created() {
    const today = new Date();
    let tasks = this.$store.state.tasks.slice();
    this.tasks = tasks;
    this.selectedDay = today.getDate();

    let i = 0;
    this.selectedWeek = DAY.reduce((acc, el) => {
      let d = {
        date: thisSunday + i,
        day: el,
        isToday: false,
        isPast: false,
      };
      if (d.date == todayDate) {
        d.isToday = true;
      } else if (d.date < todayDate) {
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
