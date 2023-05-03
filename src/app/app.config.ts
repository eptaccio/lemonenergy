import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  PORT: process.env.APP_PORT || 3000,
}));
