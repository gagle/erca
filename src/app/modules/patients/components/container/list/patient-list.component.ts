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
  public readonly hostClass = true;

  @HostBinding('class.expand-list')
  public expandList = true;

  @ViewChild('search')
  public readonly inputSearch!: ErcaInputSearchComponent;

  public readonly patientSource = this.patientStore.getPatientSource();
  public highlightSearchTerms = '';

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly patientStore: PatientStore
  ) {}

  public ngOnInit(): void {
    this.patientSource.reset();
  }

  public ngOnDestroy(): void {
    this.clearSearch();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onListChanges(status: PagedViewStatus): void {
    this.expandList = status.firstFetch;
  }

  public onSearch(terms: string): void {
    this.highlightSearchTerms = terms;
    this.patientSource.where({ search: terms });
  }

  public openAddPatientDialog(): void {
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
