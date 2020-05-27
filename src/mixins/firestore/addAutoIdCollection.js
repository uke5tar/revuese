import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  methods: {
    addAutoIdCollection(dbKey, data) {
      this.showLoader();

      return this.$firestore
        .collection(dbKey)
        .add(data)
        .then(() => {
          this.hideLoader();

          return true;
        });
    },
  },
};
