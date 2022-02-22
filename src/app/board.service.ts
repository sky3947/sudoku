import { Injectable } from '@angular/core';
import { Cell, cellValuesEqual, DEFAULT_CELL, DEFAULT_NOTES } from './cell';

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Cell[][];
  hoveredCell?: Cell;
  noteMode: boolean = false;

  constructor() {
    this.board = this.makeMtBoard();
  }

  /**
   * Creates a new cell with given parameters and returns it.
   * 
   * @param row The row index.
   * @param col The column index.
   * @param value The value in this cell. Defaults to 0.
   * @param concrete Whether or not this value was given (known to be true.)
   *        Defaults to true.
   * @param notes The notes written in this cell. Defaults to an array of nine
   *        elements, filled with false.
   * @returns The new Cell.
   */
  newCell(row: number, col: number, value?: number, concrete?: boolean, notes?: boolean[]): Cell {
    return {
      row: row,
      col: col,
      value: (typeof value === 'undefined' ? 0 : value),
      concrete: (typeof concrete === 'undefined' ? true : concrete),
      notes: (typeof notes === 'undefined' ? [...DEFAULT_NOTES] : notes),
    }
  }

  // TODO: REMOVE AFTER VALID GAME GENERATION
  randomNotes(): boolean[] {
    return Array.from({ length: 9 }, () => Math.random() < .5);
  }

  /**
   * Checks if the board is empty.
   * 
   * @returns True if the board is empty, false otherwise.
   */
  isBoardMt(): boolean {
    return this.board.every(row => row.every(cell => cellValuesEqual(cell, DEFAULT_CELL)));
  }

  makeMtBoard(): Cell[][] {
    let board = new Array(9).fill(DEFAULT_CELL).map(() => new Array(9).fill(DEFAULT_CELL));
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col] = this.newCell(row, col);
      }
    }
    return board
  }

  newGame(): void {
    // TODO: generate new valid game
    console.log(this.board[0][0], this.board[0][1]);
    console.log(this.isBoardMt())
    for (const row of this.board) {
      for (const cell of row) {
        cell.value = Math.floor(Math.random() * 10);
        cell.concrete = false;
        cell.notes = this.randomNotes();
      }
    }
    console.log(this.board[0][0], this.board[0][1]);
    console.log(this.isBoardMt())
  }

  getCell(row: number, col: number): Cell {
    return this.board[row][col];
  }

  changeHoveredCell(hoveredCell: Cell): void {
    this.hoveredCell = hoveredCell;
  }

  positiveMod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  moveHoveredCell(dir: Direction): void {
    if (typeof this.hoveredCell === 'undefined') {
      this.hoveredCell = this.board[0][0];
      return;
    }

    let rowIndex = this.hoveredCell.row;
    let colIndex = this.hoveredCell.col;
    switch (dir) {
      case Direction.Up: {
        this.hoveredCell = this.board[this.positiveMod(rowIndex - 1, 9)][colIndex];
        break;
      }
      case Direction.Down: {
        this.hoveredCell = this.board[this.positiveMod((rowIndex + 1), 9)][colIndex];
        break;
      }
      case Direction.Left: {
        this.hoveredCell = this.board[rowIndex][this.positiveMod((colIndex - 1), 9)];
        break;
      }
      case Direction.Right: {
        this.hoveredCell = this.board[rowIndex][this.positiveMod((colIndex + 1), 9)];
        break;
      }
      default: {
        console.error('BoardService: moveHoveredCell: invalid movement direction.');
      }
    }
  }

  toggleNoteMode(): void {
    this.noteMode = !this.noteMode;
  }

  makeEdit(num: number): void {
    if (typeof this.hoveredCell === 'undefined')
      return;

    if (this.noteMode) {
      if (num === 0)
        return;
      this.hoveredCell.notes[num - 1] = !this.hoveredCell.notes[num - 1];
    } else {
      this.hoveredCell.value = num;
    }
  }
}
