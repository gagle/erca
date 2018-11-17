import { Observable, ReplaySubject } from 'rxjs';
import { PagedDataSource, PagedDataSourceStatus } from './paged-data-source';

export interface PagedViewStatus extends PagedDataSourceStatus {
  fetchEnabled: boolean;
  firstFetch: boolean;
  emptyTemplateVisible: boolean;
  fetchingTemplateVisible: boolean;
}

export class PagedViewStatusStore {
  private status = this.getCurrentStatus();
  private status$ = new ReplaySubject<PagedViewStatus>(1);
  private awaitingFirstFetch = true;
  private awaitingFirstFetchFinish = false;

  public constructor(dataSource: PagedDataSource) {
    dataSource.onChanges().subscribe(dataSourceStatus => {
      this.status = this.getCurrentStatus(dataSourceStatus);

      if (dataSourceStatus.fetchOriginChange.reset) {
        this.awaitingFirstFetch = true;
        this.awaitingFirstFetchFinish = false;
      }

      if (this.status.firstFetch) {
        this.awaitingFirstFetch = false;
        this.awaitingFirstFetchFinish = true;
      }
      if (this.awaitingFirstFetchFinish && !this.status.fetching) {
        this.awaitingFirstFetchFinish = false;
      }

      this.status.fetchEnabled =
        this.status.fetchEnabled && !this.awaitingFirstFetchFinish;

      this.notifyStatus();
    });
  }

  public onStatus(): Observable<PagedViewStatus> {
    return this.status$.asObservable();
  }

  private getCurrentStatus(
    status: PagedDataSourceStatus = PagedDataSource.INITIAL_STATUS
  ): PagedViewStatus {
    const firstFetch =
      status.fetching &&
      this.awaitingFirstFetch &&
      !this.awaitingFirstFetchFinish;
    return {
      fetching: status.fetching,
      fetchingPage: status.fetchingPage,
      empty: status.empty,
      end: status.end,
      previousCancelled: status.previousCancelled,
      fetchOriginChange: status.fetchOriginChange,
      fetchEnabled: !status.fetching && !status.end && !this.awaitingFirstFetch,
      firstFetch,
      emptyTemplateVisible:
        status.empty || (status.fetching && this.status.empty),
      fetchingTemplateVisible:
        status.fetching && (firstFetch || !status.fetchingPage)
    };
  }

  private notifyStatus(): void {
    this.status$.next(this.status);
  }
}
