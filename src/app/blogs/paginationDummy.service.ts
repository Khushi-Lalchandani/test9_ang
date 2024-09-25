import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { responseData } from './blogs.service';

@Injectable({ providedIn: 'root' })
export class PaginationDummyService {
  private totalItems = 100;
  getItems(
    page = 1,
    itemsPerPage = 10,
    array: responseData[]
  ): Observable<responseData[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex * itemsPerPage;
    const items: responseData[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.totalItems) {
        items.push(array[i]);
      }
    }
    return of(items).pipe(delay(500));
  }
  constructor() {}
}
