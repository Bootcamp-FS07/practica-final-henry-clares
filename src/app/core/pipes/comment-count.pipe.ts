import { Pipe, PipeTransform } from '@angular/core';
import { ICommentEditable } from '../services/comment/comment.type';

@Pipe({
  name: 'commentCount',
})
export class CommentCountPipe implements PipeTransform {
  transform(comments: ICommentEditable[]) {
    if (!comments || comments.length === 0) {
      return 'No comments';
    }
    const count = comments.length;
    return count === 1 ? `${count} comment` : `${count} comments`;
  }
}
