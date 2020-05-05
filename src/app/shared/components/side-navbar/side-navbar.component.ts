import { Component, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Constants } from '../../constants';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as menus from './menus';
import {UserService, UserStatusService, LocalStorageService} from 'src/app/core/services';

@Component({
  selector: 'side-navBar',
  templateUrl: './side-navBar.component.html',
  styleUrls: ['./side-navBar.component.scss']
})
export class SideNavBarComponent implements OnInit , OnChanges{
  @Input() isShowAsideBar: boolean = true;
  @Input() isShowHeaderSearch: boolean = false;
  @Input() isShowHeaderActivities: boolean = false;
  @Input() isShowHeaderNotifications: boolean = false;
  @Input() isShowHeaderDropdown: boolean = false;
  @Input() isShowHeaderAcountMenu: boolean = true;
  @Input() menuList: any[] = [];
  @Input() currentPage: any[] = [];
  @Input() currentUser: any;

  constructor(
    private router: Router,
     private route: ActivatedRoute,
      private userStatusService: UserStatusService,
      private storageService: LocalStorageService,
    ) {

  }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log("this.list:", this.menuList);
  }

  /**
   * Redirect user.
   * @param menuItem 
   */
  redirectTo(menuItem: any) {
      if (menuItem && menuItem.url && menuItem.url.length) {
        this.router.navigate([menuItem.url]);
        this.currentPage = menuItem.url;
    }
  }
}
