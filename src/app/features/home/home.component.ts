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

interface PostEditable extends Post {
  editing: boolean;
  openMenu: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, NgIcon, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  toastService = inject(ToastService);

  private MIN_LENGTH = 4;

  postForm = new FormGroup({
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

  editPost(post: Post) {
    console.log(post);
    // post.editing = true;
  }

  deletePost(id: string) {
    console.log(id);
    // this.posts = this.posts.filter(post => post.id !== id);
  }

  addComment(post: Post) {
    console.log(post);
    // if (!this.newComment.trim()) return;
    // post.comments.push({ id: Date.now(), text: this.newComment, user: 'You' });
    // this.newComment = '';
  }

  deleteComment(post: Post, commentId: string) {
    console.log(post, commentId);
    // post.comments = post.comments.filter(comment => comment.id !== commentId);
  }
}
