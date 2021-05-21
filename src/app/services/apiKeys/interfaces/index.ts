export interface IKeyPairSecret {
    publicKey: string
    privateKey: string
}

export interface IJwtPayload {
    id: string | any;
    role: string
    exp?: string
    gopai_signature: string
    iat?: string
    aud?: string
}