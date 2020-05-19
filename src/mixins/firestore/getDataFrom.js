import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    async getDataFrom(dbKey) {
      this.showLoader();

      const db = await this.$firestore.collection(dbKey).doc(this.userUid).get().then((doc) => doc);
      this.hideLoader();

      return db.exists ? db.data() : false;
    },
  },
};
