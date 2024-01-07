import { firestore } from 'firebase-admin';

class firestoreService {

    async getCommomParamenter<T>(key: string) : Promise<T>  {

        return new Promise(async (resolve, reject) => {

            let paramenter = await firestore().collection('parameters').doc('COMMOM').get();

            if(paramenter.exists && paramenter.data()[key]) 
            {
                resolve(paramenter.data()[key] as T);
            }
            else
            {
                reject(`${key} parameter not found!`)
            }
        })
    }



}

export default firestoreService;
