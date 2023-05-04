import { Injectable } from '@nestjs/common';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import { ValidationRuleResult } from '../../interfaces/rule-validator.interface';
import { TariffClassEnum } from '../../constants/tariff-class.enum';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class TariffClassValidationRule extends BaseValidationRule {
  public async validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const validTariffClasses = [
      TariffClassEnum.COMERCIAL,
      TariffClassEnum.RESIDENCIAL,
      TariffClassEnum.INDUSTRIAL,
    ];

    const isValidTariffClass = validTariffClasses.includes(
      prospectInfo.classeDeConsumo,
    );

    if (isValidTariffClass) {
      return this.buildValidResponse();
    }

    return this.buildInvalidResponse(
      ReasonForIneligibilityEnum.CLASSE_DE_CONSUMO_NAO_ACEITA,
    );
  }
}
