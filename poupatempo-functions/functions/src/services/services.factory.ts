import authService from "./auth.services";
import firestoreService from "./firestore.services";
import nubankService from "./nubank.services";

class serviceFactory {

    static auth() {
        return new authService();
    }

    static nubank() {
        return new nubankService(serviceFactory.firestoreService());
    }

    static firestoreService() {
        return new firestoreService();
    }


    

}

export default serviceFactory;