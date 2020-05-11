import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Constants } from './shared/constants';
import { UserStatusService, LocalStorageService } from './core/services';
import * as menus from 'src/app/shared/components/side-navbar/menus';
import { Role } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuList: any[] = [];
  currentUser: any;
  isLoggedIn: boolean = false;
  blackListRoutes: string[] = ['/login'];
  isShowAsideBar: boolean = true;
  currentPage: string = '';
  role = Role;

  constructor(private router: Router, private route: ActivatedRoute, private userStatusService: UserStatusService, private storageService: LocalStorageService, ) {
    this.setDefaultThemeColor();
  }


  ngOnInit() {
    this.checkBlackListRoute();
    this.getMenus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkBlackListRoute();
      }
    });

    this.userStatusService.isUserLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getMenus();
      }
    });
  }

  /**
   * Check Black list routes, load menus and show/hide aside menu
   * @param url Route url to be checked
   */
  checkBlackListRoute() {
    this.currentPage = window.location.pathname;
   let isBlackListUrl = false;

    for (let i = 0; i < this.blackListRoutes.length; i++) {
      if (this.currentPage.includes(this.blackListRoutes[i])) {
          isBlackListUrl = true;
          this.isShowAsideBar = false;
          break;
      }
  }

  if (!isBlackListUrl) {
    this.isShowAsideBar = true;
    if(this.currentUser) {
      this.currentPage = this.currentPage.split(`/${this.currentUser.role.toLowerCase()}/`)[1];
    }
  }
  }

  /**
   * Get menus for current user role and set current page as active tab 
   */
  getMenus() {
    this.currentUser = this.storageService.get(Constants.currentUser);

    if (this.currentUser) {
      this.menuList = menus[this.currentUser.role];
    }
  }


  /**
   * Get theme color from local storage and set it as default theme.
   */
  setDefaultThemeColor() {
    let skin = localStorage.getItem('skin') || 'default';
    let isCompact = JSON.parse(localStorage.getItem('hasCompactMenu'));
    let disabledSkinStylesheet = document.querySelector('link[data-skin]:not([data-skin="' + skin + '"])');

    // Disable unused skin immediately
    disabledSkinStylesheet.setAttribute('rel', '');
    disabledSkinStylesheet.setAttribute('disabled', 'true');
    // add flag class to html immediately
    if (isCompact == true) {
      document.querySelector('html').classList.add('preparing-compact-menu')
    };
  }
}
