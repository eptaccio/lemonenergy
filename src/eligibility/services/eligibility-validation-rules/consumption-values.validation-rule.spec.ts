import { Test, TestingModule } from '@nestjs/testing';
import { ReasonForIneligibilityEnum } from '../../constants/reason-for-ineligibility.enum';
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

  function buildDto(
    connectionType: ConnectionTypeEnum,
    consumptionHistory: number[],
  ): ProspectEligibilityRequestDto {
    const prospectInfo = {
      tipoDeConexao: connectionType,
      historicoDeConsumo: consumptionHistory,
    } as ProspectEligibilityRequestDto;

    return prospectInfo;
  }

  async function expectValidResult(
    connectionType: ConnectionTypeEnum,
    consumptionHistory: number[],
  ) {
    const result = await consumptionValuesValidationRule.validate(
      buildDto(connectionType, consumptionHistory),
    );
    expect(result.isValid).toBeTruthy();
    expect(result.reason).toBeUndefined();
  }

  async function expectInvalidResult(
    connectionType: ConnectionTypeEnum,
    consumptionHistory: number[],
  ) {
    const result = await consumptionValuesValidationRule.validate(
      buildDto(connectionType, consumptionHistory),
    );
    expect(result.isValid).toBeFalsy();
    expect(result.reason).toEqual(
      ReasonForIneligibilityEnum.CONSUMO_MUITO_BAIXO_PARA_TIPO_DE_CONEXAO,
    );
  }

  describe('when validating MONOFASICO', () => {
    it('should be valid with consumptionHistory (historicoDeConsumo) above minimum required', async () => {
      await expectValidResult(ConnectionTypeEnum.MONOFASICO, [450]);
    });

    it('should be valid with consumptionHistory (historicoDeConsumo) bellow minimum required', async () => {
      await expectInvalidResult(ConnectionTypeEnum.MONOFASICO, [340, 320, 234]);
    });
  });

  describe('when validating BIFASICO', () => {
    it('should be valid with consumptionHistory (historicoDeConsumo) above minimum required', async () => {
      await expectValidResult(ConnectionTypeEnum.BIFASICO, [510, 500]);
    });

    it('should be valid with consumptionHistory (historicoDeConsumo) bellow minimum required', async () => {
      await expectInvalidResult(ConnectionTypeEnum.BIFASICO, [433, 345, 459]);
    });
  });

  describe('when validating TRIFASICO', () => {
    it('should be valid with consumptionHistory (historicoDeConsumo) above minimum required', async () => {
      await expectValidResult(
        ConnectionTypeEnum.TRIFASICO,
        [780, 710, 699, 740, 800, 930, 803, 988],
      );
    });

    it('should be valid with consumptionHistory (historicoDeConsumo) bellow minimum required', async () => {
      await expectInvalidResult(ConnectionTypeEnum.TRIFASICO, [349, 459, 298]);
    });
  });
});
