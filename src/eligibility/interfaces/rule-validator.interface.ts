import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';

export type ValidationRuleResult = {
  isValid: boolean;
  reasons?: ReasonsForIneligibilityEnum[];
};

export interface IValidationRule {
  validate(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult>;
}
