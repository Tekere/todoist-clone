<template>
  <div class="few-days">
    <div class="header">
      <div class="header-content">
        <h1>近日予定</h1>
      </div>
      <div class="buttons">
        <a href="" class="left-icon" uk-icon="icon: chevron-left;"></a>
        <a href="" class="right-icon" uk-icon="icon: chevron-right;"></a>
        <a href="">今日</a>
      </div>
      <ul uk-tab>
        <li
          v-for="day in thisWeek"
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

// 今週を作成
let i = 0;
const thisWeek = DAY.reduce((acc, el) => {
  let d = { date: thisSunday + i, day: el, isToday: false, isPast: false };
  if (d.date == todayDate) {
    d.isToday = true;
  } else if (d.date < todayDate) {
    d.isPast = true;
  }
  acc.push(d);
  i++;
  return acc;
}, []);

export default {
  components: { TaskList },
  name: "Fewdays",
  data() {
    return {
      tasks: [],
      selectedDay: null,
      thisWeek,
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
  },
};
</script>

<style lang="scss" scoped>
#container .header .header-content {
  border-bottom: none;
}
.left-icon,
.right-icon {
  // position: absolute;
  // top: 70px;
  // height: 15px;
}
.left-icon {
  // left: 15px;
}
.right-icon {
  // right: 15px;
}

.few-days {
  //
}
.list-editor {
  margin-top: 5%;
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
