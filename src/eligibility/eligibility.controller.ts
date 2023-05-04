import { Body, Controller, Post } from '@nestjs/common';
import { ProspectEligibilityRequestDto } from './dto/prospect-eligibility-calc-request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProspectEligibilityResponseDto } from './dto/prospect-eligibility-calc-response.dto';
import { EligibilityService } from './services/eligibility.service';

@ApiTags('Eligibility')
@Controller('/eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @ApiOperation({
    summary: 'Analyze prospect eligibility',
    description:
      'Analyze prospect eligibility based at electric bill information',
  })
  @ApiBody({ type: ProspectEligibilityRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: ProspectEligibilityResponseDto,
  })
  @Post('/analyze')
  public async calculateEligibility(
    @Body() prospectInfo: ProspectEligibilityRequestDto,
  ): Promise<ProspectEligibilityResponseDto> {
    const result = await this.eligibilityService.analyzeProspect(prospectInfo);
    return result;
  }
}
