import { Injectable } from '@angular/core';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class CellService {
  hoveredCell?: Cell;

  constructor() { }

  changeCell(hoveredCell: Cell): void {
    this.hoveredCell = hoveredCell;
  }
}
