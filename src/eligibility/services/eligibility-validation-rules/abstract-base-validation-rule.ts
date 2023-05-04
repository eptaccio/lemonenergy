import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import {
  IValidationRule,
  ValidationRuleResult,
} from '../../interfaces/rule-validator.interface';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseValidationRule implements IValidationRule {
  protected buildValidResponse() {
    return {
      isValid: true,
    };
  }

  protected buildInvalidResponse(reason: ReasonForIneligibilityEnum) {
    return {
      isValid: false,
      reason,
    };
  }

  abstract validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult>;
}
