/**
 * The Notes interface stores which numbers the player thinks a certain cell
 * could have. The note for N is stored in index N-1.
 */
export const DEFAULT_NOTES: boolean[] = Array(9).fill(false);

export const notesEqual = (a: boolean[], b: boolean[]): boolean => {
  return (
    a.length === 9 && a.length === b.length &&
    a.every((value, index) => value === b[index])
  );
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
  notes: boolean[];
}

export const DEFAULT_VALUE: number = 0;

export const DEFAULT_CONCRETE: boolean = false;

export const DEFAULT_CELL: Cell = {
  row: -1,
  col: -1,
  value: DEFAULT_VALUE,
  concrete: DEFAULT_CONCRETE,
  notes: [...DEFAULT_NOTES],
}

export const cellValuesEqual = (a: Cell, b: Cell): boolean => {
  return (
    a.value === b.value && a.concrete === b.concrete &&
    notesEqual(a.notes, b.notes)
  );
}