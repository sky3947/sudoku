import { Injectable } from '@angular/core';
import { Cell, cellValuesEqual, DEFAULT_CELL, DEFAULT_CONCRETE, DEFAULT_NOTES, DEFAULT_VALUE } from './cell';
import { SudokuGeneratorService } from './sudoku-generator.service';
import { positiveMod } from './util';

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
  // The sudoku board.
  board: Cell[][];

  // The hovered cell in the sudoku board.
  hoveredCell?: Cell;

  // Whether or not the user is jotting notes.
  noteMode: boolean = false;

  constructor(private sudokuGeneratorService: SudokuGeneratorService) {
    this.board = sudokuGeneratorService.makeMtBoard();
  }

  /**
   * Checks if the board is empty.
   * 
   * @returns True if the board is empty, false otherwise.
   */
  isBoardMt(): boolean {
    return this.board.every(row => row.every(cell => cellValuesEqual(cell, DEFAULT_CELL)));
  }

  /**
   * Tells the SudokuGeneratorService to make a new sudoku game.
   */
  newGame(): void {
    this.sudokuGeneratorService.newGame(this.board);
  }

  /**
   * Returns the Cell at a given row and column index.
   * 
   * @param row The row index.
   * @param col The column index.
   * @returns The Cell at the given indices.
   */
  getCell(row: number, col: number): Cell {
    return this.board[row][col];
  }

  /**
   * Changes the hovered Cell.
   * 
   * @param hoveredCell The Cell hovered by the player.
   */
  changeHoveredCell(hoveredCell: Cell): void {
    this.hoveredCell = hoveredCell;
  }

  /**
   * Moves the cursor to another Cell in a given direction.
   * 
   * @param dir Direction to move the cursor.
   */
  moveHoveredCell(dir: Direction): void {
    if (typeof this.hoveredCell === 'undefined') {
      this.hoveredCell = this.board[0][0];
      return;
    }

    let rowIndex = this.hoveredCell.row;
    let colIndex = this.hoveredCell.col;
    switch (dir) {
      case Direction.Up: {
        this.hoveredCell = this.board[positiveMod(rowIndex - 1, 9)][colIndex];
        break;
      }
      case Direction.Down: {
        this.hoveredCell = this.board[positiveMod((rowIndex + 1), 9)][colIndex];
        break;
      }
      case Direction.Left: {
        this.hoveredCell = this.board[rowIndex][positiveMod((colIndex - 1), 9)];
        break;
      }
      case Direction.Right: {
        this.hoveredCell = this.board[rowIndex][positiveMod((colIndex + 1), 9)];
        break;
      }
      default: {
        console.error('BoardService: moveHoveredCell: invalid movement direction.');
      }
    }
  }

  /**
   * Toggles note taking mode.
   */
  toggleNoteMode(): void {
    this.noteMode = !this.noteMode;
  }

  /**
   * Make an edit to a cell given an input number.
   * 
   * @param num The number input.
   */
  makeEdit(num: number): void {
    if (typeof this.hoveredCell === 'undefined' || this.hoveredCell.concrete)
      return;

    if (this.noteMode) {
      if (num === 0 || this.hoveredCell.value > 0)
        return;
      this.hoveredCell.notes[num - 1] = !this.hoveredCell.notes[num - 1];
    } else {
      this.hoveredCell.value = num;
      if (num !== 0)
        this.hoveredCell.notes = [...DEFAULT_NOTES];
    }
  }
}
