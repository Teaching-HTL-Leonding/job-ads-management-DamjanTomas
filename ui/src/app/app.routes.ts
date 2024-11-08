import { Routes } from '@angular/router';
import { JobAdvertisementsComponent } from './job-advertisements/job-advertisements.component';
import { JobAdDetailComponent } from './job-ad-detail/job-ad-detail.component';

export const routes: Routes = [
  {path: 'job-advertisements', component: JobAdvertisementsComponent},
  {path: 'job-ad-detail/:id', component: JobAdDetailComponent},
  {path: '', redirectTo: '/job-advertisements', pathMatch: 'full'}
];
