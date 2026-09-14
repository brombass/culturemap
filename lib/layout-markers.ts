export interface LaneItem {
  id: number;
  score: number;
}

/**
 * Greedily assigns each marker to lane 0 or 1 so that markers whose scores
 * are close together (within `threshold` points on the 0-100 scale) don't
 * render exactly on top of one another.
 */
export function computeLanes(
  items: LaneItem[],
  threshold = 6,
): Map<number, 0 | 1> {
  const lanes = new Map<number, 0 | 1>();
  const lastScoreByLane: Record<0 | 1, number | null> = { 0: null, 1: null };

  const sorted = [...items].sort((a, b) => a.score - b.score);
  for (const item of sorted) {
    const near0 =
      lastScoreByLane[0] !== null &&
      Math.abs(lastScoreByLane[0] - item.score) < threshold;
    const near1 =
      lastScoreByLane[1] !== null &&
      Math.abs(lastScoreByLane[1] - item.score) < threshold;

    let lane: 0 | 1 = 0;
    if (near0 && !near1) lane = 1;
    else if (!near0 && near1) lane = 0;
    else if (near0 && near1) {
      // both crowded: pick whichever lane's last marker is further away
      lane =
        (lastScoreByLane[0] ?? -Infinity) <= (lastScoreByLane[1] ?? -Infinity)
          ? 1
          : 0;
    }
    lanes.set(item.id, lane);
    lastScoreByLane[lane] = item.score;
  }

  return lanes;
}
