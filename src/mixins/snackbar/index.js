import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('current', ['setSnackbar']),

    setSnackbarSaved(data) {
      this.setSnackbar({
        text: 'Saved', color: 'success', icon: 'done', ...data,
      });
    },
    setSnackbarSuccess(data) {
      this.setSnackbar({ color: 'success', icon: 'done', ...data });
    },
    setSnackbarError(data) {
      this.setSnackbar({ color: 'red', icon: 'warning', ...data });
    },
    setSnackbarInfo(data) {
      this.setSnackbar({ color: 'purple', icon: 'info', ...data });
    },
  },
};
