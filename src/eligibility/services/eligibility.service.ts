import { Injectable } from '@nestjs/common';
import { ProspectEligibilityResponseDto } from '../dto/prospect-eligibility-calc-response.dto';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';
import { EligibilityRulesValidatorService } from './eligibility-rules-validator.service';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';
import { ReasonForIneligibilityEnum } from '../constants/reason-for-ineligibility.enum';

@Injectable()
export class EligibilityService {
  constructor(
    public readonly eligibilityRulesValidatorService: EligibilityRulesValidatorService,
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
    const invalidResults = validationResults.filter(result => result.isValid === false)
    return invalidResults.map((result) => result.reason);
  }

  private canBeAClient(validationResults: ValidationRuleResult[]): boolean {
    return validationResults.every(
      (result: ValidationRuleResult) => result.isValid === true,
    );
  }
}
