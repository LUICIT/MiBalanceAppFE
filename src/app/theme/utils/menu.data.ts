import { MenuModel } from "@models/menu.model";

export const horizontalMenuItems: MenuModel[] = [
    {id: 1, title: 'NAV.HOME', routerLink: '/home', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 2, title: 'NAV.PROPERTIES', routerLink: '/properties', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 40, title: 'NAV.PAGES', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 0},
    {id: 41, title: 'NAV.AGENTS', routerLink: '/agents', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 42, title: 'NAV.AGENT', routerLink: '/agents/1', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 43, title: 'LOGIN', routerLink: '/login', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 44, title: 'REGISTER', routerLink: '/register', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 45, title: 'FAQs', routerLink: '/faq', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 46, title: 'NAV.PRICING', routerLink: '/pricing', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 47, title: 'NAV.TERMS_CONDITIONS', routerLink: '/terms-conditions', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 48, title: 'Landing', routerLink: '/landing', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 50, title: '404 Page', routerLink: '/404', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 60, title: 'NAV.CONTACT', routerLink: '/contact', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 70, title: 'NAV.ABOUT_US', routerLink: '/about', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 140, title: 'Others', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 40},
    {id: 141, title: 'NAV.EXTERNAL_LINK', routerLink: null, href: 'http://themeseason.com', target: '_blank', hasSubMenu: false, parentId: 140},
    {id: 142, title: 'Menu item', routerLink: null, href: 'http://themeseason.com', target: '_blank', hasSubMenu: false, parentId: 140},
    {id: 143, title: 'Menu item', routerLink: null, href: 'http://themeseason.com', target: '_blank', hasSubMenu: false, parentId: 140},
    {id: 144, title: 'Menu item', routerLink: null, href: 'http://themeseason.com', target: '_blank', hasSubMenu: false, parentId: 140}
]

export const verticalMenuItems: MenuModel[] = [
    {id: 1, title: 'NAV.HOME', routerLink: '/', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 2, title: 'NAV.PROPERTIES', routerLink: '/properties', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 40, title: 'NAV.PAGES', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 0},
    {id: 41, title: 'NAV.AGENTS', routerLink: '/agents', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 42, title: 'NAV.AGENT', routerLink: '/agents/1', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 43, title: 'LOGIN', routerLink: '/login', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 44, title: 'REGISTER', routerLink: '/register', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 45, title: 'FAQs', routerLink: '/faq', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 46, title: 'NAV.PRICING', routerLink: '/pricing', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 47, title: 'NAV.TERMS_CONDITIONS', routerLink: '/terms-conditions', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 48, title: 'Landing', routerLink: '/landing', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 50, title: '404 Page', routerLink: '/404', href: null, target: null, hasSubMenu: false, parentId: 40},
    {id: 60, title: 'NAV.CONTACT', routerLink: '/contact', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 70, title: 'NAV.ABOUT_US', routerLink: '/about', href: null, target: null, hasSubMenu: false, parentId: 0},
    {id: 140, title: 'Level 1', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 0},
    {id: 141, title: 'Level 2', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 140},
    {id: 142, title: 'Level 3', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 141},
    {id: 143, title: 'Level 4', routerLink: null, href: null, target: null, hasSubMenu: true, parentId: 142},
    {id: 144, title: 'Level 5', routerLink: null, href: 'http://themeseason.com', target: null, hasSubMenu: false, parentId: 143},
    {id: 200, title: 'NAV.EXTERNAL_LINK', routerLink: null, href: 'http://themeseason.com', target: '_blank', hasSubMenu: false, parentId: 0}
]
