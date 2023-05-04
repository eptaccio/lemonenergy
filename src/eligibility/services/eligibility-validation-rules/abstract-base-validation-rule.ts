import { CustomerEligibilityRequestDto } from '../../dto/customer-eligibility-calc-request.dto';
import {
  IValidationRule,
  ValidationRuleResult,
} from '../../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseValidationRule implements IValidationRule {
  protected buildValidResponse() {
    return {
      isValid: true,
    };
  }

  protected buildInvalidResponse(reason: ReasonsForIneligibilityEnum) {
    return {
      isValid: false,
      reason,
    };
  }

  abstract validate(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult>;
}
