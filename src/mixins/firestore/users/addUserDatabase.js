import { mapGetters } from 'vuex';
import addDatabase from '../methods/addDatabase';

export default {
  mixins: [addDatabase],
  computed: {
    ...mapGetters('user', 'userData'),
  },
  methods: {
    addUserDatabase(data) {
      this.addDatabase('users', this.userData.uid, data);
    },
  },
};
