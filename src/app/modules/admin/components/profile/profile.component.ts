import { Component, OnInit } from '@angular/core';
import { LocalStorageService, UserService, AlertService } from 'src/app/core/services';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: any = {};
    role: string;
    uploadedImage: any;

    constructor(
        private userService: UserService,
        private storageService: LocalStorageService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        let currentUser = this.storageService.get(Constants.currentUser);
        this.role = `${currentUser.role}`;
        this.getuserDetail(currentUser.userId);
    }

    getuserDetail(userId: string) {
        this.userService.getById(userId).subscribe((user: any) => {
            this.user = user;
            if(!this.user.photo){
                this.user.photo = 'assets/images/avatars/unknown-profile.jpg';
            }
        });
    }

    /**
     * Upload photo in base64 format
     * @param event
     * @see http://bachors.com/code/convert-image-to-base64-blob-binary-using-javascript
     * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
     */
    uploadPhoto(event: any) {
        // const file = event.target.files[0];

        // if (file) {
        //     if (/(jpe?g|png)$/i.test(file.type)) {
        //         const fileReader = new FileReader();
        //         const _this = this;

        //         fileReader.onload = function (evt) {
        //             const base64Img = evt.target.result;

        //             _this.userService.uploadPhoto(_this.user._id, { photo: 'base64Img' }).subscribe(res => {
        //                 _this.user.photo = base64Img;
        //                 _this.alertService.successToastr(res.message);
        //             }, error => {
        //                 if (error && error.error && error.error.message) {
        //                     _this.alertService.errorToastr(error.error.message);
        //                 }
        //             });
        //         }

        //         fileReader.readAsDataURL(file);
        //     } else {
        //         this.alertService.errorToastr("Invalid photo type! Photo type must PNG or JPEG");
        //     }
        // } else {
        //     this.alertService.errorToastr("Failed to load photo, please try again");
        // }
    }
}