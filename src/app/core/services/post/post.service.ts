import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { storage } from '../../utils/storage/storage.util';
import { Post } from './post.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl = `${environment.baseUrl}/post`;

  router = inject(Router);

  constructor(private http: HttpClient) {}

  getPost(id: string) {
    return this.http.get<Post>(`${this.postUrl}/${id}`);
  }

  getPosts() {
    return this.http
      .get<Post[]>(`${this.postUrl}`)
      .pipe(
        map(posts =>
          posts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      );
  }

  addPost(text: string) {
    const author = storage.getItem('idUser');
    return this.http.post(`${this.postUrl}`, {
      text,
      author,
    });
  }

  editPost(id: string, text: string) {
    return this.http.patch(`${this.postUrl}/${id}`, {
      text,
    });
  }

  deletePost(id: string) {
    return this.http.delete(`${this.postUrl}/${id}`);
  }
}
