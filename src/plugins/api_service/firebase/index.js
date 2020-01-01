import axios from 'axios';
import defaultSettings from './settings';
import { assignMethodsToApi } from './helper';


export default function FirebaseApi() {
  this.apiService = axios.create(defaultSettings);
}

assignMethodsToApi(FirebaseApi);
