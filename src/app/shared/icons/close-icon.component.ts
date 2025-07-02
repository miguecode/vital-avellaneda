import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    [attr.height]="size"
    [attr.width]="size"
    [attr.fill]="color"
    viewBox="0 -960 960 960"
  >
    <path
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
    />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseIconComponent {
  @Input() size: string = '24px';
  @Input() color: string = 'currentColor';
}
