import { Component } from '@angular/core';
import { ControlsService } from '../controls.service';

@Component({
  selector: 'app-mobile-controls',
  templateUrl: './mobile-controls.component.html',
  styleUrls: ['./mobile-controls.component.css']
})
export class MobileControlsComponent {
  constructor(private controlsService: ControlsService) { }

  /**
   * Asks the ControlsService to make an edit with an input number.
   * 
   * @param num The number input.
   */
  makeEdit(num: number): void {
    this.controlsService.makeEdit(num);
  }

  /**
   * Asks the ControlsService to toggle note taking mode.
   */
  toggleNoteMode(): void {
    this.controlsService.toggleNoteMode();
  }

  /**
   * Open the confirmation modal for generating automatic notes.
   */
  showAutoNotesModal(): void {
    this.controlsService.showAutoNotesModal();
  }
}
