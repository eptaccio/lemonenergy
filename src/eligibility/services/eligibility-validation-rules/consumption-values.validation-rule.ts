import { Injectable } from '@nestjs/common';

import { BaseValidationRule } from './abstract-base-validation-rule';
import { ConnectionTypesEnum } from '../../constants/connection-types.enum';
import {
  CustomerEligibilityRequestDto,
} from '../../dto/customer-eligibility-calc-request.dto';
import { ValidationRuleResult } from '../../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';
 
@Injectable()
export class ConsumptionValuesValidationRule extends BaseValidationRule {
  private readonly MIN_AVG_CONSUMPTION_FOR_CONNECTION_TYPE: Map<
    ConnectionTypesEnum,
    number
  > = new Map([
    [ConnectionTypesEnum.MONOFASICO, 400],
    [ConnectionTypesEnum.BIFASICO, 500],
    [ConnectionTypesEnum.TRIFASICO, 750],
  ]);

  async validate(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const minAvgValue = this.MIN_AVG_CONSUMPTION_FOR_CONNECTION_TYPE.get(
      customerInfo.tipoDeConexao,
    );

    const isValidConsumption = this.isValidConsumption(
      customerInfo.historicoDeConsumo,
      minAvgValue,
    );

    if (isValidConsumption) {
      return this.buildValidResponse();
    }

    return this.buildInvalidResponse(
      ReasonsForIneligibilityEnum.CONSUMO_MUITO_BAIXO_PARA_TIPO_DE_CONEXAO,
    );
  }

  private calculateAverageConsumption(
    consumptionHistory: number[],
  ) {
    const sum = consumptionHistory.reduce((prev, curr) => prev + curr);
    const avg = sum / consumptionHistory.length || 0;
    return avg;
  }

  private isValidConsumption(
    consumptionHistory: number[],
    minAverageConsumptionValue: number,
  ) {
    const avg = this.calculateAverageConsumption(consumptionHistory);
    return avg > minAverageConsumptionValue;
  }
}
