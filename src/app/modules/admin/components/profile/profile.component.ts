import { Component, OnInit } from '@angular/core';
import { LocalStorageService, UserService } from 'src/app/core/services/';
import { Constants } from 'src/shared/constants';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: any = {};
    role: string;

    constructor(
        private userService: UserService,
        private storageService: LocalStorageService

    ) { }

    ngOnInit() {
        let currentUser = this.storageService.get(Constants.currentUser);
        this.role = `${currentUser.role}`;
        this.getuserDetail(currentUser.userId)
    }

    getuserDetail(Id) {
        this.userService.getById(Id).subscribe((user: any) => {
            this.user = user.data;
        });
    }
}