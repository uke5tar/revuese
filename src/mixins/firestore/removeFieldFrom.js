import updateDataFrom from '@/mixins/firestore/updateDataFrom';
import snackbarMethods from '@/mixins/snackbar';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [updateDataFrom, loaderMethods, snackbarMethods],
  methods: {
    async removeFieldFrom(dbKey, fieldKey) {
      this.showLoader();

      const isUpdated = await this.updateDataFrom(dbKey, {
        [fieldKey]: this.$firebase.firestore.FieldValue.delete(),
      });

      this.hideLoader();

      return isUpdated;
    },
  },
};
