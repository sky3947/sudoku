import { Component, HostListener } from '@angular/core';
import { Direction } from './board.service';
import { CONTROLS, ControlsService } from './controls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudoku';

  constructor(private controlsService: ControlsService) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      // Movement: up.
      case CONTROLS.Up:
      case CONTROLS.Up2:
      case CONTROLS.Up3: {
        (document.activeElement as HTMLElement).blur();
        this.controlsService.moveHoveredCell(Direction.Up);
        break;
      }

      // Movement: left.
      case CONTROLS.Left:
      case CONTROLS.Left2:
      case CONTROLS.Left3: {
        (document.activeElement as HTMLElement).blur();
        this.controlsService.moveHoveredCell(Direction.Left);
        break;
      }

      // Movement: down.
      case CONTROLS.Down:
      case CONTROLS.Down2:
      case CONTROLS.Down3: {
        (document.activeElement as HTMLElement).blur();
        this.controlsService.moveHoveredCell(Direction.Down);
        break;
      }

      // Movement: right.
      case CONTROLS.Right:
      case CONTROLS.Right2:
      case CONTROLS.Right3: {
        (document.activeElement as HTMLElement).blur();
        this.controlsService.moveHoveredCell(Direction.Right);
        break;
      }

      // Toggle note taking mode.
      case CONTROLS.ToggleNoteMode:
      case CONTROLS.ToggleNoteMode2: {
        this.controlsService.toggleNoteMode();
        break;
      }

      // Automatically generate notes.
      case CONTROLS.AutoNotes: {
        this.controlsService.showAutoNotesModal();
        break;
      }

      // Cell editing.
      case CONTROLS.None:
      case CONTROLS.None2:
      case CONTROLS.None3: {
        this.controlsService.makeEdit(0);
        break;
      }
      case CONTROLS.One: {
        this.controlsService.makeEdit(1);
        break;
      }
      case CONTROLS.Two: {
        this.controlsService.makeEdit(2);
        break;
      }
      case CONTROLS.Three: {
        this.controlsService.makeEdit(3);
        break;
      }
      case CONTROLS.Four: {
        this.controlsService.makeEdit(4);
        break;
      }
      case CONTROLS.Five: {
        this.controlsService.makeEdit(5);
        break;
      }
      case CONTROLS.Six: {
        this.controlsService.makeEdit(6);
        break;
      }
      case CONTROLS.Seven: {
        this.controlsService.makeEdit(7);
        break;
      }
      case CONTROLS.Eight: {
        this.controlsService.makeEdit(8);
        break;
      }
      case CONTROLS.Nine: {
        this.controlsService.makeEdit(9);
        break;
      }
    }
  }
}
