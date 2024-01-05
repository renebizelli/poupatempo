import { firestore } from 'firebase-admin';

class firestoreService {

    async getCommomParamenter(key: string) : Promise<string>  {

        return new Promise(async (resolve, reject) => {

            let paramenter = await firestore().collection('parameters').doc('COMMOM').get();

            console.log("paramenter >>", paramenter.exists)
            
            if(paramenter.exists && paramenter.data()[key]) 
            {
                resolve(paramenter.data()[key]);
            }
            else
            {
                reject(`${key} parameter not found!`)
            }
        })
    }



}

export default firestoreService;
