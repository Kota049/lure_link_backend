import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';

import { CustomConfigService } from '../config/custom-config-service';
import { randomUUID } from 'crypto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwksClient: jwksRsa.JwksClient;
  constructor(
    private readonly clsService: ClsService,
    private readonly config: CustomConfigService,
  ) {
    this.jwksClient = jwksRsa({
      jwksUri: this.config.getJwksUri(),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // Bearerから始まっていない場合にはエラーにする
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    // 開発モードの場合は、任意のUUIDを設定しておく
    if (this.config.isDebug()) {
      this.clsService.set('user', { sub: randomUUID() });
      return true;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.verifyToken(token);
      this.clsService.set('user', decoded);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async verifyToken(token: string): Promise<any> {
    const decodedHeader = jwt.decode(token, { complete: true }) as any;
    if (!decodedHeader) throw new Error('Invalid token');

    const key = await this.jwksClient.getSigningKey(decodedHeader.header.kid);
    const signingKey = key.getPublicKey();

    return jwt.verify(token, signingKey, {
      algorithms: ['RS256'],
    });
  }
}
