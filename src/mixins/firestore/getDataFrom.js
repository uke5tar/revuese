import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    async getDataFrom(dbKey, id = this.userUid) {
      this.showLoader();

      const db = await this.$firestore.collection(dbKey).doc(id).get().then((doc) => doc);
      this.hideLoader();

      return db.exists ? db.data() : false;
    },
  },
};
