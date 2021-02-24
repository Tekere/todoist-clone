<template>
  <div v-show="isShow && task" class="modal-bg" @click="bgClick()">
    <div id="modal">
      <div class="modal-dialog uk-modal-body">
        <h2 class="modal-title">{{ task.fields.title.stringValue }}</h2>
        <p>{{ task.fields.dueDate.timestampValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
    },
    task: {
      type: Object,
      default: () => {
        return {
          fields: "",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    bgClick() {
      this.$emit("bg-click");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2147483647;
}
</style>
