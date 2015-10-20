"use strict";function CWebInput(parent,parameters){var ac_attrs,self=this;parameters=extend({style:"web-input main-filter-input",icons:[{name:"ico_search",type:"left",style:"black_search left"},{name:"ico_web",type:"left",style:"web-ico left"},{name:"ico_load",type:"left",style:"load-ico left",src:"ico_waiting2.png"},{name:"site_favicon",type:"left",style:"favicon left",src:"",attributes:{onload:function(){this.loaded=!0},onerror:function(){this.loaded=!1}}},{name:"ico_star_fade",click:function(event){this.FillStar(!0),this.trigger("onStar"),event.stopPropagation()},style:"fade-star"},{name:"ico_star_full",click:function(event){this.FillStar(!1),this.trigger("onUnstar"),event.stopPropagation()},style:"full-star"},{name:"f4",click:function(event){this.trigger("onKey"),event.stopPropagation()}}]},parameters),void 0!==parameters.parent?elchild(parameters.parent,parameters.parent=element("div",{className:"cweb-input-wrapper"})):void 0!==parameters.input&&elchild(parameters.input.parentNode,parameters.parent=element("div",{className:"cweb-input-wrapper"},parameters.input)),CInput.call(this,parent||null,parameters),this.name="CWebInput",parameters.stared&&this.FillStar(!0),("object"==typeof parameters.autocomplete||parameters.autocomplete===!0)&&(parameters.autocomplete===!0&&(parameters.autocomplete={}),ac_attrs=extend(CWebInput.autocomplete_defaults,parameters.autocomplete,!0),void 0===ac_attrs.data&&(ac_attrs.data=function(res){var data=null,result=[];if(res)try{data=JSON.parse(unescape(res))[1],data.sort(function(a){return 0===a[0].indexOf(self.GetValue())?-1:0}),data&&data.forEach(function(el){result.push({title:el[0],hint:_("Search in Google")})}),validateUrl(self.GetValue())?result.unshift({title:self.GetValue(),type:"url",hint:_("Open link")}):(void 0===result[0]||-1===result[0].title.indexOf(self.GetValue()))&&result.unshift({title:self.GetValue(),type:"search",hint:_("Search in Google")})}catch(e){echo(e)}return result}),ac_attrs.base=this.handle,ac_attrs.input=this.input,void 0===ac_attrs.events&&(ac_attrs.events={}),parameters.autocomplete=new CAutocomplete(document.body,ac_attrs)),this.SetAutocomplete(parameters.autocomplete),this.SetState("search"),elchild(parameters.parent,this.$progress_bar=element("div",{className:"progress-bar"})),this.input.oninput=function(oninput){return function(event){""===self.GetValue()&&self.SetState("search"),"function"==typeof oninput&&oninput(event)}}(this.input.oninput)}CWebInput.prototype=Object.create(CInput.prototype),CWebInput.prototype.constructor=CWebInput,CWebInput.prototype.SetFavicon=function(url){url=parseUri(url),this.icons.site_favicon.src=url.protocol+"://"+url.authority+"/favicon.ico"},CWebInput.prototype.SetAutocomplete=function(autocomplete){CInput.prototype.SetAutocomplete.call(this,autocomplete);var title,length,def,self=this;("function"==typeof autocomplete||"object"==typeof autocomplete)&&this.autocomplete.bind({onChange:function(){title=this.GetValue(),def=this.GetDefault(),self.SetValue(title,!0),0===title.indexOf(def)&&(length=def.length,self.SetValue(title,!0),self.input.selectionStart=length,self.input.selectionEnd=title.length),self.ShowHint(!1)},onEnter:function(data){self.trigger("onEnter",data)}})},CWebInput.prototype.SetState=function(type){var self=this;-1!==CWebInput.states.indexOf(type)&&(CWebInput.states.forEach(function(type){self.handle.classList.remove(type)}),this.type=type||CWebInput.states[0],this.handle.classList.add(type))},CWebInput.states=["search","web","load","favicon"],CWebInput.autocomplete_defaults={titleField:"title",hintField:"hint",typeField:"type",size:5,url:"http://www.google.com/s?gs_ri=psy-ab&sclient=psy-ab&tch:=1&q="},CWebInput.prototype.FillStar=function(fill){this.favorite=fill,fill===!0?this.handle.classList.add("favorite"):this.handle.classList.remove("favorite")},CWebInput.prototype.ShowStar=function(show){show===!0?this.handle.classList.add("star"):this.handle.classList.remove("star")},CWebInput.prototype.ShowFavIcon=function(){this.SetState(this.icons.site_favicon.loaded===!0?"favicon":"web")},CWebInput.prototype.SetProgress=function(progress){this.$progress_bar.style.width=void 0!==progress?progress+"%":"0px"},CWebInput.prototype.EventHandler=function(event){eventPrepare(event,!0,"CWebInput");var self=this,event_res=!1;if(this.trigger("onEvent",event)[0]===!0)return!0;switch(event.code){case KEYS.F4:return this.IsFocused()?this.blur():this.focus(),event_res=this.trigger("onKey")[0],!0;case KEYS.EXIT:return this.autocomplete&&this.autocomplete.isVisible===!0?(this.autocomplete.Show(!1),!0):(event_res=this.trigger("onExit")[0],!0);case KEYS.OK:if(this.IsFocused())return gSTB.HideVirtualKeyboard(),this.autocomplete.isVisible===!0?"function"==typeof this.autocomplete.EventHandler&&this.autocomplete.EventHandler(event):(this.autocomplete.Abort(),echo("CWebInput:onEnter"),this.trigger("onEnter",{text:self.GetValue(),type:validateUrl(self.GetValue())?"url":"search"}),this.autocomplete.Clear()),event.preventDefault(),!0;case KEYS.RIGHT:this.input.selectionStart!==this.input.selectionEnd&&this.input.oninput();case KEYS.UP:case KEYS.DOWN:return this.autocomplete&&"function"==typeof this.autocomplete.EventHandler&&this.autocomplete.EventHandler(event),!0}return event_res===!0?!0:void 0};