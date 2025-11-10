import { useMemo } from 'react';
import { TIERS } from '../constants';
import type { UserTier } from '../types';

export const useCurrentTier = (userTier: UserTier | undefined) => {
  return useMemo(() => {
    if (!userTier) return TIERS[TIERS.length - 1];
    return (
      TIERS.find(
        (t) =>
          userTier.userRatingPoint >= t.min &&
          (t.max === undefined || userTier.userRatingPoint <= t.max),
      ) ?? TIERS[TIERS.length - 1]
    );
  }, [userTier]);
};
