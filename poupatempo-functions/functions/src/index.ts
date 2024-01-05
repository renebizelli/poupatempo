import * as functions from 'firebase-functions';
import mainApplication from './applications/main.application';

import './init/firebase.init';

let main: mainApplication = new mainApplication();

let app = functions.https.onRequest(main.getApp());

module.exports = { app }