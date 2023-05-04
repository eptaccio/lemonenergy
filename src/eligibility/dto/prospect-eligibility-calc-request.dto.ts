import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ConnectionTypeEnum } from '../constants/connection-type.enum';
import { TariffClassEnum } from '../constants/tariff-class.enum';
import { TariffModalityEnum } from '../constants/tariff-modality.enum';

const CPF_CNPJ_DOCUMENT_VALIDATION_EXPRESSION = /^(\d{11}|\d{14})$/;

const ConsumptionHistoryInputValidationRules = {
  MIN_ITEMS: 3,
  MAX_ITEMS: 12,
  MIN_VALUE: 0,
  MAX_VALUE: 9999,
};

const EACH_ITEM_VALIDATION = { each: true };

export class ProspectEligibilityRequestDto {
  @ApiProperty({
    description: 'Prospect brazilian id (cpf or cnpj)',
    required: true,
    example: '21554495008',
    enum: ['cpf', 'cnpj'],
  })
  @IsDefined()
  @Matches(CPF_CNPJ_DOCUMENT_VALIDATION_EXPRESSION)
  public readonly numeroDoDocumento: string;

  @ApiProperty({
    description: 'Electrical distribution/connection type',
    enum: ConnectionTypeEnum,
  })
  @IsDefined()
  @IsEnum(ConnectionTypeEnum)
  public readonly tipoDeConexao: ConnectionTypeEnum;

  @ApiProperty({
    description:
      'Prospect consumer class (based at Brazilian Normative Resolution ANEEL No. 414, 2010.)',
    enum: TariffClassEnum,
  })
  @IsDefined()
  @IsEnum(TariffClassEnum)
  public readonly classeDeConsumo: TariffClassEnum;

  @ApiProperty({
    description: 'The actual costs of generating electricity',
    enum: TariffModalityEnum,
  })
  @IsDefined()
  @IsEnum(TariffModalityEnum)
  public readonly modalidadeTarifaria: TariffModalityEnum;

  @ApiProperty({
    description: 'Prospect consumption history',
    type: 'number',
    isArray: true,
    minItems: ConsumptionHistoryInputValidationRules.MIN_ITEMS,
    maxItems: ConsumptionHistoryInputValidationRules.MAX_ITEMS,
    items: {
      type: 'integer',
      minimum: ConsumptionHistoryInputValidationRules.MIN_VALUE,
      maximum: ConsumptionHistoryInputValidationRules.MAX_VALUE,
    },
  })
  @IsDefined()
  @IsArray()
  @ArrayMaxSize(ConsumptionHistoryInputValidationRules.MAX_ITEMS)
  @ArrayMinSize(ConsumptionHistoryInputValidationRules.MIN_ITEMS)
  @IsInt(EACH_ITEM_VALIDATION)
  @Min(ConsumptionHistoryInputValidationRules.MIN_VALUE, EACH_ITEM_VALIDATION)
  @Max(ConsumptionHistoryInputValidationRules.MAX_VALUE, EACH_ITEM_VALIDATION)
  public readonly historicoDeConsumo: number[];
}
