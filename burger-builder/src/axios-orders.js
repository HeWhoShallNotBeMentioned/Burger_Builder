
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-react-c4955.firebaseio.com/'
});

export default instance;