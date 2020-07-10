import updateDataFrom from '@/mixins/firestore/updateDataFrom';
import mergeData from '@/mixins/firestore/mergeData';

export default {
  mixins: [updateDataFrom, mergeData],
  methods: {
    async removeFieldFrom(dbKey, fieldKey) {
      const objToDelete = { [fieldKey]: this.$firebase.firestore.FieldValue.delete() };
      // firebase perceives a dot as a nested object and can't delete it via the update method
      const hasDotInFieldKey = fieldKey.indexOf('.') !== -1;

      return hasDotInFieldKey
        ? await this.mergeData(dbKey, objToDelete)
        : await this.updateDataFrom(dbKey, objToDelete);
    },
  },
};
