import serviceFactory from '../services/services.factory';
import authController from './auth.controller';
import nubankController from './nubank.controller';

class controllerFactory {

    static all() {
        return [
            new authController(serviceFactory.auth()),
            new nubankController(serviceFactory.nubank())
        ]
    }

}

export default controllerFactory;