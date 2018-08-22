import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DialogService, CanComponentDeactivate } from './../../../core';
import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  private sub: Subscription;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new UserModel(null, '', '');

    // we should recreate component because this code runs only once
    const id = +this.route.snapshot.paramMap.get('userID');
    this.sub = this.userArrayService.getUser(id).subscribe(
      user => {
        this.user = { ...user };
        this.originalUser = { ...user };
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.userArrayService.updateUser(user);
      // optional parameter: http://localhost:4200/users;id=2
      this.router.navigate(['/users', {editedUserID: user.id}]);
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
