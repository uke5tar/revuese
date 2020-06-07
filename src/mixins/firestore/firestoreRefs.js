import { mapGetters } from 'vuex';
import { USERS } from '@/config/firestore';

export default {
  computed: {
    ...mapGetters('user', ['userUid']),

    firestoreRefs() {
      return {
        [USERS]: async () => this.$firestore
          .collection(USERS)
          .doc(this.userUid),
      };
    },
  },
};
