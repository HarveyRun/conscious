import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  content: string = "";

  ngOnInit(): void {
  }

  getConfig() {
    return {
      base_url: '/tinymce/',
      suffix: '.min',
      language_url: 'assets/langs/zh_CN.js',
      language: 'zh_CN',
      placeholder: '开始编写吧',
      mobile: {
        menubar: false,
        plugins: '',
        toolbar: 'undo redo bold hr cut',
      },
      height: '100%',
      branding: false,
      statusbar: false,
      toolbar_location:"bottom",
      content_style: "img {max-width:100%;}",
    }
  }

}
