import loaderMethods from '@/mixins/loader';
import firestoreRefs from '@/mixins/firestore/firestoreRefs';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    async getDataFrom(dbKey) {
      this.showLoader();

      const db = await this.firestoreRefs[dbKey].get().then((doc) => doc);
      this.hideLoader();

      return db.exists ? db.data() : false;
    },
  },
};
