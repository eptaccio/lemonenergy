import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityService } from './eligibility.service';
import { EligibilityRulesValidatorService } from './eligibility-rules-validator.service';
import { ProspectEligibilityRequestDto } from '../dto/prospect-eligibility-calc-request.dto';
import { ConsumptionCalcsHelper } from '../helpers/consumption-calcs.helper';
import { ValidationRules } from './eligibility-validation-rules';

describe('EligibilityService', () => {
  let eligibilityService: EligibilityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        EligibilityService,
        EligibilityRulesValidatorService,
        ConsumptionCalcsHelper,
        ...ValidationRules
      ],
    }).compile();

    eligibilityService = app.get<EligibilityService>(EligibilityService);
  });

  describe('when analyzing a prospect with all pre-requisites', () => {
    const prospectEligibilityRequest = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [
        3878,
        9760,
        5976,
        2797,
        2481,
        5731,
        7538,
        4392,
        7859,
        4160,
        6941,
        4597
      ]
    } as ProspectEligibilityRequestDto

    it('should return a positive response with CO2 saving projection', async () => {
      const expectedResponse = {
        elegivel: true,
        economiaAnualDeCO2: 5553.24,
      }
      const result = await eligibilityService.analyzeProspect(prospectEligibilityRequest)
      expect(result).toEqual(expectedResponse)
    })
  });
});
