import { Component, OnInit } from '@angular/core';
import { LocalStorageService, UserService } from 'src/app/core/services';
import { Constants } from 'src/shared/constants';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


    user: any = {};
    role: string;
    currentUser: any;
    constructor(
        private userService: UserService,
        private storageService: LocalStorageService

    ) { }

    ngOnInit() {
        this.currentUser = this.storageService.get(Constants.currentUser);
        this.role = `${this.currentUser.role}`;
    }
}
