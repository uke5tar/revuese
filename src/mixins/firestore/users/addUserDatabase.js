import addDatabase from '../methods/addDatabase';

export default {
  mixins: [addDatabase],
  methods: {
    addUserDatabase(data) {
      const { currentUser } = this.$fireauth;
      this.addDatabase('users', currentUser.uid, data);
    },
  },
};
