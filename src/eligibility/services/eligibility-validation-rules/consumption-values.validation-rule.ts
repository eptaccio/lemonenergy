import { Injectable } from '@nestjs/common';

import { BaseValidationRule } from './abstract-base-validation-rule';
import { ConnectionTypeEnum } from '../../constants/connection-type.enum';
import {
  ProspectEligibilityRequestDto,
} from '../../dto/prospect-eligibility-calc-request.dto';
import { ValidationRuleResult } from '../../interfaces/rule-validator.interface';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';
 
@Injectable()
export class ConsumptionValuesValidationRule extends BaseValidationRule {
  private readonly MIN_AVG_CONSUMPTION_FOR_CONNECTION_TYPE: Map<
    ConnectionTypeEnum,
    number
  > = new Map([
    [ConnectionTypeEnum.MONOFASICO, 400],
    [ConnectionTypeEnum.BIFASICO, 500],
    [ConnectionTypeEnum.TRIFASICO, 750],
  ]);

  async validate(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ValidationRuleResult> {
    const minAvgValue = this.MIN_AVG_CONSUMPTION_FOR_CONNECTION_TYPE.get(
      prospectInfo.tipoDeConexao,
    );

    const isValidConsumption = this.isValidConsumption(
      prospectInfo.historicoDeConsumo,
      minAvgValue,
    );

    if (isValidConsumption) {
      return this.buildValidResponse();
    }

    return this.buildInvalidResponse(
      ReasonForIneligibilityEnum.CONSUMO_MUITO_BAIXO_PARA_TIPO_DE_CONEXAO,
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
