<template>
  <div class="create-editor">
    <div v-if="createFormShow" class="create-form-editor">
      <div class="create-form-inner">
        <form action="">
          <input
            type="text"
            class="uk-input uk-form-width-medium"
            placeholder="タスク名"
            v-model="formData.title"
          />
          <input
            type="date"
            class="uk-input uk-form-width-medium"
            v-model="formData.dueDate"
          />

          <div class="btns">
            <button
              @click.prevent="addTask(newTask)"
              class="uk-button uk-button-primary uk-button-small"
            >
              タスクを作成
            </button>
            <button
              @click.prevent="clickToggle"
              class="uk-button uk-button-default uk-button-small"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else @click="clickToggle" class="create-editor-inner">
      <span uk-icon="plus" class="plus-icon"></span>
      <span class="create-txt">タスクを追加</span>
    </div>
  </div>
</template>

<script>
// 今日をyyyy-mm-ddを作成
let defaultDueDate = new Date();
let y = defaultDueDate.getFullYear();
let m = ("00" + (defaultDueDate.getMonth() + 1)).slice(-2);
let d = ("00" + defaultDueDate.getDate()).slice(-2);
defaultDueDate = `${y}-${m}-${d}`;

export default {
  props: {
    createFormShow: {
      type: Boolean,
    },
    selectedDay: {
      type: Number,
    },
  },
  data() {
    return {
      formData: {
        title: "",
        dueDate: defaultDueDate,
      },
    };
  },
  computed: {
    newTask() {
      // フォームのデータからtimestampを作成  2ヶ月くらいずれる？？
      // let date = new Date(this.formData.dueDate);
      //     date = date.getTime();
      //     date = Math.floor(date / 1000);

      // 一時的に Date型で保存
      return {
        title: this.formData.title,
        dueDate: new Date(this.formData.dueDate),
      };
    },
  },
  watch: {
    // 選択されているタブの日付を監視して タスク作成時のデフォルトの期日を作成する
    selectedDay: {
      handler(val) {
        this.formData.dueDate = "2021-03-" + ("00" + val).slice(-2);
      },
    },
  },
  methods: {
    addTask(newTask) {
      this.$store.dispatch("tasksModule/addTask", newTask);

      this.resetFormData();
      this.clickToggle();
    },
    clickToggle() {
      this.$emit("click-toggle");
    },
    // タスク追加後にフォームのデータをリセット
    resetFormData() {
      this.formData = { title: "", dueDate: `${y}-${m}-${d}` };
    },
  },
};
</script>

<style lang="scss" scoped>
.create-form-inner {
  padding: 0 55px 0;
}
.create-editor-inner {
  padding: 0 55px 0;
  cursor: pointer;
  .plus-icon {
    border-radius: 50%;
    padding: 3px;
    margin-left: -3px;
    color: #dd4b39;
    transition: all 0.2s;
    svg {
      height: 24px;
    }
  }
  .create-txt {
    transition: all 0.2s;
    display: inline-block;
    color: grey;
    line-height: 24px;
    padding-left: 1rem;
  }
  &:hover {
    .plus-icon {
      border-radius: 50%;

      background-color: #dd4b39;
      color: #fff !important;
    }
    .create-txt {
      color: #dd4b39;
    }
  }
}
.create-form-inner {
  input,
  select {
    display: block;
    margin-bottom: 0.5em;
  }
  button {
    margin-right: 1em;
  }
}
</style>
