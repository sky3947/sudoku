import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Cell, DEFAULT_CELL } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  // The row and column indices of this Cell.
  @Input() row: number = 0;
  @Input() col: number = 0;

  // This Cell's information.
  cell!: Cell;

  constructor(
    private boardService: BoardService,
    ) { }

  ngOnInit(): void {
    // Acquire Cell information.
    this.cell = this.boardService.getCell(this.row, this.col);
  }

  /**
   * Asks the BoardService to change the hovered cell to this.
   */
  changeHoveredCell(): void {
    this.boardService.changeHoveredCell(this.cell);
  }

  /**
   * Checks if this Cell is hovered.
   * 
   * @returns True if this Cell is hovered. False otherwise.
   */
  isHovered(): boolean {
    let selectedCell = this.boardService.hoveredCell;
    if (!selectedCell) {
      selectedCell = DEFAULT_CELL;
    }
    return (selectedCell.row === this.row) && (selectedCell.col === this.col);
  }

  /**
   * Checks if this Cell's value is the same as the hovered Cell's value.
   * 
   * @returns True if this Cell's value is the same as the hovered Cell's
   *          value. False otherwise.
   */
  isSameValueHovered(): boolean {
    let selectedCell = this.boardService.hoveredCell;
    if (!selectedCell) {
      selectedCell = DEFAULT_CELL;
    }
    return (selectedCell.value > 0 && selectedCell.value === this.cell.value);
  }

  /**
   * Checks if the player is editing notes.
   * 
   * @returns True if the player is editing notes. False otherwise.
   */
  isNoteMode(): boolean {
    return this.boardService.noteMode;
  }
}
