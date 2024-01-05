import { bills } from "../models/bill";
import firestoreService from "./firestore.services";
import axios from 'axios';

class nubankService {

    constructor(private firestore: firestoreService) {

    }

    async bills(access_token: string) {

        try
        {
            let url = await this.firestore.getCommomParamenter("NUBANK_URL_BILLS")

            let result = await axios.get(url, { headers : { Authorization: access_token }});

            return (result.data as bills).bills.map(m => m);
        }
        catch(e) {
            throw e;
        }
        
    }

}

export default nubankService;
