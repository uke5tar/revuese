import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    addAutoIdCollection(dbKey, data) {
      this.showLoader();

      return this.firestoreRefs[dbKey].add(data).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
