export default {
  methods: {
    updateDatabase(name, uid, data) {
      this.$firestore.collection(name).doc(uid).update(data);
    },
  },
};
