import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  bookImgSrc: string = '';
  authorImgSrc: string = '';
  bookName: string = 'Harry potter';
  firstSentence: string = '';
  bookId: string = '';

  // Construct the book details URL
  bookDetailsUrl: string = `https://openlibrary.org/search.json?q=${this.bookName}&fields=key,title,author_name,editions,seeds,isbn,first_sentence`;
  // bockCoverUrl: string = `http://covers.openlibrary.org/b/id/${this.bookId}-${this.coverSize}.jpg?default=false&lang=eng`;

  constructor(private httpClient: HttpClient) {
    this.getBookCover();
  }

  getBookCover() {
    this.httpClient.get(this.bookDetailsUrl).subscribe((res: any) => {
      // console.log(res.docs[0].author_name[0]);
      this.bookName = res.docs[0].title;
      this.firstSentence =
        'first_sentence' in res.docs[0]
          ? res.docs[0].first_sentence
          : 'Unable to load summary currently';
      this.bookId = res.docs[0].isbn[0];
      this.bookImgSrc = `http://covers.openlibrary.org/b/isbn/${this.bookId}-L.jpg?default=false&lang=eng`;

      if ('author_name' in res.docs[0]) {
        this.httpClient
          .get(
            `https://openlibrary.org/search/authors.json?q=${res.docs[0].author_name[0]}`
          )
          .subscribe((res2: any) => {
            this.authorImgSrc = `http://covers.openlibrary.org/a/olid/${res2.docs[0].key}-L.jpg?default=false&lang=eng`;
          });
      }
    });
  }
}
