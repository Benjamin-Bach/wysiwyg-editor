"use strict"



const pjn = 'wysiwyg'; // project name

document.write('<textarea class=" '  + pjn + ' ">simple texte turbo</textarea>');
document.write('<textarea class=" '  + pjn + ' "><h1 class="title">text html</h1><p>paraph</p></textarea>');

document.write('<style>');
document.write('.' + pjn + '{background:#ddd;display:block;width:100%;height:20vh;}');
document.write('.' + pjn + '-body{background:#ddf;min-height:10rem;}');
document.write('</style>');

// init editor
class editorInit {

  constructor(textarea){
    this.textarea = textarea;
    this.editorTemplate = '<div class="' + pjn + '-editor"><ul></ul><div class="' + pjn + '-body"></div></div>';
    this.switchLinkTemplate = '<a class="switch-link" href="#">switch</a>';
    this.editorBody = '';
  }

  get buildEditor() {
    this.buildToolBar();
    this.editorBody = this.textarea.previousElementSibling.querySelector('.' + pjn + '-body');
    this.buildSwitchLink();
    this.fromTextAreaToEditor();

    let fromEditorToTextarea = this.fromEditorToTextarea;
    let textarea = this.textarea;
    this.editorBody.addEventListener('keyup', function(){
      fromEditorToTextarea(this.innerHTML, textarea);
    });
  }

  buildToolBar(){
    this.textarea.insertAdjacentHTML('beforebegin', this.editorTemplate);
    this.editorBody = this.textarea.previousElementSibling.querySelector('.' + pjn + '-body');
    this.editorBody.contentEditable = true;
  }

  buildSwitchLink(){
    this.textarea.insertAdjacentHTML('afterend', this.switchLinkTemplate);
  }

  fromTextAreaToEditor(){
    let inputOrigin = this.textarea.innerHTML.replace(/&lt;/g , '<').replace(/&gt;/g , '>');
    this.editorBody.innerHTML = inputOrigin;
  }

  fromEditorToTextarea(source, target){
    target.innerHTML = source;
  }

}

for (let textarea of document.querySelectorAll('.' + pjn)) {

  let editorInstance = new editorInit(textarea);
  editorInstance.buildEditor;

}

// buttons
class editorButton { 
  constructor(name) { 
    this.name  = name; 
   }
 }
