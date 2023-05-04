import { Injectable } from '@nestjs/common';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import {
  ValidationRuleResult,
} from '../../interfaces/rule-validator.interface';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';
import { TariffModalityEnum } from '../../constants/tariff-modality.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class TariffModalityValidationRule extends BaseValidationRule {
  public async validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const validTariffModalities = [
      TariffModalityEnum.CONVENCIONAL,
      TariffModalityEnum.BRANCA,
    ];

    const isValidTariffModality  = validTariffModalities.includes(
      prospectInfo.modalidadeTarifaria,
    );

    if (isValidTariffModality ) {
      return this.buildValidResponse()
    }

    return this.buildInvalidResponse(
      ReasonForIneligibilityEnum.MODALIDADE_TARIFARIA_NAO_ACEITA,
    );
  }
}
