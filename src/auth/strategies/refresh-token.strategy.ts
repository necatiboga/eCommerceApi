import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor(config:ConfigService) {
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:config.get<string>('SECRET_KEY_REFRESH'),
      passReqToCallback:true,
    });
  }

  validate(req:Request,payload:any){
    const refreshToken = req.get('authorization').replace('Bearer','').trim();
    return {
      ...payload,
      refreshToken
    }
  }

}