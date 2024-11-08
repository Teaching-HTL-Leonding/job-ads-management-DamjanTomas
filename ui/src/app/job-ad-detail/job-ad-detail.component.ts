import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  Advertisements, JobAdvertisementService, Translation } from '../job-advertisement.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-job-ad-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './job-ad-detail.component.html',
  styleUrl: './job-ad-detail.component.css'
})
export class JobAdDetailComponent {
  private service: JobAdvertisementService = inject(JobAdvertisementService);
  id = signal<number>(-1);
  title = signal<string>('');
  textEN = signal<string>('');
  translation = signal<Translation[]>([]);
  translatedText = signal<string>('');
  lang = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.setAdProperties(parseInt(id));
    }
  }
  async setAdProperties(id: number) {
    const ad: Advertisements = await this.service.getAdDetails(id);
    this.title.set(ad.title);
    this.id.set(ad.id);
    this.textEN.set(ad.textEN);
    this.translation.set(ad.translation);
  }

  returnToAllAds() {
    this.router.navigate(['/job-advertisements']);
  }

  updateAds() {
    const ad: Advertisements = {
      id: this.id(),
      title: this.title(),
      translation: this.translation(),
      textEN: this.textEN(),
    };
    this.service.updateAd(ad);
  }
}
