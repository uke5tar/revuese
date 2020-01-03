import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('current', ['setLoader']),
    showLoader() {
      this.setLoader(true);
    },
    hideLoader(timer = 800) {
      setTimeout(() => this.setLoader(false), timer);
    },
  },
};
