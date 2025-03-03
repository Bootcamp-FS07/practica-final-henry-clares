import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post/post.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { CreatePostComponent } from '../post/create-post/create-post.component';
import { PostComponent } from '../post/post/post.component';
import { IPostEditable } from '../../core/services/post/post.type';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePostComponent,
    PostComponent,
    PaginatorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  toastService = inject(ToastService);

  posts: IPostEditable[] = [];
  postsFiltered: IPostEditable[] = [];

  itemsPerPage = 5;

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

      this.paginate(1, this.posts);
    });
  }

  onPageChange(page: number) {
    this.paginate(page);
  }

  paginate(page: number, posts: IPostEditable[] = this.posts) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.postsFiltered = [...posts].slice(startIndex, endIndex);
  }
}
