import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionCalcsHelper } from './consumption-calcs.helper';

describe('ConsumptionCalcsHelper', () => {
  let calcHelper: ConsumptionCalcsHelper;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionCalcsHelper],
    }).compile();

    calcHelper = app.get<ConsumptionCalcsHelper>(ConsumptionCalcsHelper);
  });

  describe('calcAverageConsumption', () => {
    it('should return the avg from consumption history', () => {
      expect(calcHelper.calcAverageConsumption([])).toBe(0);
      expect(calcHelper.calcAverageConsumption([500, 540, 445, 634, 449])).toBe(
        513.6,
      );
    });
  });

  describe('calcCO2AnnualSaving', () => {
    it('should return the calculated CO2 saving projection', () => {
      const consumptionHistory = [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ];
      const yearAvgConsumption =
        calcHelper.calcAverageConsumption(consumptionHistory);
      const expectedCO2Saving = 5553.24;
      expect(calcHelper.calcCO2AnnualSaving(yearAvgConsumption)).toBe(
        expectedCO2Saving,
      );
    });
  });
});
