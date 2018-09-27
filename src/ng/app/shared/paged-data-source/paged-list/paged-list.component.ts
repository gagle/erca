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
  public dataSource!: PagedDataSource<T, S>;
  @Output()
  public readonly onChanges = new EventEmitter<PagedViewStatus>(true);

  @HostBinding('class.erca-paged-list')
  public readonly hostClass = true;

  @ContentChild(ErcaPagedListItemDirective, { read: TemplateRef })
  public readonly itemTemplate!: ErcaPagedListItemDirective;
  @ContentChild(ErcaPagedListEmptyDirective, { read: TemplateRef })
  public readonly emptyTemplate!: ErcaPagedListEmptyDirective;
  @ContentChild(ErcaPagedListFetchingDirective, { read: TemplateRef })
  public readonly fetchingTemplate!: ErcaPagedListFetchingDirective;

  public status$!: Observable<PagedViewStatus>;
  public items$!: Observable<T[]>;

  private statusStore!: PagedViewStatusStore;

  public ngOnInit(): void {
    this.items$ = this.dataSource.onItems();

    this.statusStore = new PagedViewStatusStore(this.dataSource);
    this.status$ = this.statusStore.onStatus();
    this.status$.subscribe(status => {
      this.onChanges.emit(status);
    });
  }

  public onInfiniteScroll(): void {
    this.dataSource.nextPage();
  }
}
