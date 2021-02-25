<template>
  <transition name="bgOpacity">
    <div v-if="isShow" class="modal-bg" @click.self="bgClick()">
      <div class="modal" v-if="isShow">
        <div class="modal-dialog">
          <h2 class="modal-title">{{ task.fields.title.stringValue }}</h2>
          <p>{{ task.fields.dueDate.timestampValue }}</p>
        </div>
      </div>
    </div>
  </transition>
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
  z-index: 2;
}
.modal {
  width: 50vw;
  height: 25vh;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px 24px;
  z-index: 4;
  position: absolute;
  top: 20%;
  left: 25vw;
  .modal-title {
    padding: 10px;
  }
}
// opacity
.bgOpacity-enter {
  opacity: 0;
}
.bgOpacity-enter-to {
  opacity: 1;
}
.bgOpacity-leave {
}
.bgOpacity-leave-to {
}
.bgOpacity-enter-active,
.bgOpacity-enter-active {
  transition: all 0.3s;
}
</style>
