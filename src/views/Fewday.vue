<template>
  <div class="few-days">
    <div class="header">
      <div class="header-content">
        <h1>近日予定</h1>
      </div>
      <div class="nav-bar">
        <a href="" @click.prevent="prevWeek">prev</a>
        <a href="" @click.prevent="nextWeek">next</a>
      </div>
      <ul uk-tab>
        <li
          v-for="(day, index) in selectedWeek"
          :key="index"
          :class="{ 'uk-active': day.isToday, disabled: day.isPast }"
        >
          <a href="#" @click="selectDate(day.date)"
            ><span>{{ day.day }} </span> {{ getDateFromYMD(day.date) }}</a
          >
        </li>
      </ul>
    </div>
    <div class="list-editor">
      <task-list :tasks="tasksOfSelectedDate"></task-list>
    </div>
    <create-editor
      :createFormShow="createFormShow"
      :selectedDate="selectedDate"
      @click-toggle="toggleCreateForm"
    ></create-editor>
  </div>
</template>
<script>
import TaskList from '../components/TaskList.vue';
import CreateEditor from '../components/CreateEditor';
import Mixin from '../mixin';
import { formatDate, getDateFromYMD } from '../helper';

const DAY = ['日', '月', '火', '水', '木', '金', '土'];
const WEEK_NUM = 7;
const today = new Date();
const todayDate = formatDate(today);
const thisSunday = formatDate(
  new Date(today.setDate(today.getDate() - today.getDay()))
);

export default {
  name: 'Fewdays',
  mixins: [Mixin],

  components: { TaskList, CreateEditor },
  data() {
    return {
      selectedDate: todayDate,
      displaySunday: ''
    };
  },
  computed: {
    // 選択された日のタスクを取得
    tasksOfSelectedDate() {
      const tasks = this.$store.getters['tasksModule/tasks'];
      const that = this;
      const result = tasks.filter(el => {
        const taskDueDate = new Date(el.data.dueDate.seconds * 1000);
        return formatDate(taskDueDate) == that.selectedDate;
      });
      console.log(result);
      return result;
    },
    selectedWeek() {
      // １週間を作成

      let i = 0;
      // 配列で週を生成
      const selectedWeek = DAY.reduce((acc, el) => {
        const date = new Date(this.displaySunday);
        date.setDate(date.getDate() + i);

        const displayDateObj = {
          date: formatDate(date),
          day: el,
          isToday: false,
          isPast: false
        };

        if (displayDateObj.date == todayDate) {
          displayDateObj.isToday = true;
        } else if (date < new Date(todayDate)) {
          displayDateObj.isPast = true;
        }
        acc.push(displayDateObj);
        i++;
        return acc;
      }, []);
      return selectedWeek;
    }
  },
  methods: {
    selectDate(val) {
      this.selectedDate = val;
    },
    getDateFromYMD,
    prevWeek() {
      const currentDisplaySunday = new Date(this.displaySunday);
      currentDisplaySunday.setDate(currentDisplaySunday.getDate() - WEEK_NUM);
      this.displaySunday = formatDate(new Date(currentDisplaySunday));
    },
    nextWeek() {
      const currentDisplaySunday = new Date(this.displaySunday);
      currentDisplaySunday.setDate(currentDisplaySunday.getDate() + WEEK_NUM);
      this.displaySunday = formatDate(new Date(currentDisplaySunday));
    }
  },
  created() {
    this.selectedDate = todayDate;
    this.displaySunday = thisSunday;
  }
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
.nav-bar {
  text-align: right;
  a {
    margin-right: 20px;
  }
}
</style>
