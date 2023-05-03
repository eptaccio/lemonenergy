import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EligibilityModule } from '../eligibility/eligibility.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EligibilityModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
