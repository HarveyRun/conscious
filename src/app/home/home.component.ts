import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/common/service/HttpService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private http: HttpService
  ) {

  }

  content: string = '';

  ngOnInit(): void {

  }

  uploadImgs(params:any): void{
    console.dir(params);
    this.http.doPost('/upload?token=3ba4756f11b04dff8e321a1936775f6d', params).subscribe((data: any) => {
      this.content = this.content + `<img src="${data.url}"/>`;
      this.ref.markForCheck();
      this.ref.detectChanges();
    }, err => {
      console.log(err.error, 'xxx');
    });
  }



  getConfig() {
    return {
      base_url: '/tinymce/',
      suffix: '.min',
      language_url: 'assets/langs/zh_CN.js',
      language: 'zh_CN',
      placeholder: '开始编写吧',
      setup: (editor:any) => {
        editor.ui.registry.addButton('myCustomImageUpload', {
          text: '',
          icon: 'image',
          onAction: () => {
            console.dir(this);
            let filetype =
              '.jpg, .jpeg, .png, .gif';
            let input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('style', 'display:none')
            input.setAttribute('accept', filetype)
            input.click()
            input.onchange = ()=> {
              let formData = new FormData();
              let fileList:any = input['files'];
              formData.append('file', fileList[0])
              this.uploadImgs(formData);
            }
          }
        });
      },
      menubar: false,
      plugins: 'image lists emoticons code',
      toolbar: 'undo redo bold myCustomImageUpload checklist justifying formatting code',
      toolbar_groups: {
        formatting: {
          icon: 'plus',
          tooltip: 'Formatting',
          items: 'h1 h2 h3 h4 h5 h6 italic underline strikethrough hr emoticons'
        },
        justifying: {
           icon: 'align-justify',
           tooltip: 'Justifying',
           items: 'alignleft aligncenter alignright bullist numlist'
        }
      },
      emoticons_database: 'emojis',
      height: '100%',
      branding: false,
      statusbar: false,
      toolbar_location:"top",
      content_style: "img {max-width:100%;}",
    }
  }

}
