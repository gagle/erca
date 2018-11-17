import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { PagedDataSource } from '../paged-data-source';
import {
  PagedViewStatus,
  PagedViewStatusStore
} from '../paged-view-status-store';
import { ErcaPagedListEmptyDirective } from './paged-list-empty.directive';
import { ErcaPagedListFetchingDirective } from './paged-list-fetching.directive';
import { ErcaPagedListItemDirective } from './paged-list-item.directive';

@Component({
  selector: 'erca-paged-list',
  templateUrl: './paged-list.component.html',
  styleUrls: ['./paged-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErcaPagedListComponent<T = any, S = any> implements OnInit {
  @Input()
  dataSource!: PagedDataSource<T, S>;
  @Output()
  readonly onChanges = new EventEmitter<PagedViewStatus>(true);

  @HostBinding('class.erca-paged-list')
  readonly hostClass = true;

  @ContentChild(ErcaPagedListItemDirective, { read: TemplateRef })
  readonly itemTemplate!: ErcaPagedListItemDirective;
  @ContentChild(ErcaPagedListEmptyDirective, { read: TemplateRef })
  readonly emptyTemplate!: ErcaPagedListEmptyDirective;
  @ContentChild(ErcaPagedListFetchingDirective, { read: TemplateRef })
  readonly fetchingTemplate!: ErcaPagedListFetchingDirective;

  status$!: Observable<PagedViewStatus>;
  items$!: Observable<T[]>;

  private statusStore!: PagedViewStatusStore;

  ngOnInit(): void {
    this.items$ = this.dataSource.onItems();

    this.statusStore = new PagedViewStatusStore(this.dataSource);
    this.status$ = this.statusStore.onStatus();
    this.status$.subscribe(status => {
      this.onChanges.emit(status);
    });
  }

  onInfiniteScroll(): void {
    this.dataSource.nextPage();
  }
}
