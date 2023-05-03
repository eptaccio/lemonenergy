import { Injectable } from '@nestjs/common';
import { CustomerEligibilityResponseDto } from '../dto/customer-eligibility-calc-response.dto';
import { CustomerEligibilityRequestDto } from '../dto/customer-eligibility-calc-request.dto';
import { EligibilityRulesValidatorService } from './eligibility-rules-validator.service';
import { ValidationRuleResult } from '../interfaces/rule-validator.interface';

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

  private getIneligibilityReasons(validationResults: ValidationRuleResult[]) {
    return validationResults.map((result) => result.reasons).flat();
  }

  private canBeAClient(validationResults: ValidationRuleResult[]) {
    return validationResults.every(
      (result: ValidationRuleResult) => result.isValid === true,
    );
  }
}
