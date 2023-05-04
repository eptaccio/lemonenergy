import { Test } from '@nestjs/testing';
import { TariffModalityValidationRule } from './tariff-modality.validation-rule';
import { TariffModalitiesEnum } from '../../constants/tax-modalities.enum';
import { CustomerEligibilityRequestDto } from '../../dto/customer-eligibility-calc-request.dto';
import { ReasonsForIneligibilityEnum } from '../../constants/reasons-for-ineligibility.enum';

function buildDto(
  tariffModality : TariffModalitiesEnum,
): CustomerEligibilityRequestDto {
  return {
    modalidadeTarifaria: tariffModality ,
  } as CustomerEligibilityRequestDto;
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
        TariffModalitiesEnum.CONVENCIONAL,
        TariffModalitiesEnum.BRANCA
      ];

      it('should be valid', async () => {
        for (const validTariffModality of validTariffModalities) {
          const result = await tariffModalityValidationRule.validate(
            buildDto(validTariffModality)
          );
          expect(result.isValid).toBeTruthy();
          expect(result.reason).toBeUndefined();
        }
      });
    });

    describe('with invalid tariff modalities', () => {
      const validTariffModalities = [
        TariffModalitiesEnum.AZUL,
        TariffModalitiesEnum.VERDE,
      ];

      it('should be invalid', async () => {
        for (const validTariffModality of validTariffModalities) {
          const result = await tariffModalityValidationRule.validate(
            buildDto(validTariffModality)
          );
          expect(result.isValid).toBeFalsy();
          expect(result.reason).toEqual(
            ReasonsForIneligibilityEnum.MODALIDADE_TARIFARIA_NAO_ACEITA
          );
        }
      });
    });
  });
});
