import { ReasonForIneligibilityEnum } from '../constants/reason-for-ineligibility.enum';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';

export type ValidationRuleResult = {
  isValid: boolean;
  reason?: ReasonForIneligibilityEnum;
};

export interface IValidationRule {
  validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult>;
}
