import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-track-card',
  standalone: true,
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class TrackCardComponent {}
