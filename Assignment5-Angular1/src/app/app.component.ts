import { Component, OnInit } from '@angular/core';
import {Note} from './note';
import {NotesService} from './notes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;

  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private notesService: NotesService) {
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => this.handleErrorResponse(err)
    );
  }
  takeNotes() {
    this.errMessage = '';
    if (!this.note.title || !this.note.text ) {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => {},
        err => this.handleErrorResponse(err)
      );
    }
    this.note = new Note();
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
    } else {
      this.errMessage = 'An error occurred:' + error.error.message;
    }
  }
}
