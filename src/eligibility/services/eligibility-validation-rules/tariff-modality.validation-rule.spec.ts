import { Test } from '@nestjs/testing';
import { TariffModalityValidationRule } from './tariff-modality.validation-rule';
import { TariffModalityEnum } from '../../constants/tariff-modality.enum';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';

function buildDto(
  tariffModality: TariffModalityEnum,
): ProspectEligibilityRequestDto {
  return {
    modalidadeTarifaria: tariffModality,
  } as ProspectEligibilityRequestDto;
}

describe('TariffModalityValidationRule', () => {
  let tariffModalityValidationRule: TariffModalityValidationRule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [TariffModalityValidationRule],
    }).compile();

    tariffModalityValidationRule = app.get<TariffModalityValidationRule>(
      TariffModalityValidationRule,
    );
  });

  describe('when validating tariff modality (modalidate tarifaria)', () => {
    describe('with valid tariff modalities', () => {
      const validTariffModalities = [
        TariffModalityEnum.CONVENCIONAL,
        TariffModalityEnum.BRANCA,
      ];

      it('should be valid', async () => {
        for (const validTariffModality of validTariffModalities) {
          const result = await tariffModalityValidationRule.validate(
            buildDto(validTariffModality),
          );
          expect(result.isValid).toBeTruthy();
          expect(result.reason).toBeUndefined();
        }
      });
    });

    describe('with invalid tariff modalities', () => {
      const validTariffModalities = [
        TariffModalityEnum.AZUL,
        TariffModalityEnum.VERDE,
      ];

      it('should be invalid', async () => {
        for (const validTariffModality of validTariffModalities) {
          const result = await tariffModalityValidationRule.validate(
            buildDto(validTariffModality),
          );
          expect(result.isValid).toBeFalsy();
          expect(result.reason).toEqual(
            ReasonForIneligibilityEnum.MODALIDADE_TARIFARIA_NAO_ACEITA,
          );
        }
      });
    });
  });
});
