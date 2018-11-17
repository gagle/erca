import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ErcaInputSearchComponent } from '../../../../../shared/input-search/input-search.component';
import { PagedViewStatus } from '../../../../../shared/paged-data-source/paged-view-status-store';
import { PatientStore } from '../../../services/patient-store.service';
import { PatientAddComponent } from './add/patient-add.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PatientListComponent implements OnInit, OnDestroy {
  @HostBinding('class.app-patient-list')
  readonly hostClass = true;

  @HostBinding('class.expand-list')
  expandList = true;

  @ViewChild('search')
  readonly inputSearch!: ErcaInputSearchComponent;

  readonly patientSource = this.patientStore.getPatientSource();
  highlightSearchTerms = '';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly patientStore: PatientStore
  ) {}

  ngOnInit(): void {
    this.patientSource.reset();
  }

  ngOnDestroy(): void {
    this.clearSearch();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onListChanges(status: PagedViewStatus): void {
    this.expandList = status.firstFetch;
  }

  onSearch(terms: string): void {
    this.highlightSearchTerms = terms;
    this.patientSource.where({ search: terms });
  }

  openAddPatientDialog(): void {
    this.dialog
      .open(PatientAddComponent)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(({ data }) => {
        this.router.navigate(['/patients', data.id]);
      });
  }

  private clearSearch(): void {
    this.inputSearch.clear();
    this.highlightSearchTerms = '';
    this.patientSource.removePredicateElement('search', { fetch: false });
  }
}
