import { Bill, BillResponse } from "../models/bill";
import firestoreService from "./firestore.services";
import axios from 'axios';

class nubankService {

    constructor(private firestore: firestoreService) {

    }

    async bills(access_token: string): Promise<Bill[]> {

        try {
            let url = await this.firestore.getCommomParamenter<string>("NUBANK_URL_BILLS");
            let numberOfLastBill = await this.firestore.getCommomParamenter<number>("NUMBER_OF_LAST_BILLS");

            let result = await axios.get(url, { headers: { Authorization: access_token } });

            let response = result.data as BillResponse;

            response.bills.map(m => {
                m.summary.due_date = new Date(m.summary.due_date);
                m.summary.total_balance = m.summary.total_balance / 100;
            })

            const cutDate = new Date();
            cutDate.setMonth(cutDate.getMonth() + 2);
            cutDate.setDate(0);

            let bills = response.bills.filter(m => m.summary.due_date < cutDate)

            const slicedbills = bills.slice(0, numberOfLastBill);

            return slicedbills;
        }
        catch (e) {
            throw e;
        }

    }

}

export default nubankService;
