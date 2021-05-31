import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  { path: "user", loadChildren: "./pages/user/user.module#UserPageModule" },
  { path: "signup", loadChildren: "./signup/signup.module#SignupPageModule" },
  {
    path: "projects",
    loadChildren: "./pages/projects/projects.module#ProjectsPageModule"
  },
  {
    path: "notifications",
    loadChildren:
      "./pages/notifications/notifications.module#NotificationsPageModule"
  },
  { path: "test", loadChildren: "./test/test.module#TestPageModule" },
  { path: 'request-worker', loadChildren: './pages/projects/request-worker/request-worker.module#RequestWorkerPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'add-worker/:id/:tipo', loadChildren: './pages/projects/add-worker/add-worker.module#AddWorkerPageModule' },
  { path: 'code', loadChildren: './pages/code/code.module#CodePageModule' },
  { path: 'new-project/:tipo', loadChildren: './pages/projects/new-project/new-project.module#NewProjectPageModule' },
  { path: 'createprojects', loadChildren: './pages/projects/createprojects/createprojects.module#CreateprojectsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  { path: 'project-details/:id', loadChildren: './pages/projects/project-details/project-details.module#ProjectDetailsPageModule' },
  { path: 'add-company', loadChildren: './pages/add-company/add-company.module#AddCompanyPageModule' },
  { path: 'edit-user', loadChildren: './pages/profile/edit-user/edit-user.module#EditUserPageModule' },
  { path: 'edit-company', loadChildren: './pages/profile/edit-company/edit-company.module#EditCompanyPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'workers-details/:id', loadChildren: './pages/projects/workers-details/workers-details.module#WorkersDetailsPageModule' },
  { path: 'view-qr', loadChildren: './pages/view-qr/view-qr.module#ViewQrPageModule' },
  { path: 'detailrq/:data', loadChildren: './pages/detailrq/detailrq.module#DetailrqPageModule' },
  { path: 'documents', loadChildren: './pages/documents/documents.module#DocumentsPageModule' },
  { path: 'complete-profile', loadChildren: './pages/complete-profile/complete-profile.module#CompleteProfilePageModule' },
  { path: 'stripe/:id', loadChildren: './pages/stripe/stripe.module#StripePageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
