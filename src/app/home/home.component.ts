import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/common/service/HttpService';
import tinymce from "tinymce";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private http: HttpService,
  ) {

  }

  content: string = '';

  ngOnInit(): void {
     this.tinymceInit();
  }

  tinymceInit(){
    tinymce.init({
      selector: '#basic-editor',
      height: "calc(100vh - 48px)",
      base_url: "/tinymce",
      suffix: '.min',
      language_url: 'assets/langs/zh_CN.js',
      language: 'zh_CN',
      mobile:{
         toolbar_mode:"floating"
      },
      placeholder: '开始编写吧',
      setup: (editor:any) => {
        editor.on('focus', function () {
          console.log('Editor was focused');
        });
        editor.on('blur', function () {
          console.log('Editor was blur');
        });
        editor.on('init', function(e:any) {
          editor.getBody().style.fontSize = '16px';
          editor.getBody().style.color = '#000000';
          editor.getBody().style.fontFamily = 'Helvetica';
        });
        editor.ui.registry.addButton('writeFinish', {
          text: '',
          icon: 'checkmark',
          onAction: () => {
            console.dir(tinymce.activeEditor.getContent({ format: 'raw' })); //获取带HTML的文本
            console.dir(tinymce.activeEditor.getContent({ format: 'text' })); //获取纯文本
            console.dir(tinymce.get("basic-editor").targetElm.blur());
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
      plugins: 'image lists emoticons code autosave codesample table charmap link',
      toolbar: 'undo redo bold forecolor myCustomImageUpload bullist checklist justifying formatting writeFinish',
      toolbar_groups: {
        formatting: {
          icon: 'plus',
          tooltip: 'Formatting',
          items: 'fontsize h1 h2 h3 h4 h5 h6 italic underline strikethrough | table link | emoticons charmap codesample'
        },
        justifying: {
          icon: 'align-justify',
          tooltip: 'Justifying',
          items: 'alignleft aligncenter alignright | hr outdent indent numlist'
        }
      },
      emoticons_database: 'emojis',
      font_size_formats: "12px 14px 16px 18px 20px 24px 36px 48px 56px 72px",
      branding: false,
      statusbar: false,
      toolbar_location:"bottom",
      content_style: "img {max-width:100%;}",
    });
  }

  uploadImgs(params:any): void{
    let saveCodeing = tinymce.activeEditor.getContent({format:"raw"});
    this.http.doPost('/upload?token=3ba4756f11b04dff8e321a1936775f6d', params).subscribe((data: any) => {
      tinymce.activeEditor.setContent(`${saveCodeing}<img src="${data.url}"/>`);
      this.ref.markForCheck();
      this.ref.detectChanges();
    }, err => {
      console.log(err.error, 'xxx');
    });
  }

}
