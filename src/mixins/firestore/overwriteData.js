import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    overwriteData(dbKey, data) {
      this.showLoader();

      return this.firestoreRefs[dbKey].set(data).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
