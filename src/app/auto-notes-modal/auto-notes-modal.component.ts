import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlsService } from '../controls.service';

@Component({
  selector: 'app-auto-notes-modal',
  templateUrl: './auto-notes-modal.component.html',
  styleUrls: ['./auto-notes-modal.component.css']
})
export class AutoNotesModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private controlsService: ControlsService,
  ) { }

  /**
   * Asks the ControlsService to automatically generate notes and closes the
   * active modal.
   * 
   * @param result The modal close result.
   */
  autoNotes(result: string): void {
    this.activeModal.close(result);
    this.controlsService.autoNotes();
  }
}
