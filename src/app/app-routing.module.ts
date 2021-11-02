import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'Admin/:id',
    loadChildren: () => import('./Admin/admin.module').then( m => m.AdminPageModule),
  },
  {
    path: 'User/:id',
    loadChildren: () => import('./User/createuser.module').then( m => m.CreateUserPageModule),
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
   {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
  }, 
  {
    path: 'NewPolicy/:id',
    loadChildren: () => import('./NewPolicy/newpolicy.module').then( m => m.NewPolicyPageModule),
  },   
  {
    path: 'PolicyInfo/:id',
    loadChildren: () => import('./PolicyInfo/policyinfo.module').then( m => m.PolicyInfoPageModule),
  }, 
  {
    path: 'Home/:id',
    loadChildren: () => import('./Home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'UWApproval',
    loadChildren: () => import('./UWApproval/uw.module').then( m => m.UWPageModule),
  },  
  {
    path: 'Insured/:id',
    loadChildren: () => import('./Insured/insured.module').then( m => m.InsuredPageModule),
  }, 
  {
    path: 'CreateInsured/:id',
    loadChildren: () => import('./CreateInsured/createinsured.module').then( m => m.CreateInsuredPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
