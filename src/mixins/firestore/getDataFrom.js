import firestoreRefs from '@/mixins/firestore/firestoreRefs';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [firestoreRefs, loaderMethods],
  methods: {
    async getDataFrom(dbKey) {
      this.showLoader();

      const db = await (await this.firestoreRefs[dbKey]()).get().then((doc) => doc);
      this.hideLoader();

      return db.exists ? db.data() : false;
    },
  },
};
