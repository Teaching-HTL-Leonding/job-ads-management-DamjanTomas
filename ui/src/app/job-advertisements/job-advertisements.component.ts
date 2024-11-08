import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Advertisements, JobAdvertisementService } from '../job-advertisement.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-advertisements',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './job-advertisements.component.html',
  styleUrl: './job-advertisements.component.css'
})
export class JobAdvertisementsComponent implements OnInit {

  jobAds = signal<Advertisements[] | undefined>(undefined);
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private jobAdvertisementService = inject(JobAdvertisementService);

  ngOnInit(): void {
    this.fetchAds();
  }

  async fetchAds(): Promise<void> {
    try {
      const ads = await this.jobAdvertisementService.getAd();
      this.jobAds.set(ads);
    } catch (error) {
      console.error('Error fetching job advertisements:', error);
    }
  }

  goToDetail(id: number): void {
    this.router.navigate([`/job-ad-detail/${id}`]);
  }

  async deleteAd(id: number): Promise<void> {
    try{
      const ads = await this.jobAdvertisementService.deleteAds(id);
      this.jobAds.set(ads);


    }catch (error) {
      console.error('Error deleting job ads:', error);
    }
  }
}
