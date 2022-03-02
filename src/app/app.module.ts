import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { RowComponent } from './row/row.component';
import { CellComponent } from './cell/cell.component';
import { OptionsComponent } from './options/options.component';
import { AutoNotesModalComponent } from './auto-notes-modal/auto-notes-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RowComponent,
    CellComponent,
    OptionsComponent,
    AutoNotesModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
