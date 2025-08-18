import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoFacade } from '../../../info/info.facade';
import { ViewportScroller } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-info-detail-page',
  imports: [],
  templateUrl: './info-detail-page.component.html',
  styleUrl: './info-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private infoFacade = inject(InfoFacade);
  private viewportScroller = inject(ViewportScroller);

  private params = toSignal(this.route.paramMap);
  public infoPage = computed(() => {
    const slug = this.params()?.get('slug');
    if (!slug) return undefined;

    this.viewportScroller.scrollToPosition([0, 0]);
    return this.infoFacade.getInfoBySlug(slug);
  });

  constructor() {
    effect(() => {
      if (this.params() && !this.infoPage()) {
        this.router.navigate(['/info']);
      }
    });
  }
}