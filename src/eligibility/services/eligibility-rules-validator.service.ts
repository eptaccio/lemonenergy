import { Injectable } from '@nestjs/common';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';
import { ConsumerClassValidationRule } from '../validation-rules/consumer-class.validation-rule';
import {
  IValidationRule,
  ValidationRuleResult,
} from '../interfaces/rule-validator.interface';

@Injectable()
export class EligibilityRulesValidatorService {
  constructor(
    public readonly consumerClassValidationRule: ConsumerClassValidationRule,
  ) {}

  public async validateAll(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult[]> {
    const validationRules = [this.consumerClassValidationRule];

    return this.verifyRules(customerInfo, validationRules);
  }

  private async verifyRules(
    customerInfo: CustomerEligibilityRequestDto,
    rules: IValidationRule[],
  ): Promise<ValidationRuleResult[]> {
    const pendingValidations = rules.map((rule) => rule.validate(customerInfo));
    const validationResults = await Promise.all(pendingValidations);
    return validationResults;
  }
}
