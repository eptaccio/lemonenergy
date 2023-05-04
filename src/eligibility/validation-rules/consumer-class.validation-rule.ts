import { Injectable } from '@nestjs/common';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';
import { ConsumerClassEnum } from '../constants/consumer-class.enum';
import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class ConsumerClassValidationRule extends BaseValidationRule {
  async validate(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const validConsumerClasses = [
      ConsumerClassEnum.COMERCIAL,
      ConsumerClassEnum.RESIDENCIAL,
      ConsumerClassEnum.INDUSTRIAL,
    ];

    const isValidConsumerClass = validConsumerClasses.includes(
      customerInfo.classeDeConsumo,
    );
    return this.buildResult(
      isValidConsumerClass,
      ReasonsForIneligibilityEnum.CLASSE_DE_CONSUMO_NAO_ACEITA,
    );
  }
}
