import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/services/post/post.type';
import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../core/services/toast/toast.service';
import { BehaviorSubject } from 'rxjs';
import { storage } from '../../core/utils/storage/storage.util';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

interface PostEditable extends Post {
  editing: boolean;
  openMenu: boolean;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    ConfirmModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  toastService = inject(ToastService);

  private MIN_LENGTH = 4;
  showModal = false;

  postForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(this.MIN_LENGTH),
    ]),
  });

  editPostForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(this.MIN_LENGTH),
    ]),
  });

  newComment = '';
  posts: PostEditable[] = [];

  idUser = new BehaviorSubject(storage.getItem('idUser'));

  isOwner(post: Post): boolean {
    return this.idUser.getValue() === post.author._id;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.map(post => ({
        ...post,
        editing: false,
        openMenu: false,
      }));
    });
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }
    if (!this.postForm.value.text) {
      return;
    }
    this.postService.addPost(this.postForm.value.text).subscribe(() => {
      this.toastService.showToast('Post added', 'success');
      this.getPosts();
      this.postForm.reset();
    });
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
        this.getPosts();
      });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.closeModal();
      this.toastService.showToast('Post deleted', 'success');
      this.getPosts();
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
