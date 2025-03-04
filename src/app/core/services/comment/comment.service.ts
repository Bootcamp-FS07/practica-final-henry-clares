import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IComment } from './comment.type';
import { storage } from '../../utils/storage/storage.util';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  commentUrl = `${environment.baseUrl}/comment`;

  constructor(private http: HttpClient) {}

  getComments(postId: string) {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<IComment[]>(`${this.commentUrl}`, { params });
  }

  addComment(postId: string, text: string) {
    const author = storage.getItem('idUser');
    return this.http.post(`${this.commentUrl}`, {
      text,
      author,
      post: postId,
    });
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${this.commentUrl}/${commentId}`);
  }

  editComment(commentId: string, text: string) {
    return this.http.patch(`${this.commentUrl}/${commentId}`, {
      text,
    });
  }
}
