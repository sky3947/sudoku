import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  // The row index of this row.
  @Input() row: number = 0;

  constructor() { }
}
