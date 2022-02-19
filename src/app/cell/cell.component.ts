import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() column?: number;
  @Input() concrete?: boolean;
  value: number = 8;

  constructor() { }

  ngOnInit(): void {
  }

}
