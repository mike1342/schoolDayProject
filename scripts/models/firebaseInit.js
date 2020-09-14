import * as firebase from "firebase";

const config = {CONFIG};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
