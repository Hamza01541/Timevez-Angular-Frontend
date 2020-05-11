import { Component, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Constants } from '../../constants';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as menus from './menus';
import { UserService, UserStatusService, LocalStorageService } from 'src/app/core/services';

@Component({
  selector: 'side-navBar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavBarComponent implements OnInit, OnChanges {
  @Input() isShowAsideBar: boolean = true;
  @Input() isShowHeaderSearch: boolean = false;
  @Input() isShowHeaderActivities: boolean = false;
  @Input() isShowHeaderNotifications: boolean = false;
  @Input() isShowHeaderDropdown: boolean = false;
  @Input() isShowHeaderAcountMenu: boolean = true;
  @Input() menuList: any[] = [];
  @Input() currentPage: string;
  @Input() currentUser: any;

  menuItems: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userStatusService: UserStatusService,
    private storageService: LocalStorageService,
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('SmenuItems:',this.menuItems);
    console.log('ScurrentPage:',this.currentPage);
    if (this.menuItems !== this.menuList && this.menuItems.length) {
      this.menuItems = this.menuList;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      this.menuItems = this.menuList;
    }
  }

  /**
   * Toggle theme skin color
   */
  toggleThemeColor() {
    let skin = localStorage.getItem('skin') || 'default';
    skin = skin === 'default' ? 'dark' : 'default';
    localStorage.setItem('skin', skin);
    window.location.reload();
  }

  /**
   * Get image
   */
  getImage() {
      return this.currentUser && this.currentUser.photo ? this.currentUser.photo : `assets/images/avatars/unknown-profile.jpg`;
  }

  redirectTo(route:string){
    if(route && route.length && this.currentUser && this.currentUser.role) {
    this.router.navigate([`/${this.currentUser.role.toLowerCase()}/${route}`]);
  }
}

}
