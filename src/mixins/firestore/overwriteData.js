import { mapGetters } from 'vuex';
import loaderMethods from '@/mixins/loader';

export default {
  mixins: [loaderMethods],
  computed: {
    ...mapGetters('user', ['userUid']),
  },
  methods: {
    overwriteData(dbKey, data, id = this.userUid) {
      this.showLoader();

      return this.$firestore
        .collection(dbKey)
        .doc(id)
        .set(data)
        .then(() => {
          this.hideLoader();

          return true;
        });
    },
  },
};
