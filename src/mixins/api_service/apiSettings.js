import { interceptApiResponse, showLoaderOnFetch } from '@/plugins/api_service/config';

export default {
  methods: {
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
