import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserModel } from './data-access/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  readonly user: WritableSignal<UserModel> = signal({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@yopmail.com'
  });
}
