import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    updateDataFrom(dbKey, data) {
      this.showLoader();

      return this.firestoreRefs[dbKey].update(data).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
