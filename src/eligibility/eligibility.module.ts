import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { EligibilityService } from './services/eligibility.service';
import { EligibilityRulesValidatorService } from './services/eligibility-rules-validator.service';
import { ValidationRules } from './validation-rules';

@Module({
  imports: [],
  controllers: [EligibilityController],
  providers: [
    ...ValidationRules,
    EligibilityRulesValidatorService,
    EligibilityService,
  ],
})
export class EligibilityModule {}
