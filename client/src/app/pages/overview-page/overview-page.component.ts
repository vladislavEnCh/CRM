import { IOverviewPage } from './../../shared/interfaces/interface';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/index';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  @ViewChild('tapTarget') tapTargetRef!: ElementRef;
  data$!: Observable<IOverviewPage>;

  yesterday = new Date();

  constructor(private service: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.service.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }
}
