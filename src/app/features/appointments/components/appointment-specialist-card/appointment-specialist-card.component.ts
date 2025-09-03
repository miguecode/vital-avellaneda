import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { Specialist } from '../../../../core/models';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { SEX_LABELS } from '../../../../core/enums/enum-labels';
import { AVAILABILITY_PRESETS_LABELS } from '../../../../core/constants/availability-presets';
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-appointment-specialist-card',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './appointment-specialist-card.component.html',
  styleUrl: './appointment-specialist-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSpecialistCardComponent {
  @Input({ required: true }) specialist!: Specialist;
  @Input() isSelected: boolean = false;

  private readonly elementRef = inject(ElementRef);
  private readonly cloudinaryService = inject(CloudinaryService);

  protected readonly sexLabels = SEX_LABELS;
  protected readonly availabilityLabels = AVAILABILITY_PRESETS_LABELS;

  readonly defaultProfilePictureUrl = this.cloudinaryService.defaultProfilePictureUrl;

  readonly profilePictureUrl: Signal<string> = computed(() => {
    if (this.specialist && this.specialist.profilePictureUrl) {
      return this.cloudinaryService.getTransformedUrl(
        this.specialist.profilePictureUrl,
        'w_150,h_150,c_fill,g_face,f_webp'
      );
    }
    return this.defaultProfilePictureUrl;
  });

  constructor() {
    effect(() => {
      // This effect is now scoped to this component instance.
      // It will run when the component is created.
      this.profilePictureUrl(); // Depend on the URL

      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const image: HTMLImageElement | null =
            this.elementRef.nativeElement.querySelector('.img-fade-in');

          if (image) {
            if (image.complete) {
              image.classList.add('is-loaded');
            } else {
              image.addEventListener('load', () => {
                image.classList.add('is-loaded');
              }, { once: true });
            }
          }
        }
      }, 10); // A small timeout is still okay here as it's less complex.
    });
  }
}