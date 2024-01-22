import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  items:any[]=[];


  apiKey : string = 'AIzaSyDOLyvi0uDFr7cp-YkMjrPkYdy0uKzxkHk';

  constructor(public http: HttpClient) { }

    getVideosForChanel(channel:any, maxResults:any): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}