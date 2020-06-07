import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    async addAutoIdCollection(dbKey, data) {
      this.showLoader();

      return (await this.firestoreRefs[dbKey]()).add(data).then(() => {
        this.hideLoader();

        return true;
      });
    },
  },
};
