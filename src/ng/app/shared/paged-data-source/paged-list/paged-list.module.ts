import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ErcaPagedListEmptyDirective } from './paged-list-empty.directive';
import { ErcaPagedListFetchingDirective } from './paged-list-fetching.directive';
import { ErcaPagedListItemDirective } from './paged-list-item.directive';
import { ErcaPagedListComponent } from './paged-list.component';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule, MatListModule],
  declarations: [
    ErcaPagedListComponent,
    ErcaPagedListEmptyDirective,
    ErcaPagedListFetchingDirective,
    ErcaPagedListItemDirective
  ],
  exports: [
    ErcaPagedListComponent,
    ErcaPagedListEmptyDirective,
    ErcaPagedListFetchingDirective,
    ErcaPagedListItemDirective
  ]
})
export class ErcaPagedListModule {}
