"use strict"


const pjn = 'wysiwyg'; // project name

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

document.onmouseup = document.onkeyup = document.onselectionchange = function() {
  console.log(window.getSelection());
};