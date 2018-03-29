"use strict"

// tools
function getMP(obj){
	if(typeof obj == 'string'){
		console.log(obj);
	}else{
		for(let item in obj){
			if(typeof obj[item] == 'function'){
				console.log('fn :' + item);
			}else{
				console.log(item + ' : ' + obj[item]);
			}
		}
	}
}


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

    // let fromEditorToTextarea = this.fromEditorToTextarea;
    // let textarea = this.textarea;
    let $this = this;
    this.editorBody.addEventListener('keyup', function(e){
    	$this.fromEditorToTextarea(this.innerHTML, $this.textarea);
    	// $this.saveSelected(e);
    });
    document.addEventListener('mouseup', function(e){
    	// $this.saveSelected(e);
    });
    document.addEventListener('selectionchange', function(e){
    	$this.saveSelected(e);
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
  
  saveSelected(event){
  	let selected = document.getSelection();
  	let range = selected.getRangeAt(0);
  	let parentTagName = window.getSelection().anchorNode.parentNode.tagName;
  	getMP(range);
  	getMP(event.type);
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

}

new editorButton('italic').buildButton;
new editorButton('bold').buildButton;