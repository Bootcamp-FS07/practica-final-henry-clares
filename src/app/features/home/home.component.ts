import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/services/post/post.type';
import { NgIcon } from '@ng-icons/core';

interface PostEditable extends Post {
  editing: boolean;
  openMenu: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  newPost = '';
  newComment = '';
  posts: PostEditable[] = [];
  openMenu = false;

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts.map(post => ({
        ...post,
        editing: false,
        openMenu: false,
      }));
    });
  }

  addPost() {
    // if (!this.newPost.trim()) return;
    // this.posts.unshift({
    //   id: Date.now(),
    //   text: this.newPost,
    //   user: 'You',
    //   comments: [],
    //   editing: false,
    // });
    // this.newPost = '';
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
