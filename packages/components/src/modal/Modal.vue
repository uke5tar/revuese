<template>
  <fragment>
    <slot name="activator" />
    <v-dialog
      :value="showModal"
      persistent
      scrollable
      :fullscreen="isFullScreen"
      :max-width="modalWidth"
      @click:outside="clickOutside ? cancel($event) : false"
      @keydown.esc="cancel">
      <v-card class="grabber">
        <v-card-title class="pr-12">
          <span class="headline" style="word-break: break-word;">{{ headline }}</span>
        </v-card-title>
        <v-card-subtitle v-if="$slots['header']" class="modal_header">
          <slot name="header" />
        </v-card-subtitle>
        <v-card-text v-if="hasTextField" :style="{height: modalHeight}">
          <v-container class="pl-0 pr-0" v-if="!isFullScreen">
            <slot />
          </v-container>
          <slot v-else />
        </v-card-text>
        <v-card-actions>
          <span v-if="saveBtnDisabled" class="pl-5 red--text font-italic">
            {{ saveBtnDisabledMsg }}
          </span>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="cancel" v-if="showCancelBtn">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="save" :disabled="saveBtnDisabled">
            {{ saveBtnName }}
          </v-btn>
        </v-card-actions>
        <v-btn
          icon absolute large style="right: 0;"
          v-if="toggleFullScreen"
          @click="isFullScreen = !isFullScreen">
          <v-icon large>
            {{ isFullScreen ? 'fullscreen_exit' : 'fullscreen' }}
          </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </fragment>
</template>


<script>
import movableElement from '@/mixins/movable_element';

export default {
  name: 'Modal',
  mixins: [movableElement],
  data: () => ({
    isFullScreen: false,
    movableModal: null,
  }),
  props: {
    headline: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    hasTextField: {
      type: Boolean,
      default: true,
    },
    toggleFullScreen: {
      type: Boolean,
      default: false,
    },
    modalWidth: {
      type: String,
      default: '600',
    },
    modalHeight: {
      type: String,
      default: '1000',
    },
    saveBtnDisabled: {
      type: Boolean,
      default: false,
    },
    saveBtnDisabledMsg: {
      type: String,
      default: '',
    },
    saveBtnName: {
      type: String,
      default: 'Save',
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    clickOutside: {
      type: Boolean,
      default: true,
    },
    disableMovableModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel(event) {
      // modal doesn't close if highlighted input is released outside of modal
      if (event.target?.id !== 'app') {
        this.$emit('cancel');
      }
    },
    save() {
      this.$emit('save');
    },
    initMovableModal() {
      const closestComponent = '.v-dialog.v-dialog--active';
      const component = 'v-card';

      this.movableModal = this.movableElement(closestComponent, component);
      if (this.movableModal) {
        this.movableModal.init();
      }
    },
  },
  watch: {
    showModal() {
      if (!this.disableMovableModal) {
        if (this.showModal) {
          this.initMovableModal();
        } else if (this.movableModal) {
          this.movableModal.destroy();
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
  .modal_header {
    padding-top: 20px;
    padding-bottom: 2px;
  }
  .v-dialog.v-dialog--active {
    .grabber {
      cursor: grab;

      &:active {
         cursor: grabbing;
      }
    }
  }
</style>
