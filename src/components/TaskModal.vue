<template>
  <div>
    <!-- This is a button toggling the modal with the default close button -->
    <!-- <button
      class="uk-button uk-button-default uk-margin-small-right"
      type="button"
      uk-toggle="target: #modal-close-default"
    >
      open
    </button> -->

    <!-- This is the modal with the default close button -->
    <div id="modal-close-default" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">Default</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
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
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
