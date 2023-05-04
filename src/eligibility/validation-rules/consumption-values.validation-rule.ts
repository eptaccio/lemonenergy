import { Injectable } from '@nestjs/common';
import {
  ConsumptionHistoryDto,
  CustomerEligibilityRequestDto,
} from '../dto/customer-eligibility-calc-request.dto';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';
import { ConnectionTypesEnum } from '../constants/connection-types.enum';
import { BaseValidationRule } from './abstract-base-validation-rule';

@Injectable()
export class ConsumptionValuesValidationRule extends BaseValidationRule {
  private readonly MIN_AVG_IN_kWh_FOR_CONNECTION_TYPE_MAPPING: Map<
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
    const minAvgValue = this.MIN_AVG_IN_kWh_FOR_CONNECTION_TYPE_MAPPING.get(
      customerInfo.tipoDeConexao,
    );
    if (!minAvgValue) {
      throw new Error('value not expected');
    }

    const isValidConsumption = this.isValidConsumption(
      customerInfo.historicoDeConsumo,
      minAvgValue,
    );

    return this.buildResult(
      isValidConsumption,
      ReasonsForIneligibilityEnum.CONSUMO_MUITO_BAIXO_PARA_TIPO_DE_CONEXAO,
    );
  }

  private calculateAverageConsumption(
    consumptionHistory: ConsumptionHistoryDto,
  ) {
    const sum = consumptionHistory.items.reduce((prev, curr) => prev + curr);
    const avg = sum / consumptionHistory.items.length || 0;
    return avg;
  }

  private isValidConsumption(
    consumptionHistory: ConsumptionHistoryDto,
    minAverageConsumptionValue: number,
  ) {
    const avg = this.calculateAverageConsumption(consumptionHistory);
    return avg > minAverageConsumptionValue;
  }
}
