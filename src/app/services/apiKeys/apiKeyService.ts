import { IJwtPayload } from './interfaces/index';
import { IKeyPairSecret } from './index';
import {privateDecrypt, publicDecrypt, privateEncrypt, PrivateKeyInput, sign, verify, RSAKeyPairOptions, generateKeyPairSync, constants, publicEncrypt} from 'crypto'
import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { Env, IEnv } from '../../config/env'
import _ from 'lodash'
import { GenericResponse, HttpStatusCode } from '../../utils';

@injectable()
export class ApikeyService {
    private readonly env: IEnv;
    private readonly cryptoKeyPairAlgorithm: string;
    private readonly crytoCipherAlgorithm: string
    private readonly cryptoCipherKeyLength: number;

    constructor (){
        this.env = Env.all()
        this.cryptoKeyPairAlgorithm = 'SHA25A'
        this.crytoCipherAlgorithm = 'aes-192-cbc';
        this.cryptoCipherKeyLength = 24
    }

    public generateKeyPair(): IKeyPairSecret {
        try {
            const options: RSAKeyPairOptions<'pem', 'pem'> = {
                 modulusLength: 1048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                    cipher: 'aes-256-cbc',
                    passphrase: this.env.crypto_key_pair_secret,
                }
            }
            const {publicKey, privateKey} = generateKeyPairSync('rsa', options)

            console.log(publicKey, privateKey)

            return {
                publicKey: _.trim(publicKey),
                privateKey: _.trim(privateKey)
            }
        }catch(e){
            console.log("===========error from apiService key")
            if (typeof e.code === 'string' || !e.code) {
                e.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
            }
            throw new GenericResponse(e.message, e.code);
            }
        }

          public encryptUserId(userId: string, publicKey: string): string {
            try {
            const encryptedUserIdBuffer = publicEncrypt(
                {
                key: publicKey,
                passphrase: this.env.crypto_key_pair_secret,
                padding: constants.RSA_PKCS1_OAEP_PADDING
                },
                Buffer.from(userId)
            );

            return encryptedUserIdBuffer.toString('hex');
            } catch (e) {
            throw new GenericResponse(e.message, e.code);
            }
        }

        public decryptUserId(encryptedUserId: string, privateKey: string): string {
        try {
        const decryptedUserIdBuffer = privateDecrypt(
            {
            key: privateKey,
            passphrase: this.env.crypto_key_pair_secret,
            padding: constants.RSA_PKCS1_OAEP_PADDING
            },
            Buffer.from(encryptedUserId, 'hex')
        );

        return decryptedUserIdBuffer.toString();
        } catch (e) {
        throw new GenericResponse(e.message, e.code);
        }
    }

      public signApiKey(dataToSign: string, privateKey: string, publicKey: string): string {
        try {
            const privateKeyInput: PrivateKeyInput = {
                key: privateKey,
                passphrase: this.env.crypto_key_pair_secret
            };

            console.log('======privateKeyInput', privateKeyInput)

            const signature = sign(this.cryptoKeyPairAlgorithm, Buffer.from(dataToSign), privateKeyInput)
                .toString('hex');
            const encryptedUserId = this.encryptUserId(dataToSign, publicKey);

            console.log('====signature', signature, encryptedUserId)

            return _.trim(`${signature}.${encryptedUserId}`);

            } catch (e) {
            if (typeof e.code === 'string' || !e.code) {
                e.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
            }
            throw new GenericResponse(e.message, e.code);
            }
        }

    public verifyApiKey(dataToVerify: string, signature: string, publicKey: string): boolean {
        try {
        return verify(this.cryptoKeyPairAlgorithm, Buffer.from(dataToVerify), publicKey, Buffer.from(signature, 'hex')) as unknown as boolean;
        } catch (e) {
        if (typeof e.code === 'string' || !e.code) {
            e.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
        }
        throw new GenericResponse(e.message, e.code);
        }
    }
    
    public generateJwtToken(data: IJwtPayload): string {
        try {
            const {id} = data;
            delete data.id
            return jwt.sign(data, this.env.jwt_secret_key, {
                expiresIn: '1hr',
                audience: id
            })
        } catch(e){
            if (typeof e.code === 'string' || !e.code) {
                e.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
            }
            throw new GenericResponse(e.message, e.code);
            }
        }
    
    public verifyToken(token: string): any {
        try{
            return jwt.verify(token, this.env.jwt_secret_key, {
                maxAge: '1hr'
            })
        }catch(e){
            if (typeof e.code === 'string' || !e.code) {
                e.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
            }
            throw new GenericResponse(e.message, e.code);
        }
    }
}

