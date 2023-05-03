import { ApiProperty } from '@nestjs/swagger';
import { ReasonsForIneligibilityEnum } from '../constants/reasons-for-ineligibility.enum';

export class CustomerEligibilityResponseDto {
  @ApiProperty({
    description: 'Main analysis result',
  })
  public readonly elegivel: boolean;

  @ApiProperty({
    description: 'Ineligibility justification',
    type: 'array',
    items: {
      type: 'string',
      enum: Object.values(ReasonsForIneligibilityEnum),
    },
    uniqueItems: true,
  })
  public readonly razoesDeInelegibilidade?: ReasonsForIneligibilityEnum[];
}
