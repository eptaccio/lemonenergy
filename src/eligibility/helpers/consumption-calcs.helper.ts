import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumptionCalcsHelper {

  public calcAverageConsumption(
    consumptionHistory: number[],
  ) {
    const sum = consumptionHistory.reduce((prev, curr) => prev + curr, 0);
    const avg = sum / consumptionHistory.length || 0;
    return avg;
  }

  public calcCO2AnnualSaving (yearAverageConsumption: number) {
    const CO2_SAVING_PROPORTION_IN_ONE_YEAR = 0.084;
    const annualCO2Savings = Math.round(yearAverageConsumption * CO2_SAVING_PROPORTION_IN_ONE_YEAR * 1200) / 100;
    return annualCO2Savings;
  }
}