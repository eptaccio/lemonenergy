import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTypeEnum } from '../../constants/connection-type.enum';
import { ProspectEligibilityRequestDto } from '../../dto/prospect-eligibility-calc-request.dto';
import { ConsumptionCalcsHelper } from '../../helpers/consumption-calcs.helper';
import { ConsumptionValuesValidationRule } from './consumption-values.validation-rule';

describe('ConsumptionValuesValidationRule', () => {
  let consumptionValuesValidationRule: ConsumptionValuesValidationRule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionValuesValidationRule, ConsumptionCalcsHelper],
    }).compile();

    consumptionValuesValidationRule = app.get<ConsumptionValuesValidationRule>(
      ConsumptionValuesValidationRule,
    );
  });

  describe('when validating MONOFASICO', () => {
    it('should be valid with consumptionHistory (historicoDeConsumo) above minimum required', async () => {
      const prospectInfo = {
        tipoDeConexao: ConnectionTypeEnum.MONOFASICO,
        historicoDeConsumo: [450],
      } as ProspectEligibilityRequestDto;

      const result = await consumptionValuesValidationRule.validate(
        prospectInfo,
      );
      expect(result.isValid).toBeTruthy();
      expect(result.reason).toBeUndefined();
    });
  });
});
