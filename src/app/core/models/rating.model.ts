export interface Rating {
  score: AllowedScore;
  comment?: string;
}

export type AllowedScore = 1 | 2 | 3 | 4 | 5;