import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class SettingsComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserProfile().subscribe(data => this.user = data);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.userService.uploadProfilePicture(file).subscribe(url => this.user.profilePictureUrl = url);
  }

  saveChanges() {
    this.userService.updateUserProfile(this.user).subscribe(() => alert('Zmiany zapisane!'));
  }
}
