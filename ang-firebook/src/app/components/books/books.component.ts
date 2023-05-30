import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBookComponent } from 'src/app/modal/edit-book/edit-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: BookService, private modal: NgbModal) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((res: IBook[]) => {
      this.books = res;
    });
  }

  editModal(book: IBook) {
    const modalRef = this.modal.open(EditBookComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    // Kirjan id otetaan talteen
    modalRef.componentInstance.id = book.id;
  }

  deleteBook(book: IBook) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.bookService
        .deleteBook(book)
        .then(() => console.log('delete successful'));
    }
  }
}
