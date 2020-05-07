export type Stage = {
    name: string;
    color: string;
    moves: string;
    time: number;
    count: number;
  }

export type StageAvg = {
  name: string;
  time: number;
}

export type Solve = {
  stages: Stage[];
  starting_time: number;
  scramble: string;
}
