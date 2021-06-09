import numeral from 'numeral';
import { chainConfig } from '@configs';

/**
 * Helper Function to converts Denom to display depending on the exponent given
 * @param denom The denom you wish to convert to
 * @param value The value in base denom value
 */
export const formatDenom = (value: number | string, denom = chainConfig.display) => {
  let results = 0;
  const [selectedDenom] = chainConfig.denomUnits.filter((x) => x.denom === denom);
  if (!selectedDenom) {
    return results;
  }

  if (typeof value === 'string') {
    value = numeral(value).value() as number;
  }

  // if udaric is less than one edgecase
  if (value < 1) {
    value = 0;
  }

  const ratio = 10 ** selectedDenom.exponent;
  results = value / ratio;

  return results;
};
