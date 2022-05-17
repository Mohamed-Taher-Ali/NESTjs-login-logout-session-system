import { IEncrypt, ITokenPayload } from "./encrypt.types";


export class EncryptContext implements IEncrypt {
    strategy: IEncrypt;

    constructor(
        private readonly encryptStrategy: IEncrypt
    ){
        this.strategy = encryptStrategy;
    }

    encode(payload: ITokenPayload): string {
        return this.strategy.encode(payload);
    }

    decode(encryption: string): ITokenPayload {
        return this.strategy.decode(encryption);
    }
}