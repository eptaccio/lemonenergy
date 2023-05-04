import { Injectable } from '@nestjs/common';
import { CustomerEligibilityRequestDto } from '../../dto/customer-eligibility-calc-request.dto';
import {
  IValidationRule,
  ValidationRuleResult,
} from '../../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';
import { TaxModalitiesEnum } from '../../constants/tax-modalities.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class TaxModalitiesValidationRule extends BaseValidationRule {
  async validate(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const validTaxModes = [
      TaxModalitiesEnum.CONVENCIONAL,
      TaxModalitiesEnum.BRANCA,
    ];

    const isValidTaxMode = validTaxModes.includes(
      customerInfo.modalidadeTarifaria,
    );
    return this.buildResult(
      isValidTaxMode,
      ReasonsForIneligibilityEnum.MODALIDADE_TARIFARIA_NAO_ACEITA,
    );
  }
}
