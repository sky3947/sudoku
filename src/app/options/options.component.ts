import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  activeModal?: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  openCenteredModal(content: TemplateRef<any>): void {
    this.activeModal = this.modalService.open(content, { centered: true });
  }

  newGame(result: string): void {
    if (this.activeModal) {
      this.activeModal.close(result);
    }
    console.log('time to make new game');
  }
}
