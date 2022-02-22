import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  // The current active modal.
  activeModal?: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private boardService: BoardService,
    ) { }

  /**
   * Opens a centered modal with given content.
   * 
   * @param content The modal content to display.
   */
  openCenteredModal(content: TemplateRef<any>): void {
    this.activeModal = this.modalService.open(content, { centered: true });
  }

  /**
   * Closes the 'new game' modal and asks the BoardService to make a new game.
   * 
   * @param result The modal close result.
   */
  newGame(result: string): void {
    if (this.activeModal) {
      this.activeModal.close(result);
    }
    this.boardService.newGame();
  }
}
