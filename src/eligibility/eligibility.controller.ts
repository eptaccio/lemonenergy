import { Controller, Get, Post, Req } from '@nestjs/common';
import { CustomerEligibilityRequestDto } from './dto/customer-eligibility-calc-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerEligibilityResponseDto } from './dto/customer-eligibility-calc-response.dto';
import { EligibilityService } from './services/eligibility.service';

@ApiTags('Eligibility')
@Controller('/eligibility')
export class EligibilityController {
  constructor(public readonly eligibilityService: EligibilityService) {}

  @ApiOperation({
    summary: 'Calculate eligibility',
    description: '',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: CustomerEligibilityResponseDto,
  })
  @Post('/calculate')
  public async calculateEligibility(
    @Req() customerInfo: CustomerEligibilityRequestDto,
  ): Promise<CustomerEligibilityResponseDto> {
    const result = await this.eligibilityService.analyzeCustomer(customerInfo);
    return result;
  }
}
