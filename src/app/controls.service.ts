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

  toggleNoteMode(): void {
    this.boardService.toggleNoteMode();
  }

  moveHoveredCell(dir: Direction): void {
    this.boardService.moveHoveredCell(dir);
  }

  makeEdit(num: number): void {
    this.boardService.makeEdit(num);
  }
}