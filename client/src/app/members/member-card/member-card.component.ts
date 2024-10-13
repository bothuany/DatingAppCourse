import { LikesService } from './../../_services/likes.service';
import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private likesService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() => {
    return this.likesService.likeIds().includes(this.member().id);
  });

  toggleLike() {
    this.likesService.toggleLike(this.member().id).subscribe(() => {
      if (this.hasLiked()) {
        this.likesService.likeIds.update((ids) =>
          ids.filter((id) => id !== this.member().id)
        );
      } else {
        this.likesService.likeIds.update((ids) => [...ids, this.member().id]);
      }
    });
  }
}
