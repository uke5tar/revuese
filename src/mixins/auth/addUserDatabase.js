export default {
  methods: {
    addUserDatabase(user) {
      const { uid } = user;
      const { displayName } = user;

      this.$firebaseApi
        .firestore()
        .collection('users')
        .doc(uid)
        .set({
          userName: displayName,
        });
    },
  },
};
