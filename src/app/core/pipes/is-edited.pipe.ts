import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'isEdited',
})
export class IsEditedPipe implements PipeTransform {
  transform(created: Date, updated: Date) {
    return moment(created).isSame(updated) ? '' : ' (edited)';
  }
}
