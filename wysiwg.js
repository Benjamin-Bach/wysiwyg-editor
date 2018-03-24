"use strict"



const pjn = 'wysiwyg'; // project name

document.write('<textarea class=" '  + pjn + ' ">simple texte turbo</textarea>');
document.write('<textarea class=" '  + pjn + ' "><h1 class="title">text html</h1><p>paraph</p></textarea>');

document.write('<style>');
document.write('.' + pjn + '{background:#ddd;display:block;width:100%;height:20vh;}');
document.write('.' + pjn + '-body{box-shadow:inset 0 0 10px rgba(0,0,0,0.3); min-height:10rem;margin:0px; padding:0.3rem;}');
document.write('.' + pjn + '-editor > ul {margin:0px;}');
document.write('.' + pjn + '-editor > ul li{display:inline-block; padding:0.5rem 1rem; }');
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
    this.buildEditorMarkup();
    this.editorBody = this.textarea.previousElementSibling.querySelector('.' + pjn + '-body');
    this.buildSwitchLink();
    this.fromTextAreaToEditor();

    let fromEditorToTextarea = this.fromEditorToTextarea;
    let textarea = this.textarea;
    this.editorBody.addEventListener('keyup', function(){
      fromEditorToTextarea(this.innerHTML, textarea);
    });
  }

  buildEditorMarkup(){
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
  new editorInit(textarea).buildEditor;
}

// buttons
class editorButton { 

  constructor(name) { 
    this.name  = name;
    this.toolsBars = document.querySelectorAll('.' + pjn + '-editor ul');
  }

  get buildButton() {
    for (let toolsBar of this.toolsBars) {
      let btn = document.createElement('LI');
      let text = document.createTextNode(this.name);
      let getSelected = this.getSelected;
      btn.appendChild(text);
      let $this = this;
      btn.addEventListener('click', function(){
        getSelected($this);
      });
      toolsBar.appendChild(btn);
    }
  }

  getSelected($this){
      let selected = document.getSelection();
      let range = selected.getRangeAt(0);
      console.log(range);
  }

}

new editorButton('italic').buildButton;
new editorButton('bold').buildButton;
