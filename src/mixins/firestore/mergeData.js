import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    mergeData(dbKey, data, merge = true) {
      this.showLoader();

      return this.$firestore
        .collection(dbKey)
        .doc(this.userUid)
        .set(data, { merge })
        .then(() => {
          this.hideLoader();

          return true;
        });
    },
  },
};
