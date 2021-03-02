<template>
  <div>
    <nav class="uk-navbar-container uk-margin" uk-navbar id="nav">
      <div class="uk-navbar-left">
        <div>
          <a
            class="uk-navbar-toggle"
            uk-navbar-toggle-icon
            href=""
            @click.prevent="toggleNav"
          ></a>
        </div>

        <ul class="uk-navbar-nav">
          <li>
            <a href="/">
              <span
                class="uk-icon uk-margin-small-right"
                uk-icon="icon: home"
              ></span>
            </a>
          </li>
        </ul>

        <div class="uk-navbar-item">
          <input
            class="uk-input uk-form-width-medium"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </nav>
    <div>
      <transition tag="div" name="slideX">
        <div class="uk-width-1-4@s side-nav" v-show="isNavShow">
          <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li class="uk-active">
              <router-link to="/">インボックス</router-link>
            </li>
            <li class="uk-active">
              <router-link to="/today">今日</router-link>
            </li>
            <li class="uk-active">
              <router-link to="/fewday">近日中</router-link>
            </li>

            <li class="uk-nav-divider"></li>
          </ul>
        </div>
      </transition>

      <router-view id="container" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavShow: true,
    };
  },
  methods: {
    toggleNav() {
      this.isNavShow = !this.isNavShow;
    },
  },
  created() {
    this.$store.dispatch("tasksModule/fetchTasks");
  },
};
</script>

<style lang="scss">
a {
  cursor: pointer;
}
body {
  padding-bottom: 100px;
}
#app {
  font-family: "Hiragino Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

#nav {
  padding: 0 40px;
  width: 100vw;
  position: fixed;
  top: 0;
  color: #fff;
  background-color: #db4c3f;
  z-index: 2;
  .uk-icon {
    fill: #fff;
    &:hover {
      opacity: 0.7;
    }
  }
  .uk-input {
    border-radius: 5px;
  }
}
.side-nav {
  width: 305px !important;
  height: 100vh;
  position: fixed;
  top: 80px;
  padding-left: 30px;
  padding-top: 30px;
  background-color: #fafafa;
  ul {
    height: 100%;
    li {
      font-size: 16px;
      line-height: 1.7;
      font-weight: bold;
      padding-left: 10px;
      margin: 3px 5px 3px 0;
      &:nth-child(-n + 3):hover {
        background-color: #fff;
      }
    }
  }
  .uk-nav-sub li:first-child {
    display: none;
  }
}
#container {
  position: relative;
  margin-top: 80px;
  margin-left: 305px;
  .header {
    padding: 36px 55px 0 55px;
    position: sticky;
    z-index: 2;
    background-color: #fff;
    top: 80px;
    .header-content {
      border-bottom: 1px solid #f0f0f0;
    }
    h1 {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .list-editor {
    overflow-y: auto;
    padding: 0 55px 0;
    ul.task-list {
      display: block;
    }
  }
}
.slideX-enter-active,
.slideX-leave-active {
  transition: transform 0.5s;
}
.slideX-enter,
.slideX-leave-to {
  transform: translateX(-100%);
}
// .slideX-enter-to {
//   transform: translateX(0%);
// }
</style>
