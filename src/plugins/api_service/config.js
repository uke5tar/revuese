// intercept api responses
export const interceptApiResponse = (api, user) => {
  const snackbarError = (data) => {
    user.$store.dispatch('current/setSnackbar', {
      text: 'Error', color: 'red', icon: 'warning', ...data,
    });
  };

  api.interceptors.response.use((response) => response, (error) => {
    if (error?.response?.status) {
      switch (error.response.status) {
      case 400:
        snackbarError({ text: 'Bad request' });
        break;

      case 401:
        snackbarError({ text: 'You are not authorized' });
        user.$store.dispatch('user/logout', user, { root: true });
        break;

      case 403:
        snackbarError({ text: 'Forbidden request' });
        user.$store.dispatch('user/logout', user, { root: true });
        break;

      case 404:
        snackbarError({ text: 'Not found' });
        break;

      case 500:
        snackbarError({ text: 'Internal server error' });
        break;

      case 503:
        snackbarError({ text: 'Service unavailable' });
        break;

      default:
        snackbarError();
      }
    }

    return Promise.reject(error);
  });
};

export const showLoaderOnFetch = (api, user) => {
  api.interceptors.request.use((config) => {
    user.$store.dispatch('current/setLoader', true);
    return config;
  });

  api.interceptors.response.use((response) => {
    setTimeout(() => {
      user.$store.dispatch('current/setLoader', false);
    }, 800);

    return response;
  });
};
