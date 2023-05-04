import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { EligibilityService } from './services/eligibility.service';
import { EligibilityRulesValidatorService } from './services/eligibility-rules-validator.service';
import { ValidationRules } from './services/eligibility-validation-rules';
import { ConsumptionCalcsHelper } from './helpers/consumption-calcs.helper';

@Module({
  imports: [],
  controllers: [EligibilityController],
  providers: [
    ...ValidationRules,
    EligibilityRulesValidatorService,
    EligibilityService,
    ConsumptionCalcsHelper,
  ],
})
export class EligibilityModule {}
