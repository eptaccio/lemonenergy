import { Injectable } from '@nestjs/common';
import { CustomerEligibilityResponseDto } from '../dto/customer-eligibility-calc-response.dto';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';
import { EligibilityRulesValidatorService } from './eligibility-rules-validator.service';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';
import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';

@Injectable()
export class EligibilityService {
  constructor(
    public readonly eligibilityRulesValidatorService: EligibilityRulesValidatorService,
  ) {}

  public async analyzeCustomer(
    customerInfo: CustomerEligibilityRequestDto,
  ): Promise<CustomerEligibilityResponseDto> {
    const validationResults =
      await this.eligibilityRulesValidatorService.validateAll(customerInfo);

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
  ): ReasonsForIneligibilityEnum[] {
    const invalidResults = validationResults.filter(result => result.isValid === false)
    return invalidResults.map((result) => result.reason);
  }

  private canBeAClient(validationResults: ValidationRuleResult[]): boolean {
    return validationResults.every(
      (result: ValidationRuleResult) => result.isValid === true,
    );
  }
}
