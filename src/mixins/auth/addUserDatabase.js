export default {
  methods: {
    addUserDatabase(user) {
      const { uid } = user;
      const { displayName } = user;

      this.$firestore
        .collection('users')
        .doc(uid)
        .set({
          userName: displayName,
        });
    },
  },
};
