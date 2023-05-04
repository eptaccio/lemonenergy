import { ApiProperty } from '@nestjs/swagger';
import { ReasonForIneligibilityEnum } from '../constants/reason-for-ineligibility.enum';

export class ProspectEligibilityResponseDto {
  @ApiProperty({
    description: 'Main analysis result',
  })
  public readonly elegivel: boolean;

  @ApiProperty({
    description: 'Ineligibility justification',
    type: 'array',
    items: {
      type: 'string',
      enum: Object.values(ReasonForIneligibilityEnum),
    },
    uniqueItems: true,
  })
  public readonly razoesDeInelegibilidade?: ReasonForIneligibilityEnum[];

  @ApiProperty({
    description: 'Year CO2 saving projection',
  })
  public readonly economiaAnualDeCO2?: number;
}
