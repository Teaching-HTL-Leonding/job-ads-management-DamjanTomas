import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

export type Advertisements =
{

  title: string,
  textEN:  string,
  id: number,
  translation: Translation[]
}

export type Translation = {
  language: string;
  translatedText: string;
};



@Injectable({
  providedIn: 'root'
})
export class JobAdvertisementService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  async getAd(): Promise<Advertisements[]> {
    return firstValueFrom(
      this.httpClient.get<Advertisements[]>(`${this.apiUrl}/ads`)
    );
  }

  async deleteAds(id: number): Promise<Advertisements[]> {
    return firstValueFrom(
      this.httpClient.delete<Advertisements[]>(`${this.apiUrl}/ads/${id}`)
    );
  }

  async getAdDetails(id: number): Promise<Advertisements> {
    return firstValueFrom(
      this.httpClient.get<Advertisements>(`${this.apiUrl}/ads/${id}`)
    );
  }

  public updateAd(ad: Advertisements): Promise<void> {
    return firstValueFrom(
      this.httpClient.patch<void>(`${this.apiUrl}/ads/${ad.id}`, ad)
    );
  }
}
