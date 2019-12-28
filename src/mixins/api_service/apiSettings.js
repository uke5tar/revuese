import { updateApiDefaults, interceptApiResponse, showLoaderOnFetch } from '@/plugins/api_service/config';

export default {
  methods: {
    updateFirebaseApiDefaults(token) {
      updateApiDefaults(
        this.$firebaseApi.apiService,
        token,
      );
    },

    interceptFirebaseApiResponse(user) {
      interceptApiResponse(
        this.$firebaseApi.apiService,
        user,
      );
    },

    showLoaderOnFirebaseApiFetch(user) {
      showLoaderOnFetch(
        this.$firebaseApi.apiService,
        user,
      );
    },
  },
};
