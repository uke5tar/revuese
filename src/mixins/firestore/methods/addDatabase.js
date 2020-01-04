export default {
  methods: {
    addDatabase(name, uid, data) {
      this.$firestore.collection(name).doc(uid).set(data);
    },
  },
};
