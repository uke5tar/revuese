import getAllFiles from '@/helper/getAllFiles';


export const assignMethodsToApi = async (ApiClass) => {
  const methodsList = await Promise.all(
    getAllFiles(require.context('./methods', true, /\.(js)$/i))
      .map(async (file) => (await (() => import(`./methods/${file}`))()).default),
  );

  methodsList.forEach((list) => {
    Object.keys(list).forEach((method) => {
      // eslint-disable-next-line no-param-reassign
      ApiClass.prototype[method] = list[method];
    });
  });
};
