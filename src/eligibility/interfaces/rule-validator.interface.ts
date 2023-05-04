import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';

export type ValidationRuleResult = {
  isValid: boolean;
  reason?: ReasonsForIneligibilityEnum;
};

export interface IValidationRule {
  validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult>;
}
