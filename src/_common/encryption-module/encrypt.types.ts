export interface ITokenPayload {
    id: string;
}

export interface IEncrypt {
    encode(payload: ITokenPayload): string;
    decode(encryption: string): ITokenPayload;
}