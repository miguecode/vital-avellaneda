import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_PATHS, VIEWBOXES } from './icon-paths';

@Component({
  selector: 'app-svg-icon',
  template: `
    @if (svgPath) {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.height]="size"
      [attr.width]="size"
      [attr.fill]="color"
      [attr.viewBox]="viewBoxValue"
    >
      <path [attr.d]="svgPath" />
    </svg>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() icon: keyof typeof ICON_PATHS = 'error';
  @Input() viewBox: keyof typeof VIEWBOXES = 'googleMaterial';
  @Input() size: string = '24px';
  @Input() color: string = 'currentColor';

  get svgPath(): string | undefined {
    return ICON_PATHS[this.icon];
  }

  get viewBoxValue(): string | undefined {
    return VIEWBOXES[this.viewBox];
  }
}