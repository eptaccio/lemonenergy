import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';

import {
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
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult[]> {
    const validationRules = ValidationRules.map((rule) =>
      this.moduleRef.get<BaseValidationRule>(rule),
    );

    return this.verifyRules(prospectInfo, validationRules);
  }

  private async verifyRules(
    prospectInfo: ProspectEligibilityRequestDto,
    rules: BaseValidationRule[],
  ): Promise<ValidationRuleResult[]> {
    const pendingValidations = rules.map((rule) => rule.validate(prospectInfo));
    const validationResults = await Promise.all(pendingValidations);
    return validationResults;
  }
}
