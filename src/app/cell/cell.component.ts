import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Cell, DEFAULT_CELL } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() row: number = 0;
  @Input() col: number = 0;
  cell!: Cell;

  constructor(
    private boardService: BoardService,
    ) { }

  ngOnInit(): void {
    this.cell = this.boardService.getCell(this.row, this.col);
  }

  changeCell(): void {
    this.boardService.changeHoveredCell(this.cell);
  }

  isSelected(): boolean {
    let selectedCell = this.boardService.hoveredCell;
    if (!selectedCell) {
      selectedCell = DEFAULT_CELL;
    }
    return (selectedCell.row === this.row) && (selectedCell.col === this.col);
  }

  isNoteMode(): boolean {
    return this.boardService.noteMode;
  }
}
