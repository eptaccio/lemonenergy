import { Body, Controller, Post } from '@nestjs/common';
import { CustomerEligibilityRequestDto } from './dto/customer-eligibility-calc-request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerEligibilityResponseDto } from './dto/customer-eligibility-calc-response.dto';
import { EligibilityService } from './services/eligibility.service';

@ApiTags('Eligibility')
@Controller('/eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @ApiOperation({
    summary: 'Calculate eligibility'
  })
  @ApiBody({ type: CustomerEligibilityRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: CustomerEligibilityResponseDto,
  })
  @Post('/calculate')
  public async calculateEligibility(
    @Body() customerInfo: CustomerEligibilityRequestDto,
  ): Promise<CustomerEligibilityResponseDto> {
    const result = await this.eligibilityService.analyzeCustomer(customerInfo);
    return result;
  }
}
