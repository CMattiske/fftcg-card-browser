import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Filter } from './filter';
import { Predicates } from 'src/app/shared/predicates';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent {
  @Input() categoryOptions: string[] = [];
  @Input() jobOptions: string[] = [];
  @Input() setOptions: string[] = [];
  @Input() tagOptions: string[] = [];

  @Output() change: EventEmitter<Filter[]> = new EventEmitter<Filter[]>();

  private myNameFilter: Filter | undefined;
  private myTypeFilter: Filter | undefined;
  private myElementFilter: Filter | undefined;
  private myCostFilter: Filter | undefined;
  private myCategoryFilter: Filter | undefined;
  private myJobFilter: Filter | undefined;
  private myTextFilter: Filter | undefined;
  private myPowerFilter: Filter | undefined;
  private mySetFilter: Filter | undefined;
  private myRarityFilter: Filter | undefined;

  protected onChangeName(filter: Filter): void
  {
    this.myNameFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeType(filter: Filter): void
  {
    this.myTypeFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeElements(filter: Filter): void
  {
    this.myElementFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeCost(filter: Filter): void
  {
    this.myCostFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeCategories(filter: Filter): void
  {
    this.myCategoryFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeJobs(filter: Filter): void
  {
    this.myJobFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeText(filter: Filter): void
  {
    this.myTextFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangePower(filter: Filter): void
  {
    this.myPowerFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeSet(filter: Filter): void
  {
    this.mySetFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  protected onChangeRarity(filter: Filter): void
  {
    this.myRarityFilter = filter.isRelevant ? filter : undefined;
    this.onFiltersChanged();
  }

  private onFiltersChanged(): void
  {
    this.change.emit([
      this.myNameFilter,
      this.myTypeFilter,
      this.myElementFilter,
      this.myCostFilter,
      this.myCategoryFilter,
      this.myJobFilter,
      this.myTextFilter,
      this.myPowerFilter,
      this.mySetFilter,
      this.myRarityFilter,
    ].filter(Predicates.Defined));
  }
}
