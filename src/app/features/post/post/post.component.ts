import {
  Component,
  inject,
  input,
  output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { IPostEditable } from '../../../core/services/post/post.type';

import { NgIcon } from '@ng-icons/core';
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
import { CreateCommentComponent } from '../../comment/create-comment/create-comment.component';
import { CommentService } from '../../../core/services/comment/comment.service';
import { ICommentEditable } from '../../../core/services/comment/comment.type';
import { CommentComponent } from '../../comment/comment/comment.component';
import { CommentCountPipe } from '../../../core/pipes/comment-count.pipe';
import { FromNowPipe } from '../../../core/pipes/from-now.pipe';
import { IsEditedPipe } from '../../../core/pipes/is-edited.pipe';

@Component({
  selector: 'app-post',
  imports: [
    NgIcon,
    ReactiveFormsModule,
    ConfirmModalComponent,
    CreateCommentComponent,
    CommentComponent,
    CommentCountPipe,
    FromNowPipe,
    IsEditedPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit, OnChanges {
  postEditable = input<IPostEditable>();
  getPosts = output();

  postService = inject(PostService);
  toastService = inject(ToastService);
  commentService = inject(CommentService);

  idUser = new BehaviorSubject(storage.getItem('idUser'));

  showModal = false;
  showComment = false;

  editPostForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(VALIDATION.MIN_LENGTH),
    ]),
  });

  comments: ICommentEditable[] = [];

  ngOnInit() {
    this.getComments();
  }

  ngOnChanges() {
    this.getComments();
    this.showComment = false;
  }

  get post() {
    return this.postEditable();
  }

  isOwner(): boolean {
    return this.idUser.getValue() === this.post?.author._id;
  }

  startEditing(post: IPostEditable) {
    post.editing = true;
    post.openMenu = false;
    this.editPostForm.patchValue({ text: post.text });
  }

  editPost(post: IPostEditable) {
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
      this.getComments();
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getComments() {
    if (!this.post?._id) {
      return;
    }

    this.commentService.getComments(this.post._id).subscribe(comments => {
      this.comments = comments.map(comment => ({
        ...comment,
        editing: false,
        openMenu: false,
      }));
    });
  }
}
