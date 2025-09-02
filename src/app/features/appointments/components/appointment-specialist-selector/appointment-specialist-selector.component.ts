import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  Signal,
  effect,
  ElementRef,
} from '@angular/core';
import { Specialty, Specialist } from '../../../../core/models';
import { SvgIconComponent } from '../../../../shared/icons/svg-icon.component';
import { UserFacade } from '../../../auth/user.facade';
import { SEX_LABELS } from '../../../../core/enums/enum-labels';
import { AVAILABILITY_PRESETS_LABELS } from '../../../../core/constants/availability-presets';
import { CloudinaryService } from '../../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-appointment-specialist-selector',
  imports: [SvgIconComponent],
  templateUrl: './appointment-specialist-selector.component.html',
  styleUrl: './appointment-specialist-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSpecialistSelectorComponent implements OnInit {
  @Input({ required: true }) specialty!: Specialty | null;
  @Input() lastSelected: Specialist | null = null;
  @Input() preSpecialists: Specialist[] | null = null 
  @Output() specialistEmitted = new EventEmitter<Specialist | null>();
  private elementRef = inject(ElementRef);

  private cloudinaryService = inject(CloudinaryService);
  readonly defaultProfilePictureUrl = this.cloudinaryService.defaultProfilePictureUrl;

  private readonly userFacade = inject(UserFacade);
  readonly specialists: Signal<Specialist[]> = this.userFacade.users as Signal<
    Specialist[]
  >;
  readonly selectedSpecialist = signal<Specialist | null>(null);
  protected readonly sexLabels = SEX_LABELS;
  protected readonly availabilityLabels = AVAILABILITY_PRESETS_LABELS;

  // Filtered specialists based on the selected specialty
  readonly filteredSpecialists = computed(() => {
    const specialtyId = this.specialty?.id;
    if (!specialtyId) return [];
    return this.specialists().filter((s) =>
      s.specialties.some((spec) => spec.id === specialtyId)
    );
  });

  ngOnInit(): void {
    this.selectedSpecialist.set(this.lastSelected);

    if (!this.specialists()) {
      this.userFacade.getUsersByRole('specialist');
    }
  }

  selectSpecialist(specialist: Specialist): void {
    const current = this.selectedSpecialist();
    if (current && current.id === specialist.id) {
      this.selectedSpecialist.set(null);
    } else {
      this.selectedSpecialist.set(specialist);
    }

    this.specialistEmitted.emit(this.selectedSpecialist());
  }

  isSelected(specialist: Specialist): boolean {
    const current = this.selectedSpecialist();
    return current ? current.id === specialist.id : false;
  }

  getProfilePictureUrl = (specialist: Specialist) => {
    if (specialist && specialist.profilePictureUrl) {
      return this.cloudinaryService.getTransformedUrl(
        specialist.profilePictureUrl,
        'w_150,h_150,c_fill,g_face,f_webp'
      );
    }
    return this.defaultProfilePictureUrl;
  };

  constructor() {
    effect(() => {
      this.filteredSpecialists();
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const images: NodeListOf<HTMLImageElement> =
            this.elementRef.nativeElement.querySelectorAll('.img-fade-in');
          images.forEach((img) => {
            if (img.complete) {
              img.classList.add('is-loaded');
            } else {
              img.addEventListener('load', () => {
                img.classList.add('is-loaded');
              }, { once: true });
            }
          });
        }
      });
    });
  }
}