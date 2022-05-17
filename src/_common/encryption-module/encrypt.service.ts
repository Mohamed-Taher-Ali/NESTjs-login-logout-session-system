import { IEncrypt, ITokenPayload } from "./encrypt.types";
import { Injectable } from "@nestjs/common";
import { EncryptContext } from "./encrypt-context.service";
import { JWTStrategyService } from "./JWT-strategy.service";

@Injectable()
export class EncryptionService implements IEncrypt {
    private strategy: IEncrypt;

    constructor(
        private readonly jwtStrategy: JWTStrategyService
    ){
        this.strategy = new EncryptContext(jwtStrategy);
    }

    encode(payload: ITokenPayload): string {
        return this.strategy.encode(payload);
    }

    decode(encryption: string): ITokenPayload {
        return this.strategy.decode(encryption);
    }
}