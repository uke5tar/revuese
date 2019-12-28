<template>
  <v-snackbar
    right
    :color="color"
    :value="show"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :timeout="0">
    {{ text }}
    <v-btn
      icon
      @click="show = false">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Snackbar',
  data: () => ({
    show: false,
    text: 'Action completed',
    color: 'success',
    icon: 'done',
    timer: null,
  }),
  computed: {
    ...mapGetters('current', ['snackbar']),
  },
  methods: {
    scheduleClose(timeout) {
      this.timer = setTimeout(() => { this.show = false; }, timeout);
    },
    onMouseEnter() {
      clearTimeout(this.timer);
    },
    onMouseLeave() {
      this.scheduleClose(1000);
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'current/setSNACKBAR') {
        Object.keys(this.snackbar).forEach((key) => {
          if (this[key]) this[key] = this.snackbar[key];
        });
        this.show = true;
        this.scheduleClose(3000);
      }
    });
  },
};
</script>
