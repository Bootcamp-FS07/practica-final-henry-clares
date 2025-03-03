import { Component, inject, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../core/services/toast/toast.service';
import { CommentService } from '../../../core/services/comment/comment.service';
import { VALIDATION } from '../../../shared/constants';
import { storage } from '../../../core/utils/storage/storage.util';
import { BehaviorSubject } from 'rxjs';
import { ICommentEditable } from '../../../core/services/comment/comment.type';
import { DatePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, DatePipe, NgIcon, ConfirmModalComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  commentEditable = input<ICommentEditable>();
  getComments = output();

  toastService = inject(ToastService);
  commentService = inject(CommentService);

  idUser = new BehaviorSubject(storage.getItem('idUser'));

  showModal = false;

  editCommentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(VALIDATION.MIN_LENGTH),
    ]),
  });

  get comment() {
    return this.commentEditable();
  }

  isOwner(): boolean {
    return this.idUser.getValue() === this.comment?.author._id;
  }

  startEditing(comment: ICommentEditable) {
    comment.editing = true;
    comment.openMenu = false;
    this.editCommentForm.patchValue({ text: comment.text });
  }

  editComment(comment: ICommentEditable) {
    comment.editing = false;
    if (!this.editCommentForm.value.text) {
      return;
    }
    this.commentService
      .editComment(comment._id, this.editCommentForm.value.text)
      .subscribe(() => {
        this.toastService.showToast('Comment edited', 'success');
        this.getComments.emit();
      });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.closeModal();
      this.toastService.showToast('Comment deleted', 'success');
      this.getComments.emit();
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
