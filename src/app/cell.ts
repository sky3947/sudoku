/**
 * The Notes interface stores which numbers the player thinks a certain cell
 * could have.
 */
 export interface Notes {
  one: boolean;
  two: boolean;
  thr: boolean;
  fou: boolean;
  fiv: boolean;
  six: boolean;
  sev: boolean;
  eig: boolean;
  nin: boolean;
}

export const DEFAULT_NOTES: Notes = {
  one: false,
  two: false,
  thr: false,
  fou: false,
  fiv: false,
  six: false,
  sev: false,
  eig: false,
  nin: false,
}

/**
 * The Cell interface stores information about a cell in a sudoku puzzle. A
 * Cell has a row and a column to represent its position. A Cell has a concrete
 * bool to represent whether or not the value was given. The Notes represents
 * which numbers the player has noted down in the cell.
 */
export interface Cell {
  row: number;
  col: number;
  value: number;
  concrete: boolean;
  notes: Notes;
}

export const DEFAULT_CELL: Cell = {
  row: -1,
  col: -1,
  value: 0,
  concrete: true,
  notes: DEFAULT_NOTES,
}