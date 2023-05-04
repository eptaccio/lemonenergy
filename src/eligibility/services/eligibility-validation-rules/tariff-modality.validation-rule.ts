import { Injectable } from '@nestjs/common';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import {
  IValidationRule,
  ValidationRuleResult,
} from '../../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';
import { TariffModalitiesEnum } from '../../constants/tax-modalities.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class TariffModalityValidationRule extends BaseValidationRule {
  async validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const validTariffModalities = [
      TariffModalitiesEnum.CONVENCIONAL,
      TariffModalitiesEnum.BRANCA,
    ];

    const isValidTariffModality  = validTariffModalities.includes(
      prospectInfo.modalidadeTarifaria,
    );

    if (isValidTariffModality ) {
      return this.buildValidResponse()
    }

    return this.buildInvalidResponse(
      ReasonsForIneligibilityEnum.MODALIDADE_TARIFARIA_NAO_ACEITA,
    );
  }
}
