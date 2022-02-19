import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_CELL } from '../cell';
import { CellService } from '../cell.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Input() concrete: boolean = true;
  value: number = 8;

  constructor(private cellService: CellService) { }

  ngOnInit(): void { }

  changeCell(): void {
    this.cellService.changeCell(
      {
        row: this.row,
        col: this.col,
        value: this.value,
        concrete: this.concrete,
      }
    );
  }

  isSelected(): boolean {
    let selectedCell = this.cellService.hoveredCell;
    if (!selectedCell) {
      selectedCell = DEFAULT_CELL;
    }
    return (selectedCell.row === this.row) && (selectedCell.col === this.col)
  }
}
