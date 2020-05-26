import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    mergeData(dbKey, data, merge = true, id = this.userUid) {
      this.showLoader();

      return this.$firestore
        .collection(dbKey)
        .doc(id)
        .set(data, { merge })
        .then(() => {
          this.hideLoader();

          return true;
        });
    },
  },
};
