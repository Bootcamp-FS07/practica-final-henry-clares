import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/services/post/post.type';
import { ToastService } from '../../core/services/toast/toast.service';
import { CreatePostComponent } from '../post/create-post/create-post.component';
import { PostComponent } from '../post/post/post.component';

interface PostEditable extends Post {
  editing: boolean;
  openMenu: boolean;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePostComponent,
    PostComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  toastService = inject(ToastService);

  posts: PostEditable[] = [];

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
}
