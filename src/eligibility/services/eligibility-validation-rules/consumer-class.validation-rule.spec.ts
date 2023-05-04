import { Test } from '@nestjs/testing';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import { ConsumerClassValidationRule } from './consumer-class.validation-rule';
import { ConsumerClassEnum } from '../../constants/consumer-class.enum';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';

function buildDto(
  consumerClass: ConsumerClassEnum,
): ProspectEligibilityRequestDto {
  return {
    classeDeConsumo: consumerClass,
  } as ProspectEligibilityRequestDto;
}

describe('ConsumerClassValidationRule', () => {
  let consumerClassValidationRule: ConsumerClassValidationRule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [ConsumerClassValidationRule],
    }).compile();

    consumerClassValidationRule = app.get<ConsumerClassValidationRule>(
      ConsumerClassValidationRule,
    );
  });

  describe('when validating consumer class (classe de consumo)', () => {
    describe('with valid consumer class', () => {
      const validConsumerClasses = [
        ConsumerClassEnum.COMERCIAL,
        ConsumerClassEnum.RESIDENCIAL,
        ConsumerClassEnum.INDUSTRIAL,
      ];

      it('should be valid', async () => {
        for (const validConsumerClass of validConsumerClasses) {
          const result = await consumerClassValidationRule.validate(
            buildDto(validConsumerClass)
          );
          expect(result.isValid).toBeTruthy();
          expect(result.reason).toBeUndefined();
        }
      });
    });

    describe('with invalid consumer class', () => {
      const invalidConsumerClasses = [
        ConsumerClassEnum.PODER_PUBLICO,
        ConsumerClassEnum.RURAL,
      ];

      it('should be invalid', async () => {
        for (const invalidConsumerClass of invalidConsumerClasses) {
          const result = await consumerClassValidationRule.validate(
            buildDto(invalidConsumerClass)
          );
          expect(result.isValid).toBeFalsy();
          expect(result.reason).toEqual(
            ReasonsForIneligibilityEnum.CLASSE_DE_CONSUMO_NAO_ACEITA,
          );
        }
      });
    });
  });
});
