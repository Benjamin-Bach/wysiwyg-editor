"use strict"



const pjn = 'wysiwyg'; // project name

document.write('<textarea class=" '  + pjn + ' ">simple texte turbo</textarea>');
document.write('<textarea class=" '  + pjn + ' "><h1 class="title">text html</h1><p>paraph</p></textarea>');

document.write('<style>');
document.write('.' + pjn + '{background:#ddd;display:block;width:100%;height:20vh;}');
document.write('.' + pjn + '-body{background:#ddf;min-height:10rem;}');
document.write('</style>');

/*
let textareas = document.querySelectorAll('.' + pjn);

let editorTemplate = '<div class="' + pjn + '-editor"><ul></ul><div class="' + pjn + '-body"></div></div>';
let switchLinkTemplate = '<a class="switch-link" href="#">switch</a>';

// init...
(() => {
  for(let textarea of textareas){

    let inputOrigin = textarea.innerHTML.replace(/&lt;/g , '<').replace(/&gt;/g , '>');

    textarea.insertAdjacentHTML('beforebegin', editorTemplate);
    textarea.insertAdjacentHTML('afterend', switchLinkTemplate);

    textarea.previousElementSibling.querySelector('.' + pjn + '-body').innerHTML = inputOrigin;
    textarea.previousElementSibling.querySelector('.' + pjn + '-body').contentEditable = true;

    textarea.style.display = 'none';

textarea.previousElementSibling.querySelector('.' + pjn + '-body').addEventListener(
  'click',
  function(){
    fromEditorToTextarea(this.innerHTML);
  }
);

    
  
  }
})()
*/
class editorInit {

  constructor(textarea){
    this.textarea = textarea;
    this.editorTemplate = '<div class="' + pjn + '-editor"><ul></ul><div class="' + pjn + '-body"></div></div>';
    this.switchLinkTemplate = 'my link';
    this.editorBody = '';
  }

  get buildEditor() {
    this.buildToolBar();
    this.buildSwitchLink();
    this.fromTextAreaToEditor();
  }

  buildToolBar(){
    this.textarea.insertAdjacentHTML('beforebegin', this.editorTemplate);
    this.editorBody = this.textarea.previousElementSibling.querySelector('.' + pjn + '-body');
  }

  buildSwitchLink(){
    this.textarea.insertAdjacentHTML('afterend', this.switchLinkTemplate);
  }

  fromTextAreaToEditor(){
    let inputOrigin = this.textarea.innerHTML.replace(/&lt;/g , '<').replace(/&gt;/g , '>');
    this.editorBody.innerHTML = inputOrigin;
  }

}

for (let textarea of document.querySelectorAll('.' + pjn)) {

  let editorInstance = new editorInit(textarea);
  editorInstance.buildEditor;

}
// var test = new editorInit(document.querySelector('.' + pjn));
// test.buildEditor;

// switch link



// save
function fromEditorToTextarea(arg){
  console.log(arg);
}



// buttons
class editorButton { 
  constructor(name) { 
    this.name  = name; 
   }
 }
