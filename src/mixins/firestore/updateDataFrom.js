import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    updateDataFrom(dbKey, data) {
      this.showLoader();

      return this.$firestore
        .collection(dbKey)
        .doc(this.userUid)
        .update(data)
        .then(() => {
          this.hideLoader();

          return true;
        });
    },
  },
};
