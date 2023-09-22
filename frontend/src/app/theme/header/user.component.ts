import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@shared';
import { User } from 'app/model/user.model';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" src="assets/images/avatar.jpg" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{ user.username }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <button routerLink="/auth/login" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {
  constructor(private localStorageSv: LocalStorageService){}

  user: Partial<User> = {};

  ngOnInit(): void {
      this.user = this.localStorageSv.get('user');
  }
}
