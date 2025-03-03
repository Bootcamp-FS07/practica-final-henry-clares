import { Component, inject, input, output } from '@angular/core';
import { Post } from '../../../core/services/post/post.type';
import { NgIcon } from '@ng-icons/core';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { storage } from '../../../core/utils/storage/storage.util';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VALIDATION } from '../../../shared/constants';
import { PostService } from '../../../core/services/post/post.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

interface PostEditable extends Post {
  editing: boolean;
  openMenu: boolean;
}

@Component({
  selector: 'app-post',
  imports: [NgIcon, DatePipe, ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  postEditable = input<PostEditable>();
  getPosts = output();

  postService = inject(PostService);
  toastService = inject(ToastService);

  idUser = new BehaviorSubject(storage.getItem('idUser'));

  showModal = false;

  editPostForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(VALIDATION.MIN_LENGTH),
    ]),
  });

  get post() {
    return this.postEditable();
  }

  isOwner(): boolean {
    return this.idUser.getValue() === this.post?.author._id;
  }
  startEditing(post: PostEditable) {
    post.editing = true;
    post.openMenu = false;
    this.editPostForm.patchValue({ text: post.text });
  }

  editPost(post: PostEditable) {
    post.editing = false;
    if (!this.editPostForm.value.text) {
      return;
    }
    this.postService
      .editPost(post._id, this.editPostForm.value.text)
      .subscribe(() => {
        this.toastService.showToast('Post edited', 'success');
        this.getPosts.emit();
      });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.closeModal();
      this.toastService.showToast('Post deleted', 'success');
      this.getPosts.emit();
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
