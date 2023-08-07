import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, NgOptimizedImage],
})
export class FooterComponent {
  public readonly copyrightUpdate = new Date();
}
