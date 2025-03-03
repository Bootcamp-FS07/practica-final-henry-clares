import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { storage } from '../../utils/storage/storage.util';
import { IPost } from './post.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl = `${environment.baseUrl}/post`;

  constructor(private http: HttpClient) {}

  getPost(id: string) {
    return this.http.get<IPost>(`${this.postUrl}/${id}`);
  }

  getPosts() {
    return this.http
      .get<IPost[]>(`${this.postUrl}`)
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
