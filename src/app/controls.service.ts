import { Injectable } from '@angular/core';
import { BoardService, Direction } from './board.service';

export const CONTROLS = {
  // Movement controls.
  'Up': 'w',
  'Up2': 'k',
  'Up3': 'ArrowUp',

  'Down': 's',
  'Down2': 'j',
  'Down3': 'ArrowDown',

  'Left': 'a',
  'Left2': 'h',
  'Left3': 'ArrowLeft',

  'Right': 'd',
  'Right2': 'l',
  'Right3': 'ArrowRight',

  // Toggle note taking mode.
  'ToggleNoteMode': 'e',
  'ToggleNoteMode2': 'Enter',

  // Editing controls.
  'None': '0',
  'None2': ' ',
  'None3': 'Backspace',
  'One': '1',
  'Two': '2',
  'Three': '3',
  'Four': '4',
  'Five': '5',
  'Six': '6',
  'Seven': '7',
  'Eight': '8',
  'Nine': '9',
}

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  constructor(private boardService: BoardService) { }

  /**
   * Asks the BoardService to toggle note taking mode.
   */
  toggleNoteMode(): void {
    this.boardService.toggleNoteMode();
  }

  /**
   * Asks the BoardService to move the cursor to another Cell in a given
   * direction.
   * 
   * @param dir The direction to move the cursor.
   */
  moveHoveredCell(dir: Direction): void {
    this.boardService.moveHoveredCell(dir);
  }

  /**
   * Asks the BoardService to make an edit with an input number.
   * 
   * @param num The number input.
   */
  makeEdit(num: number): void {
    this.boardService.makeEdit(num);
  }
}