import * as Immutable from 'immutable';
import { merge, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export interface DataSourceStatusFetchChangeOrigin {
  predicate: boolean;
  reset: boolean;
  page: boolean;
}

export interface PagedDataSourceStatus {
  fetching: boolean;
  fetchingPage: boolean;
  end: boolean;
  empty: boolean;
  previousCancelled: boolean;
  fetchOriginChange: DataSourceStatusFetchChangeOrigin;
}

export interface PagedDataSourceConstructorOptions<T, S> {
  pageSize: number;
  fetch: (page: PageEvent, predicate: Partial<S>) => Observable<T[]>;
}

export interface PageEvent {
  page: number;
  size: number;
}

export interface FetchOptions {
  fetch: boolean;
}

export class PagedDataSource<T = any, S = any> {
  // tslint:disable-next-line:max-line-length
  static readonly INITIAL_STATUS = PagedDataSource.createInitialDataSourceStatus();

  private items: T[] = [];
  private items$ = new ReplaySubject<T[]>(1);
  private predicate = Immutable.Map<string, any>();
  private predicate$ = new Subject<Immutable.Map<string, any>>();
  private page = 1;
  private stagedPage = 1;
  private refreshed = false;
  private page$ = new Subject<PageEvent>();
  private changes$ = new ReplaySubject<PagedDataSourceStatus>(1);
  private error$ = new Subject<Error>();
  private isLastPage = false;
  private isFetching = false;
  private previousCancelled = false;
  private isFetchingPage = false;
  private pageSize: number;
  private fetchChangeOrigin = this.getFetchChangeOrigin({});
  private fetch: (page: PageEvent, predicate: Partial<S>) => Observable<T[]>;

  constructor({ pageSize, fetch }: PagedDataSourceConstructorOptions<T, S>) {
    this.fetch = fetch;
    this.pageSize = pageSize;

    const predicate$ = this.predicate$.pipe(
      tap(predicate => {
        this.isLastPage = false;
        this.predicate = predicate;
        this.page = 1;
        this.items = [];
      }),
      map(predicate => ({ predicate, page: this.createPageEvent() }))
    );

    const page$ = this.page$.pipe(
      map(page => ({ predicate: this.predicate, page }))
    );

    merge(predicate$, page$)
      .pipe(
        tap(() => {
          if (this.isFetching) {
            this.previousCancelled = true;
          }
          this.isFetching = true;
          this.notifyChanges();
        }),
        switchMap(({ predicate, page }) =>
          this.fetch(page, predicate.toJS() as Partial<S>)
        ),
        catchError((err: Error) => {
          this.error$.next(err);
          return throwError(err);
        })
      )
      .subscribe(
        items => {
          if (this.refreshed) {
            this.page = this.stagedPage;
            this.refreshed = false;
          }

          this.fetchChangeOrigin = this.getFetchChangeOrigin({});
          this.isFetching = false;
          this.isFetchingPage = false;
          this.previousCancelled = false;
          this.isLastPage = items.length < pageSize;

          this.setItems(this.items.concat(items));

          this.notifyChanges();
        },
        () => {}
      );
  }

  private static createInitialDataSourceStatus(): PagedDataSourceStatus {
    return {
      fetching: false,
      fetchingPage: false,
      end: false,
      empty: false,
      previousCancelled: false,
      fetchOriginChange: {
        predicate: false,
        reset: false,
        page: false
      }
    };
  }

  onItems(): Observable<T[]> {
    return this.items$.asObservable();
  }

  onChanges(): Observable<PagedDataSourceStatus> {
    return this.changes$.asObservable();
  }

  onError(): Observable<Error> {
    return this.error$.asObservable();
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.goToPage(this.page + 1);
    }
  }

  goToPage(page: number, pageSize?: number): void {
    if (!this.isFetching) {
      this.page = page;
      this.isFetchingPage = true;
      this.fetchChangeOrigin = this.getFetchChangeOrigin({ page: true }, true);
      this.notifyPage(pageSize);
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  getCurrentPage(): number {
    return this.page;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  where(
    predicate: Partial<S>,
    { fetch }: FetchOptions = { fetch: true }
  ): void {
    this.predicate = this.predicate.merge(predicate as any);
    if (fetch) {
      this.fetchChangeOrigin = this.getFetchChangeOrigin({ predicate: true });
      this.notifyPredicate();
    }
  }

  removePredicateElement(
    predicateElement: string,
    { fetch }: FetchOptions = { fetch: true }
  ): void {
    this.predicate = this.predicate.delete(predicateElement);
    if (fetch) {
      this.fetchChangeOrigin = this.getFetchChangeOrigin({ predicate: true });
      this.notifyPredicate();
    }
  }

  getPredicate(): Partial<S> {
    return this.predicate.toJS() as Partial<S>;
  }

  getItems(): T[] {
    return this.items;
  }

  setItems(items: T[]): void {
    this.items = items;
    this.notifyItems();
  }

  fetchCurrentPage(): void {
    this.items = [];
    this.goToPage(this.page);
  }

  refresh(): void {
    this.refreshed = true;
    this.stagedPage = this.page;
    this.items = [];
    this.goToPage(1, this.page * this.pageSize);
  }

  reset({ fetch }: FetchOptions = { fetch: true }): void {
    this.page = 1;
    this.predicate = Immutable.Map<string, any>();
    this.isLastPage = false;
    this.items = [];
    this.isFetching = false;
    this.isFetchingPage = false;
    this.previousCancelled = false;

    this.fetchChangeOrigin = this.getFetchChangeOrigin({ reset: true });
    if (fetch) {
      this.fetchCurrentPage();
    } else {
      this.notifyChanges();
    }
  }

  private createPageEvent(size?: number): PageEvent {
    return {
      page: this.page,
      size: size || this.pageSize
    };
  }

  private notifyPredicate(): void {
    this.predicate$.next(this.predicate);
  }

  private notifyPage(size?: number): void {
    this.page$.next(this.createPageEvent(size));
  }

  private notifyItems(): void {
    this.items$.next(this.items.slice());
  }

  private notifyChanges(): void {
    this.changes$.next(this.getCurrentStatus());
  }

  private getCurrentStatus(): PagedDataSourceStatus {
    return {
      fetching: this.isFetching,
      fetchingPage: this.isFetchingPage,
      fetchOriginChange: this.fetchChangeOrigin,
      end: this.isLastPage,
      empty: this.isLastPage && this.items.length === 0,
      previousCancelled: this.previousCancelled
    };
  }

  private getFetchChangeOrigin(
    origin: Partial<DataSourceStatusFetchChangeOrigin>,
    mergeWithCurrent?: boolean
  ): DataSourceStatusFetchChangeOrigin {
    const current = mergeWithCurrent ? this.fetchChangeOrigin : {};
    return {
      predicate: false,
      reset: false,
      page: false,
      ...current,
      ...origin
    };
  }
}
