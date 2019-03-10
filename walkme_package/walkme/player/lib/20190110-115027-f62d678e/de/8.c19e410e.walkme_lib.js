window.walkMeGermany = true;_walkmeWebpackJP([8,9,10],{321:function(t,i,e){(function(t){"use strict";var e=function(){function t(t,e,i,a){this.localStorageService=a,this._dataManagerWasInit=!1,this._siteConfigManager=t,this._clientOrServerStorageManager=e,this._commonUtils=i,this.AG_DATA_COOKIE_NAME=e.keysConfig.attentionGrabber.data.key}return t.prototype.updateSelection=function(t){this.selectedId=t,this.save()},t.prototype.updateEvent=function(){this._eventTimestamp=(new Date).getTime(),this.save()},t.prototype.updateUnload=function(){this.unload=1,this.save()},t.prototype.init=function(){var t=this._clientOrServerStorageManager.getData(this.AG_DATA_COOKIE_NAME),e=(new Date).getTime(),i=this._siteConfigManager.get().Settings,a=parseInt(i.AGDataVersion)||0;if(t){this._sessionTimestamp=e,this.sessionCounter=t.sc||1,this._version=this._commonUtils.isDefined(t.v)?t.v:a,this._shouldUpdateVersion=a>this._version;var r,s=t.st?Math.abs(e-t.st):0;this.localStorageService&&(r=this.localStorageService.getItem(this._clientOrServerStorageManager.keysConfig.attentionGrabber.sessionLength.key)),this._sessionLength=parseFloat(r||i.AGSL||1440),this._shouldUpdateCounter=s/6e4>this._sessionLength,this.isNewSession=this._shouldUpdateCounter||this._shouldUpdateVersion,this.sessionCounter=this._shouldUpdateVersion?1:this._shouldUpdateCounter?this.sessionCounter+1:this.sessionCounter,this._version=this._shouldUpdateVersion?a:t.v,this.selectedId=this.isNewSession?undefined:t.id,this._eventTimestamp=this.isNewSession?e:t.et,this.unload=this.isNewSession?0:t.u,this.eventTimestampDelta=this._eventTimestamp?Math.abs(e-this._eventTimestamp):0}else this.isNewSession=!0,this._sessionTimestamp=e,this.sessionCounter=1,this._version=a,this._eventTimestamp=e,this.unload=0;this._dataManagerWasInit=!0,this.save()},t.prototype.save=function(){if(this._dataManagerWasInit){var t={st:this._sessionTimestamp,sc:this.sessionCounter,v:this._version,id:this.selectedId,et:this._eventTimestamp,u:this.unload};this._clientOrServerStorageManager.saveData(this.AG_DATA_COOKIE_NAME,t,this._clientOrServerStorageManager.keysConfig.attentionGrabber.data.expiry)}},t}();i.AttentionGrabberDataManager=e,t.register("AttentionGrabberDataManager").asCtor(e).dependencies("SiteConfigManager, ClientOrServerStorageManager, CommonUtils, LocalStorageService")}).call(i,e(2))},322:function(t,i,s){(function(e){"use strict";var t=function(){function t(t,e,i,a,r,s,o,n){this.commonUtils=s,this.NEW_CONTENT_PRIORITY=1e3,this._conditionTreeEvaluator=t,this._clientOrServerStorageManager=i,this._publishDataManager=a,this._logger=r,this._agDataManager=e}return t.prototype.init=function(t){if(t.config&&t.player){this._config=t.config,this._player=t.player,this._menu=t.menu;var e=this._config.Settings.AG,i=this._config.Settings.AGs;if(i&&0<i.length)this._agDataManager.init(),this.initAllAGs(i);else if(e){this.create(t).setupAttenGrab()}}},t.prototype.reset=function(){this._agData=this._agClass=this._config=this._player=this._menu=undefined},t.prototype.initAllAGs=function(t){if(this._agDataManager.isNewSession){1===this._agDataManager.sessionCounter&&this._publishDataManager.saveDataVersion();var e=this.getPotentialAGsForNewSession(t);e=e.sort(function(t,e){return t.Priority-e.Priority}),this.updateAGForNewSession(e)}else this.updateAGForOldSession(t);this._agData?(this._logger.customerLog("Attention grabber - name: "+this._agData.Name+", settings:",3),this._logger.customerLog(this._agData.Settings,3)):this._logger.customerLog("Attention grabber: not selected",3);var i="Attention grabber data: session counter = "+this._agDataManager.sessionCounter+", selected AG = "+this._agDataManager.selectedId+", unload AG = "+this._agDataManager.unload+", event timestamp delta = "+this._agDataManager.eventTimestampDelta/1e3+"s, session = "+this._agDataManager.isNewSession;this._logger.customerLog(i,4)},t.prototype.getPotentialAGsForNewSession=function(t){for(var e=[],i=this._agDataManager.sessionCounter,a=0;a<t.length;a++){var r=t[a],s=r.Settings;this.shouldPlayAtSession(i,s)&&(parseInt(s.newContent)?this._publishDataManager.hasNewDeployables()&&(r.Priority-=this.NEW_CONTENT_PRIORITY,e.push(r)):e.push(r))}return e},t.prototype.updateAGForNewSession=function(t){for(var e=0;e<t.length;e++){var i=t[e],a=i.Settings;if(!a.conditions)return this._agData=i,void this._agDataManager.updateSelection(i.Id);if(this._conditionTreeEvaluator.evaluate(a.conditions))return this._agData=i,void this._agDataManager.updateSelection(i.Id)}},t.prototype.updateAGForOldSession=function(t){for(var e=this._agDataManager.sessionCounter,i=0;i<t.length;i++){var a=t[i],r=a.Settings;if(a.Id==this._agDataManager.selectedId){r=a.Settings;if(this.shouldPlayAtSession(e,r)&&this.shouldReplayAG(r))if(r.conditions)this._conditionTreeEvaluator.evaluate(r.conditions)?(this._agData=a,this._agDataManager.updateSelection(a.Id)):this._logger.customerLog("Attention grabber conditions are not satisfied",5);else this._agData=a,this._agDataManager.updateSelection(a.Id);return}}},t.prototype.shouldPlayAtSession=function(t,e){return!!(e&&this.commonUtils.isDefined(e.session)&&this.commonUtils.isDefined(e.interval))&&(!(t<e.session)&&(t==e.session||0!=e.interval&&(t-e.session)%e.interval==0))},t.prototype.shouldReplayAG=function(t){if(this._agDataManager.unload)return!1;if(!t)return!1;var e=this._agDataManager.eventTimestampDelta,i=parseInt(t.replay);if(!i||!e)return!1;var a=60*i*1e3;return t.delay=a<e?0:(a-e)/1e3,!0},t.prototype.load=function(){var a=this;if(this._agData){var r={config:this._config,player:this._player,menu:this._menu,agData:this._agData};s.e(9,function(i){(function(t){var e=[i(323)];(function(){a._agClass=t.create("AttentionGrabber",r),a._agClass.setupAttenGrab()}).apply(null,e)}).call(this,i(2))})}},t.prototype.remove=function(t){this._agClass?(this._agDataManager.updateUnload(),this._agClass.remove(t)):t&&t()},t.prototype.create=function(t){return this._config=t.config,this._player=t.player,this._agClass=e.create("AttentionGrabber",t),this._agClass},t.prototype.getImageAG=function(t){return this._config=t.config,this._player=t.player,this._agClass=e.create("ImageAttentionGrabber",t),this._agClass},t}();i.AttentionGrabberManager=t,e.register("AttentionGrabberManager").asCtor(t).dependencies("ConditionTreeEvaluator, AttentionGrabberDataManager, ClientOrServerStorageManager, PublishDataManager, Logger, CommonUtils, SiteConfigManager, Consts")}).call(i,s(2))},323:function(t,e,i){(function(r){function t(t){var e;if(t.agData)e=t.agData.ClassType;else{var i=t.config.Settings.AG;i&&(e=i.type)}var a={0:"ImageAttentionGrabber",1:"OldSwooshAttentionGrabber",2:"SwooshAttentionGrabber",3:"MenuOverviewAttentionGrabber",4:"TickerAttentionGrabber",5:"CustomTextAttentionGrabber",6:"CustomImageAttentionGrabber","3.sub":"MenuOverviewSubAttentionGrabber"}[e=e||0];return r.create(a,t)}i(324),i(325),i(327),i(328),i(329),i(330),i(331),i(332),i(333),i(326),i(334),i(335),r.register("AttentionGrabber").asFunction(t).asProto(),e.AttentionGrabber=t}).call(e,i(2))},324:function(t,e,i){(function(l){"use strict";var t=function(){function t(t,e,i,a,r,s,o,n,h){this._stopAnimation=!1,this.POSITION="TrianglePosition",this._lib=t,this._commonUtils=e,this._timerManager=i,this._endUsersManager=a,this._auditSourceManager=r,this._hostData=s,this._wmAjax=o,this._safeFullUrlProvider=n,this._storageKeysConfigurations=l.get("StorageKeysConfigurations"),this._config=h.config,this._player=h.player,this._menu=h.menu,this._logger=l.get("Logger"),this._topContainer=l.get("TopContainerProvider").getTopContainer(),h.agData?(this._data=h.agData,this._settings=h.agData.Settings,this._agId=this._data.Id,this._dataManager=l.get("AttentionGrabberDataManager")):(this._oldAG=!0,this._oldAGData=this._commonUtils.getSettingsValue(this._config.Settings,"AG",!1),this._oldAGData&&(this._settings={},this._oldAGData.delay&&(this._settings.delay=this._oldAGData.delay),this._oldAGData.timeout&&(this._settings.duration=this._oldAGData.timeout),this._oldAGData.repeat&&(this._settings.repeat=this._oldAGData.repeat)))}return t.prototype.drawAttentionGrabber=function(){if(this._logger.customerLog("Start drawing attention grabber",5),this._replayTimeoutHandler&&this._replayTimeoutHandler.clear(),this._attentionGrabber=this.getHtml(),this._attentionGrabber){this._attentionGrabberWrapper=wmjQuery("<div id='walkme-attengrab' class='walkme-to-destroy' style='display: none;'/>"),this._attentionGrabberWrapper.append(this._attentionGrabber),this._topContainer.append(this._attentionGrabberWrapper),this._lib.getUiUtils().setLangAttribute(this._attentionGrabberWrapper),this.updateEvent();var t=wmjQuery.proxy(function(){this.postDrawing(),this.hideAfterTimeout(),this._commonUtils.handleAccessibleElement(this._attentionGrabberWrapper,"button")},this);this._timerManager.libSetTimeout(t,100)}},t.prototype.getHtml=function(){},t.prototype.postDrawing=function(){},t.prototype.hideAfterTimeout=function(){var t=parseInt(this._settings.duration);if(t){var e=wmjQuery.proxy(function(){this.hide(),this._stopAnimation=!0},this);this._hideTimeoutHandler=this._timerManager.libSetTimeout(e,1e3*t)}},t.prototype.isSupportedByBrowser=function(){return!0},t.prototype.setupAttenGrab=function(){if(this.isSupportedByBrowser()&&this._settings&&!wmjQuery.isEmptyObject(this._settings)&&!1!==this.innerSetup()){if(this._settings.repeat){var t=this._storageKeysConfigurations.attentionGrabber.repeat.key,e=l.get("AutoStartManager").checkRepeatCookie(t,this._settings.repeat);if(!e.shouldStart)return;e.store()}var i=wmjQuery.proxy(function(){this.drawAttentionGrabber()},this);this._delayTimeoutHandler=this._timerManager.libSetTimeout(i,1e3*parseFloat(this._settings.delay))}},t.prototype.innerSetup=function(){return!0},t.prototype.remove=function(t){try{this._logger.customerLog("Remove attention grabber",5),this._attentionGrabberWrapper&&this._attentionGrabberWrapper.remove(),this.clearTimers(),this.updateEvent(),t&&t()}catch(e){t&&t()}},t.prototype.hide=function(){this.remove(),this.replay()},t.prototype.updateEvent=function(){this._dataManager&&this._dataManager.updateEvent()},t.prototype.replay=function(){var t=parseInt(this._settings.replay);if(t){this._logger.customerLog("Replay attention grabber",5);var e=wmjQuery.proxy(function(){this.drawAttentionGrabber()},this);this._replayTimeoutHandler=this._timerManager.libSetTimeout(e,1e3*t*60)}},t.prototype.getDirection=function(){return this._config.Direction},t.prototype.getDefaultOrFirstTab=function(){for(var t=l.get("UiDataProvider").uiObjectsTree(),e=0;e<t.length;e++)if(t[e].properties().hasProperty("default"))return t[e];for(e=0;e<t.length;e++)if(t[e].properties().hasProperty("visible"))return t[e]},t.prototype.clearTimers=function(){this._delayTimeoutHandler&&this._delayTimeoutHandler.clear(),this._replayTimeoutHandler&&this._replayTimeoutHandler.clear(),this._hideTimeoutHandler&&this._hideTimeoutHandler.clear()},t}();e.AttentionGrabberBase=t,l.register("AttentionGrabberBase").asCtor(t).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(e,i(2))},325:function(t,a,r){(function(e,i){"use strict";var t=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._oppositeDirections={left:"right",right:"left",bottom:"top",top:"bottom"}}return e(t,l),t.prototype.getTemplateData=function(){var t=i.get("LanguageManager");return{title:this.getBalloonTitle(),text:this.getBalloonText(),position:this.getOppositeDirection(this._playerMajorPosition),buttons:this._settings.buttons,direction:this.getDirection(),language:t.getCurrentLanguage()}},t.prototype.getBalloonText=function(){return""},t.prototype.getBalloonTitle=function(){return undefined},t.prototype.setLogicCss=function(){l.prototype.setLogicCss.call(this),this._attentionGrabberWrapper.css("direction",this.getDirection())},t.prototype.bindEvents=function(){l.prototype.bindEvents.call(this);var t=wmjQuery.proxy(this.remove,this);this._xBtn=wmjQuery(".wm-x-button",this._attentionGrabberWrapper),this._xBtn.click(function(){t()})},t.prototype.getHorizontalOffset=function(){return wmjQuery(".wm-outer-arrow",this._attentionGrabberWrapper).outerWidth()},t.prototype.getVerticalOffset=function(){return wmjQuery(".wm-outer-arrow",this._attentionGrabberWrapper).outerHeight()},t.prototype.animate=function(){var i=this._attentionGrabberWrapper,a=this._playerMajorPosition,r=parseInt(i.css(a)),s=r+30+"px",o=this._stopAnimation,n=0,h=this._timerManager.libSetTimeout;!function e(){if(1==n)return n=0,void h(function(){e()},3e3);n++;var t={};t[a]=s,i.animate(t,{easing:"swing",duration:700,complete:function(){h(function(){var t={};t[a]=r+5+"px",i.animate(t,{easing:"easeOutBounce",duration:700,complete:function(){o||h(function(){e()},100)}})},100)}})}()},t.prototype.getOppositeDirection=function(t){return this._oppositeDirections[t]},t.prototype.remove=function(t){try{if(this._attentionGrabberWrapper){this._attentionGrabberWrapper.off("click"),this._xBtn&&this._xBtn.off("click");var e=wmjQuery.proxy(l.prototype.remove,this);this._attentionGrabberWrapper.stop(!0,!0);this._hostData.isIE(8)?l.prototype.remove.call(this,t):this._attentionGrabberWrapper.animate({opacity:0},{duration:300,complete:function(){e(t)}})}else l.prototype.remove.call(this,t)}catch(i){l.prototype.remove.call(this,t)}},t}(r(326).TemplateAttentionGrabber);a.BalloonAttentionGrabber=t,i.register("BalloonAttentionGrabber").asCtor(t).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(a,r(1),r(2))},326:function(t,i,a){(function(e,u){"use strict";var t=function(p){function t(t,e,i,a,r,s,o,n,h){for(var l in p.call(this,t,e,i,a,r,s,o,n,h),this.hostData=s,this.positions=["left","right","top","bottom"],this._templateId=this._data.UITemplateId,this._templateVersion=this._data.UITemplateVersion,this._templateVariations=[],this._data.UIVariationsIds)this._templateVariations.push(u.get("UIVariations").get(this._data.UIVariationsIds[l]));this._data.Settings.customVariation&&this._templateVariations.push(this._data.Settings.customVariation),this._setPositionProxy=wmjQuery.proxy(function(){this.setPosition()},this),this._playerMajorPosition=this._config[this.POSITION].slice(0,this._config[this.POSITION].indexOf("-")),this._agPlayInitiator=u.get("Consts").STEP_PLAY_INITIATOR_ENUM.ATTENTION_GRABBER}return e(t,p),t.prototype.isSupportedByBrowser=function(){return!this._hostData.isIE(7)},t.prototype.getHtml=function(){return u.get("TemplatesFactory").get(this._templateId,this._templateVersion,this._templateVariations,this.getTemplateData())},t.prototype.getTemplateData=function(){return{}},t.prototype.getHorizontalOffset=function(){return 0},t.prototype.getVerticalOffset=function(){return 0},t.prototype.animate=function(){},t.prototype.postDrawing=function(){this.addMainClass(),this._attentionGrabber.show(),this._attentionGrabberWrapper.show(),this.setPosition(),this.bindEvents(),this.animate()},t.prototype.addMainClass=function(){this._attentionGrabber.addClass("wm-ag-"+this._mainClass)},t.prototype.copyCssProperties=function(){for(var t=0;t<this.positions.length;t++)this._attentionGrabberWrapper.css(this.positions[t],this.getCssPosition(this._player,this.positions[t])),this._attentionGrabberWrapper.css("margin-"+this.positions[t],this._player.css("margin-"+this.positions[t]))},t.prototype.fixCssMargins=function(t,e){var i=parseFloat(this._attentionGrabberWrapper.css("margin-left"))||0,a=parseFloat(this._attentionGrabberWrapper.css("margin-right"))||0,r=parseFloat(this._attentionGrabberWrapper.css("margin-top"))||0,s=parseFloat(this._attentionGrabberWrapper.css("margin-bottom"))||0;this._attentionGrabberWrapper.css("margin-left",i+t+"px").css("margin-right",a+t+"px"),this._attentionGrabberWrapper.css("margin-top",r+e+"px").css("margin-bottom",s+e+"px")},t.prototype.getCssPosition=function(t,e){var i,a=t[0].style[e];i=this.hostData.isIE(8)?t[0].currentStyle[e]:t.css(e),t.important(e,"auto");var r=t.css(e);return t.important(e,""),a&&(t[0].style[e]=a),i!=r?i:"auto"},t.prototype.setLogicCss=function(){this._attentionGrabberWrapper.css("z-index"," 2147483647"),this._attentionGrabberWrapper.css("cursor","pointer")},t.prototype.bindEvents=function(){wmjQuery(window).resize(this._setPositionProxy);var t=wmjQuery.proxy(function(){var t={type:this._agPlayInitiator};this._menu.toggle({initiator:t})},this);this._attentionGrabberWrapper.click(t)},t.prototype.unbindEvents=function(){wmjQuery(window).off("resize",this._setPositionProxy)},t.prototype.setPosition=function(){var t,e;this._attentionGrabberWrapper.css("position","fixed"),this.setLogicCss(),"left"==this._playerMajorPosition||"right"==this._playerMajorPosition?(t=this._player.outerWidth()+this.getHorizontalOffset(),e=(this._player.outerHeight()-this._attentionGrabber.outerHeight())/2):"top"!=this._playerMajorPosition&&"bottom"!=this._playerMajorPosition||(t=(this._player.outerWidth()-this._attentionGrabber.outerWidth())/2,e=this._player.outerHeight()+this.getVerticalOffset()),this.copyCssProperties(),this.fixCssMargins(t,e)},t.prototype.remove=function(t){try{this.unbindEvents(),p.prototype.remove.call(this,t)}catch(e){p.prototype.remove.call(this,t)}},t}(a(324).AttentionGrabberBase);i.TemplateAttentionGrabber=t,u.register("TemplateAttentionGrabber").asCtor(t).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(i,a(1),a(2))},327:function(t,a,r){(function(e,i){"use strict";var t=function(g){function t(t,e,i,a,r,s,o,n,h,l,p,u){g.call(this,t,e,i,a,r,s,o,n,u),this.commonEvents=l,this.consts=p,this._mainClass="custom-image",this._resourceManager=h}return e(t,g),t.prototype.getHtml=function(){var t=this._resourceManager.getResourcePath(this._settings.image.url);if(this.isHttpOverHttps(t))return this._logger.customerLog("Attention Grabber - Could not load Custom Image because source is http over https",3),this.commonEvents.raiseEvent(this.consts.EVENTS.AttentionGrabberInsecure,{name:"Custom Image"}),null;var e=i.get("TemplatesFactory").get(this._templateId,this._templateVersion,this._templateVariations,{src:t});return e.height(this._settings.image.height).width(this._settings.image.width),e},t.prototype.setLogicCss=function(){g.prototype.setLogicCss.call(this),this._attentionGrabberWrapper.height(this._settings.image.height).width(this._settings.image.width)},t.prototype.isHttpOverHttps=function(t){return!!t&&(0==window.location.href.indexOf("https://")&&-1==t.indexOf("https://"))},t}(r(326).TemplateAttentionGrabber);a.CustomImageAttentionGrabber=t,i.register("CustomImageAttentionGrabber").asCtor(t).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider, ResourceManager, CommonEvents, Consts")}).call(a,r(1),r(2))},328:function(t,a,r){(function(e,t){"use strict";var i=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._mainClass="custom-text"}return e(t,l),t.prototype.getBalloonText=function(){return this._settings.text||""},t.prototype.setLogicCss=function(){l.prototype.setLogicCss.call(this),wmjQuery(".wm-title",this._attentionGrabber).css("width","auto")},t}(r(325).BalloonAttentionGrabber);a.CustomTextAttentionGrabber=i,t.register("CustomTextAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(a,r(1),r(2))},329:function(t,a,r){(function(e,t){"use strict";var i=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._drawAGWaitForImagesFailCount=0,this._oldAG&&(this._oldAGData.id&&(this._settings.id=this._oldAGData.id),this._oldAGData.filename&&(this._settings.filename=this._oldAGData.filename),this._oldAGData.hOffset&&(this._settings.hOffset=this._oldAGData.hOffset),this._oldAGData.vOffset&&(this._settings.vOffset=this._oldAGData.vOffset))}return e(t,l),t.prototype.getHtml=function(){return wmjQuery("<img src='"+this._settings.filename+"' />")},t.prototype.innerSetup=function(){return this._settings.filename&&(this._settings.filename=this._lib.ResourceManager.getResourcePath(this._settings.filename)),-1!=parseInt(this._settings.id)},t.prototype.postDrawing=function(){this.drawAGWaitForImages()},t.prototype.drawAGWaitForImages=function(){var t,e,i,a=wmjQuery.proxy(this.imageNotLoadedCases,this);if(t=this._player,e=a(),i="1"==t.attr("data-inanimation"),e||i){if(this._drawAGWaitForImagesFailCount++,10<this._drawAGWaitForImagesFailCount)return;var r=wmjQuery.proxy(this.drawAGWaitForImages,this);this._timerManager.libSetTimeout(function(){r()},500)}else this.drawAGPostLoad()},t.prototype.drawAGPostLoad=function(){var t="0px",e="0px",i="auto",a="auto",r="auto",s="auto",o=parseInt(this._settings.hOffset),n=parseInt(this._settings.vOffset),h=(this._player.width()-this._attentionGrabberWrapper.width())/2,l=(this._player.height()-this._attentionGrabberWrapper.height())/2;r=this.handlePosition(r,"bottom",l,n),i=this.handlePosition(i,"top",l,n),a=this.handlePosition(a,"right",h,o),s=this.handlePosition(s,"left",h,o),-1<this._config[this.POSITION].indexOf("center")&&(s="50%",e=this.buildPosition(e,"margin-left",h,o),e=this.dynamicSizeHandler("width",e)),-1<this._config[this.POSITION].indexOf("middle")&&(i="50%",t=this.buildPosition(t,"margin-top",l,n),t=this.dynamicSizeHandler("height",t)),this._attentionGrabberWrapper.css({position:"fixed",top:i,right:a,bottom:r,left:s,"margin-top":t,"margin-right":"0px","margin-bottom":"0px","margin-left":e}),this._attentionGrabberWrapper.show()},t.prototype.handlePosition=function(t,e,i,a){return-1<this._config[this.POSITION].indexOf(e)&&(t=this.buildPosition(t,e,i,a)),t},t.prototype.buildPosition=function(t,e,i,a){return t=parseFloat(this._player.css(e).replace("px","")),t+=i,t+=a,t+="px"},t.prototype.dynamicSizeHandler=function(t,e){return this._player.hasClass("walkme-dynamic-size")&&(e=parseFloat(e.replace("px",""))+this._player.css(t).replace("px","")/2*-1),e},t.prototype.imageNotLoadedCases=function(){return 0==this._player.width()||28==this._player.width()||0==this._attentionGrabberWrapper.width()||28==this._attentionGrabberWrapper.width()||24==this._attentionGrabberWrapper.width()&&24==this._attentionGrabberWrapper.width()},t}(r(324).AttentionGrabberBase);a.ImageAttentionGrabber=i,t.register("ImageAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(a,r(1),r(2))},330:function(t,i,a){(function(e,u){"use strict";var t=function(p){function t(t,e,i,a,r,s,o,n,h){p.call(this,t,e,i,a,r,s,o,n,h),this._balloonsData={0:{classType:"3.sub",title:"Meet WalkMe!",text:"Your New Personal Assistant.",buttonText:"Start",position:"bottom-center",firstBalloon:!0},1:{classType:"3.sub",text:"The WalkMe menu is the place to get all the help you might need.",boldText:'Click "Next" and take a look...',buttonText:"Next",position:"bottom-center",delay:1,marginBottom:3},2:{classType:"3.sub",text:"Here you can select your preferred language.",boldText:'Click "Next" to continue...',buttonText:"Next",position:"bottom-center",attachedToElementSelector:"#walkme-languages",moveArrow:!0},3:{classType:"3.sub",text:"Quickly find answers to your support issue by using the search bar.",boldText:'Click "Next" to continue...',buttonText:"Next",position:"right-middle",attachedToElementSelector:".walkme-search-box-container",marginRight:12},4:{classType:"3.sub",text:"All the Walk-Thrus and help resources are located here, click them to start your online guidance.",boldText:'Click "Next" to continue...',buttonText:"Next",position:"right-middle",attachedToElementSelector:".walkme-deployables-list .walkme-tab .walkme-deployable",marginRight:14},5:{classType:"3.sub",text:"Couldn't find what you want? this link takes you to the support page.",boldText:"To learn more about WalkMe, click here.",buttonText:"Next",position:"bottom-center",attachedToElementSelector:".walkme-open-ticket",moveArrow:!0},6:{classType:"3.sub",title:"Thank You!",text:"We're here to help.",buttonText:"Done",position:"bottom-center",marginBottom:3}},this._stepIndex=0,this._themeVariation=this._data.ExtraUIVariationsIds[0],this._balloonsData[0].position=this._config[this.POSITION],this._balloonsData[0].delay=this._settings.delay,this._agPlayInitiator=u.get("Consts").STEP_PLAY_INITIATOR_ENUM.ATTENTION_GRABBER;var l=wmjQuery.proxy(this.updateJqueryMenu,this);this._menu.bind("build-menu-end",function(t,e){l(e.menu)})}return e(t,p),t.prototype.updateJqueryMenu=function(t){this._jQueryMenu=t},t.prototype.createAg=function(t,e){var i=wmjQuery.proxy(this.showNextBalloon,this),a=wmjQuery.proxy(function(){var t=wmjQuery.proxy(function(){if(i(),1==this._stepIndex){var t={type:this._agPlayInitiator};WalkMePlayerAPI.toggleMenu(t)}},this);s.remove(t)},this),r={config:{Direction:this._config.Direction},player:t,menu:this._menu,onClickFunc:a,agData:{Id:e.firstBalloon?this._agId:null,ClassType:e.classType,UITemplateId:this._data.UITemplateId,UITemplateVersion:this._data.UITemplateVersion,UIVariationsIds:[this._themeVariation,this._data.ExtraUIVariationsIds[this._stepIndex+1]],Settings:{delay:e.delay,text:e.text,title:e.title,boldText:e.boldText,buttons:[{text:e.buttonText}],firstBalloon:e.firstBalloon,attachedToElementSelector:e.attachedToElementSelector,jQueryMenu:this._jQueryMenu,moveArrow:e.moveArrow,marginRight:e.marginRight,marginBottom:e.marginBottom}}};r.config[this.POSITION]=e.position;var s=u.create("AttentionGrabber",r);(this._currentAg=s).setupAttenGrab()},t.prototype.showNextBalloon=function(){if(!this._stopPlaying&&(this._stepIndex++,this._balloonsData[this._stepIndex]))if(this.shouldPlay())if(this._jQueryMenu)this.createAg(this._jQueryMenu,this._balloonsData[this._stepIndex]);else{var i=wmjQuery.proxy(function(t){this._jQueryMenu=t,this.createAg(t,this._balloonsData[this._stepIndex])},this);this._menu.bind("on-open-end",function(t,e){t.target.unbind("on-open-end"),i(e.menu)})}else this.showNextBalloon()},t.prototype.shouldPlay=function(){var t=this._balloonsData[this._stepIndex].attachedToElementSelector;return!t||0<wmjQuery(t+":visible",this._jQueryMenu).length},t.prototype.setupAttenGrab=function(){if(this.isWalkthrusTab()&&"iOS"!=this._hostData.os.name&&"Android"!=this._hostData.os.name){var e=wmjQuery.proxy(this.stopAll,this);this._menu.bind("on-close-begin",function(t){e()}),this.createAg(this._player,this._balloonsData[0])}},t.prototype.isWalkthrusTab=function(){var t=this.getDefaultOrFirstTab().properties().getAll();return-1<wmjQuery.inArray("contains-walkthru",t)},t.prototype.stopAll=function(){this._stopPlaying=!0,this._currentAg.remove()},t.prototype.remove=function(t){this._currentAg&&this._currentAg.remove(),p.prototype.remove.call(this,t)},t}(a(324).AttentionGrabberBase);i.MenuOverviewAttentionGrabber=t,u.register("MenuOverviewAttentionGrabber").asCtor(t).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(i,a(1),a(2))},331:function(t,e,a){(function(e,t){"use strict";var i=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._mainClass="menu-overview",this._arrowOffset=0,this._onClickFunc=h.onClickFunc}return e(t,l),t.prototype.getTemplateData=function(){return{title:this._settings.title,"bold-text":this._settings.boldText,text:this._settings.text,position:this.getOppositeDirection(this._playerMajorPosition),buttons:this._settings.buttons}},t.prototype.setLogicCss=function(){l.prototype.setLogicCss.call(this),this.moveArrow(),this._data.Settings.firstBalloon||this._attentionGrabberWrapper.css("cursor","auto")},t.prototype.moveArrow=function(){if(this._data.Settings.moveArrow){var t=wmjQuery(".wm-outer-arrow",this._attentionGrabberWrapper),e=wmjQuery(".wm-inner-arrow",this._attentionGrabberWrapper),i=t.offset().left;t.css("left");t.css("left","85%"),e.css("left","85%");var a=t.offset().left-i;this._arrowOffset=a,this._data.Settings.moveArrow=!1}},t.prototype.bindEvents=function(){l.prototype.bindEvents.call(this),this._attentionGrabberWrapper.off("click"),wmjQuery(".wm-button",this._attentionGrabberWrapper).click(this._onClickFunc),this._fixPositionProxy=wmjQuery.proxy(this.fixPosition,this),wmjQuery(window).resize(this._fixPositionProxy),this._data.Settings.firstBalloon&&this._attentionGrabberWrapper.click(this._onClickFunc)},t.prototype.unbindEvents=function(){l.prototype.unbindEvents.call(this),wmjQuery(window).off("resize",this._fixPositionProxy)},t.prototype.animate=function(){this.fixPosition(),this._data.Settings.firstBalloon&&l.prototype.animate.call(this)},t.prototype.fixPosition=function(){var t=this._attentionGrabberWrapper.css("margin-bottom"),e=this._attentionGrabberWrapper.css("margin-right"),i=this._data.Settings.marginRight||0,a=this._data.Settings.marginBottom||0;if(this._data.Settings.attachedToElementSelector){var r=this._data.Settings.jQueryMenu,s=wmjQuery(this._data.Settings.attachedToElementSelector,r),o=s.offset().left-r.offset().left,n=s.offset().top-r.offset().top;if("bottom"==this._playerMajorPosition){this._attentionGrabberWrapper.width();var h=r.width(),l=this._attentionGrabberWrapper.css("margin-bottom"),p=s.width(),u=(s.css("margin-right"),s.css("margin-top"),parseFloat(e)+h/2-o-p/2+this._arrowOffset+i);this._attentionGrabberWrapper.css("margin-right",u+"px").css("margin-bottom",parseFloat(l)-n+a+"px")}else{var g=r.height(),c=(r.css("border-left-width"),s.css("margin-right"),s.height());u=parseFloat(t)+g/2-n-c/2+a;this._attentionGrabberWrapper.css("margin-right",parseFloat(e)-o+i+"px").css("margin-bottom",u+"px")}}else this._attentionGrabberWrapper.css("margin-right",parseFloat(e)+i+"px").css("margin-bottom",parseFloat(t)+a+"px")},t}(a(328).CustomTextAttentionGrabber);t.register("MenuOverviewSubAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(e,a(1),a(2))},332:function(t,a,r){(function(e,t){"use strict";var i=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._defaultValues={animationDuration:700},this._oldAG&&this._oldAGData.settings&&(this._oldAGData.settings.width&&(this._settings.width=this._oldAGData.settings.width),this._oldAGData.settings.right&&(this._settings.right=this._oldAGData.settings.right),this._oldAGData.settings.deg&&(this._settings.deg=this._oldAGData.settings.deg),this._oldAGData.settings.dir&&(this._settings.dir=this._oldAGData.settings.dir,this._direction=this._oldAGData.settings.dir),this._oldAGData.settings.opacity&&(this._settings.opacity=this._oldAGData.settings.opacity))}return e(t,l),t.prototype.isSupportedByBrowser=function(){return!this._hostData.isIE(9,"lte")},t.prototype.getHtml=function(){var t,e;this.isHorizental()?(t=this._settings.width+"px",e="130%"):(e=this._settings.width+"px",t="130%");var i=this._settings.opacity,a=this._settings.deg;return wmjQuery("<div class='wm-ag-swoosh' style='width: "+t+"; height:"+e+"; position: absolute; top:-6px; right: -6px; background-color: transparent !important; "+this.getRotateCss(a)+this.getBackgoundCss(i)+"'/>")},t.prototype.postDrawing=function(){var t=this._settings.right;this._attentionGrabberWrapper.detach().appendTo(this._player);var e=this.isHorizental()?"width":"height",i=this._player.css(e);this._attentionGrabberWrapper.css({position:"absolute",overflow:"hidden",width:"100%",height:"100%","z-index":this._player.css("z-index"),right:"0",bottom:"auto",top:"0"}).important("background","none"),this._attentionGrabber.show(),this._attentionGrabberWrapper.show();var a=this.getProperty("animationDuration");this.animate(i,t,a)},t.prototype.animate=function(e,a,r){var s=this._attentionGrabber,o=this.isHorizental()?"right":"top",n=this._timerManager;s.css(o,a+"px");var h=1.3*parseFloat(e)+"px";!function t(){var e={};e[o]=h,s.animate(e,r);var i=this._stopAnimation;n.setWalkmeTimeout(function(){var t={};t[o]=a+"px",s.animate(t,r)},1e3),i||n.setWalkmeTimeout(t,4e3)}()},t.prototype.isHorizental=function(){return"hoz"==this._direction},t.prototype.getProperty=function(t){return this._settings[t]||this._defaultValues[t]},t.prototype.getBackgoundCss=function(t){return"background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjkxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, rgba(255,255,255,"+t+") 50%, rgba(255,255,255,0) 100%);background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,"+t+")), color-stop(100%,rgba(255,255,255,0)));background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,"+t+") 50%,rgba(255,255,255,0) 100%);background: -o-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,"+t+") 50%,rgba(255,255,255,0) 100%);background: -ms-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,"+t+") 50%,rgba(255,255,255,0) 100%);background: linear-gradient(to right,  rgba(255,255,255,0) 0%,rgba(255,255,255,"+t+") 50%,rgba(255,255,255,0) 100%);"},t.prototype.getRotateCss=function(t){return"transform: rotate("+t+"deg); -moz-transform:rotate("+t+"deg); -webkit-transform:rotate("+t+"deg); -o-transform:rotate("+t+"deg);  -ms-transform:rotate("+t+"deg);"},t}(r(324).AttentionGrabberBase);a.OldSwooshAttentionGrabber=i,t.register("OldSwooshAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(a,r(1),r(2))},333:function(t,a,r){(function(e,t){"use strict";var i=function(l){function t(t,e,i,a,r,s,o,n,h){l.call(this,t,e,i,a,r,s,o,n,h),this._mainClass="ag",this._animationDuration=this._settings.animationDuration||700}return e(t,l),t.prototype.isSupportedByBrowser=function(){return!this._hostData.isIE(9,"lte")},t.prototype.postDrawing=function(){this._attentionGrabberWrapper.detach().appendTo(this._player),this._attentionGrabberWrapper.css({position:"absolute",overflow:"hidden",width:"100%",height:"100%","z-index":this._player.css("z-index"),right:"0",bottom:"auto",top:"0"}).important("background","none"),this._attentionGrabber.show(),this._attentionGrabberWrapper.show(),this.animate()},t.prototype.animate=function(){var i=this._attentionGrabber,a=this._animationDuration,r=this._timerManager,e=this.isHorizental(),s=e?"right":"top",o="-60px";i.css(s,o);var n=e?"width":"height",h=1.3*parseFloat(this._player.css(n))+"px",l=this._stopAnimation;this.initAnimationProperties(e),function t(){var e={};e[s]=h,i.animate(e,a),r.setWalkmeTimeout(function(){var t={};t[s]=o,i.animate(t,a)},1e3),l||r.setWalkmeTimeout(t,4e3)}()},t.prototype.initAnimationProperties=function(t){t?this.setInitCss("15deg","50px","130%"):this.setInitCss("105deg","130%","50px")},t.prototype.setInitCss=function(t,e,i){this._attentionGrabber.css({height:i,width:e,transform:"rotate("+t+")","-moz - transform":"rotate("+t+")","-webkit - transform":"rotate("+t+")","-o - transform":"rotate("+t+")","-ms - transform":"rotate("+t+")"})},t.prototype.isHorizental=function(){return this._player.width()>this._player.height()},t}(r(326).TemplateAttentionGrabber);a.SwooshAttentionGrabber=i,t.register("SwooshAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider")}).call(a,r(1),r(2))},334:function(t,a,r){(function(e,t){"use strict";var i=function(d){function t(t,e,i,a,r,s,o,n,h,l){d.call(this,t,e,i,a,r,s,o,n,l),this.htmlDecoder=h,this._mainClass="ticker",this._textItems=[],this.MAX_DEPLOYABLES_TO_SHOW=5;var p=this.getDefaultOrFirstTab();if(p)for(var u=p.children(),g=0,c=0;c<u.length;c++){var m=u[c];if(m.properties().hasProperty("visible")&&(this._textItems.push(m.name()),g++),g==this.MAX_DEPLOYABLES_TO_SHOW)break}this._currentDeployableIndex=0}return e(t,d),t.prototype.setupAttenGrab=function(){0!==this._textItems.length&&d.prototype.setupAttenGrab.call(this)},t.prototype.getBalloonTitle=function(){return"Help me with..."},t.prototype.getBalloonText=function(){return this._textItems[this._currentDeployableIndex]},t.prototype.getDeployableText=function(){var t=this._textItems[this._currentDeployableIndex];return this._currentDeployableIndex<Math.min(this.MAX_DEPLOYABLES_TO_SHOW,this._textItems.length)-1?this._currentDeployableIndex++:this._currentDeployableIndex=0,t},t.prototype.animate=function(){if(this._hostData.isIE(8))this.innerAnimate();else{this._attentionGrabberWrapper.css({opacity:0});var t=wmjQuery.proxy(this.innerAnimate,this);this._attentionGrabberWrapper.animate({opacity:1},{duration:300,complete:t})}},t.prototype.innerAnimate=function(){var t=wmjQuery(".wm-title",this._attentionGrabber),e={opacity:1};this.fixOpacityForIe8(e),t.css(e);var i=this._stopAnimation;t.text(this.htmlDecoder.decodeHtml(this.getDeployableText(),["&",'"',"'",">","<"]));var a=wmjQuery.proxy(this.innerAnimate,this),r=this._timerManager.libSetTimeout;t.animate(e,{duration:700,complete:function(){r(function(){t.animate({opacity:0},{duration:700,complete:function(){i||a()}})},2e3)}})},t.prototype.getDirection=function(){return"ltr"},t.prototype.fixOpacityForIe8=function(t){this._hostData.isIE(8)&&(t.opacity=.99)},t}(r(325).BalloonAttentionGrabber);a.TickerAttentionGrabber=i,t.register("TickerAttentionGrabber").asCtor(i).asProto().dependencies("Lib, CommonUtils, TimerManager, EndUsersManager, AuditSourceManager, HostData, WmAjax, SafeFullUrlProvider, HtmlDecoder")}).call(a,r(1),r(2))},335:function(t,e,i){(function(t){}).call(e,i(2))}});
