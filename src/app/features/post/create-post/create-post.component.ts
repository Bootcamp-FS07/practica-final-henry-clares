import { Component, inject, output } from '@angular/core';
import { PostService } from '../../../core/services/post/post.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VALIDATION } from '../../../shared/constants';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  postService = inject(PostService);
  toastService = inject(ToastService);

  getPosts = output();

  postForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(VALIDATION.MIN_LENGTH),
    ]),
  });

  addPost() {
    if (this.postForm.invalid) {
      return;
    }
    if (!this.postForm.value.text) {
      return;
    }
    this.postService.addPost(this.postForm.value.text).subscribe(() => {
      this.toastService.showToast('Post added', 'success');
      this.getPosts.emit();
      this.postForm.reset();
    });
  }
}
