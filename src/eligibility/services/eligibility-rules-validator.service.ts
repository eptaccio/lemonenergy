import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';

import {
  IValidationRule,
  ValidationRuleResult
} from '../interfaces/rule-validator.interface';

import {
  ValidationRules
} from './eligibility-validation-rules';
import { BaseValidationRule } from './eligibility-validation-rules/abstract-base-validation-rule';

@Injectable()
export class EligibilityRulesValidatorService {
  constructor(private readonly moduleRef: ModuleRef) { }

  public async validateAll(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult[]> {
    const validationRules = ValidationRules.map((rule) =>
      this.moduleRef.get<BaseValidationRule>(rule),
    );

    return this.verifyRules(customerInfo, validationRules);
  }

  private async verifyRules(
    customerInfo: CustomerEligibilityRequestDto,
    rules: BaseValidationRule[],
  ): Promise<ValidationRuleResult[]> {
    const pendingValidations = rules.map((rule) => rule.validate(customerInfo));
    const validationResults = await Promise.all(pendingValidations);
    return validationResults;
  }
}
