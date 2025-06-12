import { formatUnits } from 'viem';

// Format amount with proper decimals
export const formatAmount = (amount: bigint, decimals: number) => {
  return formatUnits(amount, decimals);
};
