import { Test } from '@nestjs/testing';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import { TariffClassValidationRule } from './tariff-class.validation-rule';
import { TariffClassEnum } from '../../constants/tariff-class.enum';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';

function buildDto(tariffClass: TariffClassEnum): ProspectEligibilityRequestDto {
  return {
    classeDeConsumo: tariffClass,
  } as ProspectEligibilityRequestDto;
}

describe('TariffClassValidationRule', () => {
  let tariffClassValidationRule: TariffClassValidationRule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [TariffClassValidationRule],
    }).compile();

    tariffClassValidationRule = app.get<TariffClassValidationRule>(
      TariffClassValidationRule,
    );
  });

  describe('when validating consumer class (classe de consumo)', () => {
    describe('with valid consumer class', () => {
      const validTariffClasses = [
        TariffClassEnum.COMERCIAL,
        TariffClassEnum.RESIDENCIAL,
        TariffClassEnum.INDUSTRIAL,
      ];

      it('should be valid', async () => {
        for (const validTariffClass of validTariffClasses) {
          const result = await tariffClassValidationRule.validate(
            buildDto(validTariffClass),
          );
          expect(result.isValid).toBeTruthy();
          expect(result.reason).toBeUndefined();
        }
      });
    });

    describe('with invalid consumer class', () => {
      const invalidTariffClasses = [
        TariffClassEnum.PODER_PUBLICO,
        TariffClassEnum.RURAL,
      ];

      it('should be invalid', async () => {
        for (const invalidTariffClass of invalidTariffClasses) {
          const result = await tariffClassValidationRule.validate(
            buildDto(invalidTariffClass),
          );
          expect(result.isValid).toBeFalsy();
          expect(result.reason).toEqual(
            ReasonForIneligibilityEnum.CLASSE_DE_CONSUMO_NAO_ACEITA,
          );
        }
      });
    });
  });
});
