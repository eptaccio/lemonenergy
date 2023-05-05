import { Injectable } from '@nestjs/common';
import { ProspectEligibilityResponseDto } from '../dto/prospect-eligibility-calc-response.dto';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';
import { EligibilityRulesValidatorService } from './eligibility-rules-validator.service';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';
import { ReasonForIneligibilityEnum } from '../constants/reason-for-ineligibility.enum';
import { ConsumptionCalcsHelper } from '../helpers/consumption-calcs.helper';

@Injectable()
export class EligibilityService {
  constructor(
    private readonly eligibilityRulesValidatorService: EligibilityRulesValidatorService,
    private readonly consumptionCalcsHelper: ConsumptionCalcsHelper,
  ) {}

  public async analyzeProspect(
    prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ProspectEligibilityResponseDto> {
    const validationResults =
      await this.eligibilityRulesValidatorService.validateAll(prospectInfo);

    const isClientEligible = this.canBeAClient(validationResults);
    if (isClientEligible) {
      return {
        elegivel: true,
        economiaAnualDeCO2: this.calculateCo2SavingProjection(
          prospectInfo.historicoDeConsumo,
        ),
      };
    }

    const ineligibilityReasons =
      this.getIneligibilityReasons(validationResults);

    return {
      elegivel: false,
      razoesDeInelegibilidade: ineligibilityReasons,
    };
  }

  private getIneligibilityReasons(
    validationResults: ValidationRuleResult[],
  ): ReasonForIneligibilityEnum[] {
    const invalidResults = validationResults.filter(
      (result) => result.isValid === false,
    );
    return invalidResults.map((result) => result.reason);
  }

  private canBeAClient(validationResults: ValidationRuleResult[]): boolean {
    return validationResults.every(
      (result: ValidationRuleResult) => result.isValid === true,
    );
  }

  private calculateCo2SavingProjection(consumptionHistory: number[]): number {
    const avgConsumption =
      this.consumptionCalcsHelper.calcAverageConsumption(consumptionHistory);

    return this.consumptionCalcsHelper.calcCO2AnnualSaving(avgConsumption);
  }
}
