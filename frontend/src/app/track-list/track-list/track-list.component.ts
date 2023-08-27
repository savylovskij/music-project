import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrackCardComponent } from '../track-card';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-track-list',
  standalone: true,
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TrackCardComponent, NgForOf],
})
export class TrackListComponent {}
