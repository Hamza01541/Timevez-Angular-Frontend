import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Constants } from './shared/constants';
import { UserStatusService, LocalStorageService } from './core/services';
import * as menus from 'src/app/shared/components/side-navbar/menus';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timevez';
  menuList:any[];
  currentUser:any;
  isLoggedIn:boolean = false;
  blackListRoutes:string[] = ['/login'];
  isShowAsideBar:boolean = true;
  currentPage:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userStatusService: UserStatusService,private storageService: LocalStorageService,) {
    this.setDefaultThemeColor();
  }


  ngOnInit() {
    console.log("this.currentUser:",this.currentUser);
    this.checkBlackListRoute();
    this.getMenus();

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
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
    if(this.blackListRoutes.includes(window.location.pathname)) {
      this.isShowAsideBar = false;
    }else {
      this.isShowAsideBar = true;
    }
  }

  /**
   * Get menus for current user role and set current page as active tab 
   */
  getMenus() {
    this.currentPage = window.location.pathname;
    this.menuList = [];
    this.currentUser = this.storageService.get(Constants.currentUser);
    this.menuList = menus[this.currentUser.role];
    console.log("this.menuList:",this.menuList);
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
