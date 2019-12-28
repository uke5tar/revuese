import axios from 'axios';
import defaultSettings from './settings';
import getAllFiles from '@/helper/getAllFiles';


export default function FirebaseApi() {
  this.apiService = axios.create(defaultSettings);
}

(async function assignMethodsToFirebaseApi() {
  const methodsList = await Promise.all(
    getAllFiles(require.context('./methods', true, /\.(js)$/i))
      .map(async (file) => (await (() => import(`./methods/${file}`))()).default),
  );

  methodsList.forEach((list) => {
    Object.keys(list).forEach((method) => {
      FirebaseApi.prototype[method] = list[method];
    });
  });
}());
