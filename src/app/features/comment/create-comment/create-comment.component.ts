import { Component, inject, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../../core/services/toast/toast.service';
import { CommentService } from '../../../core/services/comment/comment.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VALIDATION } from '../../../shared/constants';
import { AutoFocusDirective } from '../../../core/directives/auto-focus.directive';

@Component({
  selector: 'app-create-comment',
  imports: [NgIcon, ReactiveFormsModule, AutoFocusDirective],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent {
  postId = input<string>();
  getComments = output();

  toastService = inject(ToastService);
  commentService = inject(CommentService);

  commentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(VALIDATION.MIN_LENGTH),
    ]),
  });

  addComment() {
    if (!this.postId()) {
      return;
    }

    if (this.commentForm.invalid) {
      return;
    }
    if (!this.commentForm.value.text) {
      return;
    }

    this.commentService
      .addComment(this.postId()!, this.commentForm.value.text)
      .subscribe(() => {
        this.toastService.showToast('Comment added', 'success');
        this.getComments.emit();
        this.commentForm.reset();
      });
  }
}
