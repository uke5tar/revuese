import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    async mergeData(dbKey, data) {
      this.showLoader();

      return (await this.firestoreRefs[dbKey]()).set(data, { merge: true }).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
