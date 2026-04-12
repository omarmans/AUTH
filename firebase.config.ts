import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
export const firebaseConfig = {
  apiKey: 'AIzaSyBWkyQtVOux4klJdlT3PQu6SOiLTOrzd34',
  authDomain: 'ogmholdinggroup-592cd.firebaseapp.com',
  databaseURL: 'https://ogmholdinggroup-592cd-default-rtdb.firebaseio.com',
  projectId: 'ogmholdinggroup-592cd',
  storageBucket: 'ogmholdinggroup-592cd.firebasestorage.app',
  messagingSenderId: '310422972211',
  appId: '1:310422972211:web:ba840a51d2295ad21d4046',
  measurementId: 'G-C07MEBGBL2',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
