import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    mergeData(dbKey, data) {
      this.showLoader();

      return this.firestoreRefs[dbKey].set(data, { merge: true }).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
