import { IEncrypt, ITokenPayload } from "./encrypt.types";
import { config } from 'src/_common/app-configs/config';
import { Injectable } from "@nestjs/common";

const jwt = require ('jsonwebtoken');


@Injectable()
export class JWTStrategyService implements IEncrypt {
    encode(payload: ITokenPayload): string {
        return jwt.sign(payload, config.appSecretKey);
    }

    decode(encryption: string): ITokenPayload {
        return jwt.decode(encryption);
    }
}