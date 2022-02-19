export interface Cell {
  row: number;
  col: number;
  value: number;
  concrete: boolean;
}

export const DEFAULT_CELL: Cell = {
  row: -1,
  col: -1,
  value: -1,
  concrete: true,
}