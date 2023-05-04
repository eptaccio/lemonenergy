import { TariffClassValidationRule } from './tariff-class.validation-rule';
import { ConsumptionValuesValidationRule } from './consumption-values.validation-rule';
import { TariffModalityValidationRule } from './tariff-modality.validation-rule';
import { BaseValidationRule } from './abstract-base-validation-rule';

export const ValidationRules: (typeof BaseValidationRule)[] = [
  TariffClassValidationRule,
  ConsumptionValuesValidationRule,
  TariffModalityValidationRule
];
