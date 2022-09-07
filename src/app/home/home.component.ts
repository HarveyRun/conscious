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
        editor.on('init', function(e:any) {
          editor.getBody().style.fontSize = '16px';
          editor.getBody().style.color = '#000000';
          editor.getBody().style.fontFamily = 'Helvetica';
        });
        editor.ui.registry.addButton('writeFinish', {
          text: '',
          icon: 'checkmark',
          onAction: () => {
             alert("完成了编写");
          }
        });
        editor.ui.registry.addButton('myCustomImageUpload', {
          text: '',
          icon: 'image',
          onAction: () => {
            let filetype = ".jpg, .jpeg, .png, .gif";
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
      plugins: 'image lists emoticons code autosave codesample table charmap link export',
      toolbar: 'undo redo bold forecolor myCustomImageUpload bullist checklist justifying formatting writeFinish',
      toolbar_groups: {
        formatting: {
          icon: 'plus',
          tooltip: 'Formatting',
          items: 'fontsize h1 h2 h3 h4 h5 h6 italic underline strikethrough | table link | emoticons charmap codesample | export'
        },
        justifying: {
           icon: 'align-justify',
           tooltip: 'Justifying',
           items: 'hr outdent indent numlist | alignleft aligncenter alignright'
        }
      },
      emoticons_database: 'emojis',
      font_size_formats: "12px 14px 16px 18px 20px 24px 36px 48px 56px 72px",
      height: '100%',
      branding: false,
      statusbar: false,
      toolbar_location:"top",
      content_style: "img {max-width:100%;}",
    }
  }

}
