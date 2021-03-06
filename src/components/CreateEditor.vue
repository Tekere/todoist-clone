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
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}

let today = new Date();
let defaultDueDate = formatDate(today);

export default {
  props: {
    createFormShow: {
      type: Boolean,
    },
    selectedDate: {
      type: String,
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
    // 登録する形でdataを作成
    newTask() {
      return {
        title: this.formData.title,
        dueDate: {
          seconds: new Date(this.formData.dueDate).getTime() / 1000,
        },
      };
    },
  },
  watch: {
    // 選択されているタブの日付を監視して タスク作成時のデフォルトの期日を作成する
    selectedDate: {
      handler(val) {
        this.formData.dueDate = val;
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
      this.formData = { title: "", dueDate: formatDate(today) };
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
