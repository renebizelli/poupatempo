import { NubankApi } from 'nubank-api/lib/index.js';
import { readFile } from 'fs/promises';
import errorDto from '../dtos/error.dto';

class authService {

    login = async (identifier: string, password: string): Promise<string> => {

        return await new Promise(async (resolve, reject)  =>  {

            try {

                const api = new NubankApi({
                    clientName: 'github:fmsouza/nubank-api',
                    cert: await readFile('./src/cert/cert.p12')
                });

                await api.auth.authenticateWithCertificate(identifier, password);
                resolve(api.authState.accessToken || '')
            }
            catch (e:any) {
                let error = new errorDto(e.response.status, e.code, e.response.statusText)
                reject(error);
            }

        });
    }

}

export default authService;