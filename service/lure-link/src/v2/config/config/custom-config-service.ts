import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService extends ConfigService {
  isDebug(): boolean {
    return this.get<string>('MODE') === 'DEBUG';
  }
  getJwksUri(): string {
    return this.get<string>('JWKS_URI');
  }
}
