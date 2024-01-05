
import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';

import * as firebaseConfig from '../config/firebase.json';
import * as firebaseAdminConfig from '../config/firebase-admin.json';

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
});