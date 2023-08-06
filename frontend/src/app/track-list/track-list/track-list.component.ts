import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-track-list',
  standalone: true,
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {}
