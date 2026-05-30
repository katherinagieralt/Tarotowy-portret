export const ACTIVE_SEO_BATCH = 0;

export function getCombinationSeoBatch(isPartner: boolean, posKey: string): number {
  if (isPartner) {
    switch (posKey) {
      case 'p1': case 'p2': case 'p3': case 'p4': return 4;
      case 'p5': case 'p6': case 'p7': case 'p8': return 5;
      default: return 5;
    }
  } else {
    switch (posKey) {
      case 'p1': case 'p4': case 'p6': return 0;
      case 'p2': case 'p3': case 'p5': case 'p7': return 1;
      case 'p8': case 'p9': case 'p10': case 'p11': case 'p12': return 2;
      case 'p13': case 'p14': case 'p15': case 'p17': case 'p18': return 3;
      default: return 3;
    }
  }
}

export function isContentIndexable(batch: number): boolean {
  return batch <= ACTIVE_SEO_BATCH;
}
