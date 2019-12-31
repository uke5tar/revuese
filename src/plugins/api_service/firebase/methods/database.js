async function addUniqueUserDatabaseByUID(firebaseUser) {
  const { user } = firebaseUser;
  const { uid } = user;
  const userName = user.displayName;

  user.updateProfile({
    displayName: userName,
  });

  this.$fireStore
    .collection('users')
    .doc(uid)
    .set({
      username: userName,
    });

  return firebaseUser;
}

export default {
  addUniqueUserDatabaseByUID,
};
