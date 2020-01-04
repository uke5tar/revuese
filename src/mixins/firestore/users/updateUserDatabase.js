import { mapGetters } from 'vuex';
import updateDatabase from '../methods/updateDatabase';

export default {
  mixins: [updateDatabase],
  computed: {
    ...mapGetters('user', ['userData']),
  },
  methods: {
    updateUserDatabase(data) {
      this.updateDatabase('users', this.userData.uid, data);
    },
  },
};
