export default {
  methods: {
    addUserDatabase(user) {
      this.$firestore.collection('users').doc(user.uid).set({
        userName: user.displayName,
      });
    },
  },
};
