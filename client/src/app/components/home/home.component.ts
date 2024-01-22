import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from 'src/app/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videos:any[]=[];

constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }
ngOnInit() {
  setTimeout(()=>
{
this.spinner.hide()
},3000)
  
this.spinner.show()
setTimeout(() => {
  this.spinner.hide()
}, 3000)

interface VideoItem {
  items: { title: string; url: string }[];
}

this.videos = [];
this.youTubeService
  .getVideosForChanel('UCIiFsAO2Gh_vu8OStpjl16A', 8)
  .subscribe(lista => {
    console.log("LISTA YOUTUBE",lista);
    
    (lista as VideoItem).items.forEach(element => {
      this.videos.push(element)
    });

    console.log("VIDEOS", this.videos);

    // for (let element of lista["items"]) {
    //   this.videos.push(element)
    // }
  });
}

}
