function PTS_SearchUI() { }

PTS_SearchUI.prototype = {
 
 initSearch: function (inputParamJSON){
 var params = JSON.parse(inputParamJSON); gsrchRslt = null; this.ptsOpenSearchInModal = params.openSearchInModal;  this.ptsSearchCategory = params.searchcategory; this.inputDelayTime = null; this.ptsincludeHiddenCref = params.includeHiddenCref; this.ptsisComponentURL = params.includeOnlyCompOrGeneric; this.ptsPageName = params.page; this.ptsPagetype = "H"; this.ptsInitialStateFromClassicWithKeywordsTyped = false;  this.ptsIsSearchWidgetOpenedFromClassicPageFlag = false;  this.ptsIsAccessibilityMode = params.isAccessibilityMode; this.ptsResultsOpen = false; this.ptsShowCompletePath = params.showCompletePath; this.srchWidgetId = params.srchWidgetId; this.recentListCount = params.recentListCount; this.RedirectAutomatically = params.RedirectAutomatically; this.RedirectOnEnter = params.RedirectOnEnter; if(params.isInitialLoad){
 this.ptsInitialLoad = params.isInitialLoad; }
 else
 {
 this.ptsInitialLoad = false; }

 if(params.componentSearchURL !== ""){
 this.componentHeaderCategory = params.searchcategory; this.componentSearchURL = params.componentSearchURL; }
 
 
 var ptsSearchWidgetArr = []; if(params.srchWidgetId !== "" && params.srchWidgetId !== "classic")
 {
 
 ptsSearchWidgetArr = document.querySelectorAll("#"+params.srchWidgetId); }
 else
 {
 ptsSearchWidgetArr = document.querySelectorAll("#"+winName+"divPTS_SEARCHWIDGET"); }
 for (let i = 0; i < ptsSearchWidgetArr.length; i++) 
 {
 this.ptsSearchWidget = ptsSearchWidgetArr[i]; if (this.ptsSearchWidget !== null){

 if(params.hideSearch){
 this.ptsSearchWidget.classList.add("pts_search_widget_hide")
 }
 else{
 
 this.ptsSearchWidgetMask = this.ptsSearchWidget.querySelector(".pts_search_mask"); this.ptsSearchcontentDiv = this.ptsSearchWidget.querySelector(".pts_search_content"); this.ptsSetModalStyles();  this.ptsShowContentDiv();  if(this.ptsIsSearchWidgetOpenedFromClassicPage())
 {
 this.ptsSetSearchWidgetStateForClassic(params); }
 else
 {
 
 this.ptsSetPlaceholder(params.scLabel, params.placeholder, params.keywordLabel); this.ptsSetButtons(params.scLabel, params.showCategoryDropDown,params.showGlobalSearchButton); }
 
 this.ptsAddAriaAttributes(params.showCategoryDropDown);  this.ptsAddEventListeners(); this.ptsStyleCategoryDropdown();  if (params.showGridIcons !== undefined && !params.showGridIcons){
 this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("pts_gridicons_none");  } 

 if (params.openSearchInModal === true){
 this.ptsOpenSearchBox(); }
 }
 }
 } 
 },

 
 ptsSetSearchWidgetStateForClassic:function(params) {

 
 var searchBoxPlaceHolderElementInClassic = top.document.getElementById('ptsKeywordPlaceHolder'); var searchBoxPlaceHolderTextForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('placeholder'); var scLabelForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('sclabelforclassic'); var scNameForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('scnameholderforclassic'); if(scLabelForClassic && scNameForClassic)
 {
 
 this.ptsSetPlaceholder(scLabelForClassic, searchBoxPlaceHolderTextForClassic);  this.ptsSetButtons(scLabelForClassic, params.showCategoryDropDown,params.showGlobalSearchButton);  var catDropDownElement = this.ptsSearchWidget.querySelector(".pts_category_dropdown"); var catDropDownLinkList = catDropDownElement.getElementsByTagName('a');  for(let i = 0; i < catDropDownLinkList.length; i++)
 {
 var currentCatDropDownLink = catDropDownLinkList[i]; var catNameAttr = currentCatDropDownLink.getAttribute("catname"); if(scNameForClassic === catNameAttr)
 {
 
 this.ptsSetCategory(currentCatDropDownLink); }
 }
 }
 else
 {
 
 this.ptsSetPlaceholder(params.scLabel, params.placeholder); this.ptsSetButtons(params.scLabel, params.showCategoryDropDown,params.showGlobalSearchButton); }

 
 var searchBoxPlaceHolderValueForClassic = searchBoxPlaceHolderElementInClassic.value; if(searchBoxPlaceHolderValueForClassic)
 {
 var searchWidgetBox = document.querySelector("#PTSKEYWORD"); searchWidgetBox.value = searchBoxPlaceHolderValueForClassic; this.ptsInitialStateFromClassicWithKeywordsTyped = true; }

 },

 
 ptsGetKeywordsInClassicPlaceholderSearchBox: function() {
 var inputvalforclassic = "";  var inputvalforclassic=top.document.getElementById('ptsKeywordPlaceHolder').value; this.ptsInitialStateFromClassicWithKeywordsTyped = false;  var scnameforClassic = top.document.getElementById('ptsKeywordPlaceHolder').getAttribute('scnameholderforclassic'); if(scnameforClassic)
 {
 this.ptsSearchCategory = scnameforClassic; }
 return inputvalforclassic; },

 
 ptsIsSearchWidgetOpenedFromClassicPage: function() {

 var ptsPageInfoElementId = "pt_pageinfo_win0"; var ptsTargetFrameForClassic = window.parent.document.getElementById('ptifrmtgtframe'); if(ptsTargetFrameForClassic) 
 {
 var ptsPageInfoElementForClassic = ptsTargetFrameForClassic.contentWindow.document.getElementById(ptsPageInfoElementId); if (ptsPageInfoElementForClassic && (ptsPageInfoElementForClassic.getAttribute("mode") == "CLASSIC")) {
 this.ptsIsSearchWidgetOpenedFromClassicPageFlag = true; return true; }
 }

 return false; },

 ptsSetWidget: function (activeElement) {
 var closestPtsSearchWidget = activeElement.closest(".pts_search_widget"); if (closestPtsSearchWidget !== null){
 this.ptsSearchWidget = closestPtsSearchWidget; this.ptsSearchcontentDiv = this.ptsSearchWidget.querySelector(".pts_search_content"); this.ptsSearchWidgetMask = this.ptsSearchWidget.querySelector(".pts_search_mask"); }
 },
 ptsIsHeaderSearchBar: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return true; else
 return false; },
 ptsGetCategory: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSCATEGORYBTN"; else
 return "PTSCATEGORYBTNSS"; },
 ptsGetTitle: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSTITLE"; else
 return "PTSTITLESS"; },
 ptsGetSuggGrid: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTS_INTELLISRCH_RS"; else
 return "PTS_INTELLISRCH_HD"; },
 ptsGetSearchButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSSEARCHBTN"; else
 return "PTSSEARCHBTNSS"; },
 ptsGetKeywordButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSKEYWORD"; else
 return "PTSKEYWORDSS"; },
 ptsGetResultsButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSRESULTS"; else
 return "PTSRESULTSS"; },

 ptsShowContentDiv: function(){
 if(this.ptsSearchcontentDiv && this.ptsSearchcontentDiv.getAttribute("style"))
 this.ptsSearchcontentDiv.removeAttribute("style"); if(this.ptsSearchcontentDiv){
 this.ptsSearchcontentDiv.classList.remove("psc_hidden");  }
 if (document.querySelector(".ps_header_bar")){ 
 document.querySelector(".ps_header_bar").classList.add("pts_search_enabled");  this.ptsSearchcontentDiv.classList.remove("psc_hidden");  } 
 },
 
 ptsSetModalStyles: function(){
 if (this.ptsOpenSearchInModal === true){ 
 window.parent.document.querySelector("#ptsSearchIFrame").style.display = "block"; document.querySelector("body").style.backgroundColor = "transparent"; document.querySelector("html").style.backgroundColor = "transparent"; document.querySelector("form").style.backgroundColor = "transparent";  this.ptsSearchWidgetMask.style.backgroundColor = "#000"; }
 },

 ptsSetPlaceholder: function(catlabel, placeholder, keywordLabel){
 var keywordfield = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keywordfield.setAttribute("type", "text"); keywordfield.setAttribute("role", "combobox"); keywordfield.setAttribute("aria-expanded", "false"); if(keywordLabel !== undefined && keywordLabel!="")
 {
 keywordfield.setAttribute("aria-label", keywordLabel); }
 if (catlabel === "All")
 catlabel = "All "+ "Category"
 
 if (placeholder !== undefined && placeholder !== "")
 keywordfield.setAttribute("placeholder",placeholder); else{
 var placeholdertext = "Search in "+ catlabel;  keywordfield.setAttribute("placeholder",placeholdertext); }
 
 },

 ptsSetButtons: function(catlabel,showCategoryDropDown,showGlobalSearchButton){
 
 var catbtndiv = this.ptsSearchWidget.querySelector(".pts_category_button");   if(catbtndiv != null) {
 if (!showCategoryDropDown){
 catbtndiv.classList.add("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.remove("pts_categorybtn_exists");  var catbtn = catbtndiv.querySelector(".ps-button"); catbtn.setAttribute("scname",this.ptsSearchCategory);  }
 else{
 catbtndiv.classList.remove("psc_hidden"); var catbtn = catbtndiv.querySelector(".ps-button"); catbtn.setAttribute("scname",this.ptsSearchCategory); catbtn.setAttribute("title","Search Category selector"); catbtn.innerHTML = catlabel; this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_categorybtn_exists");  }
 }
 if(!showGlobalSearchButton){
 this.ptsSearchWidget.querySelector(".pts_search_button").classList.add("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.remove("pts_searchbtn_exists"); }else{
 var srchbtn = this.ptsSearchWidget.querySelector(".pts_search_button"); srchbtn.classList.remove("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_searchbtn_exists"); }
 },

 ptsAddAriaAttributes: function(showCategoryDropDown){
 if (showCategoryDropDown && document.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD") === null){
 var ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var catbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); catbtn.parentNode.appendChild(ariaDesc); catbtn.setAttribute("aria-describedby",ariaDesc.id); ariaDesc.innerHTML = "Current search category:" + catbtn.innerHTML;  catbtn.setAttribute("aria-label","Search Category selector"); } 
 ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetKeywordButton(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var keyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keyword.parentNode.appendChild(ariaDesc); keyword.setAttribute("aria-describedby",ariaDesc.id); if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET"))
 keyword.setAttribute("aria-controls","win0hdrdivPTSSEARCHTRAY"); else
 keyword.setAttribute("aria-controls","win0divPTSSEARCHTRAY");  } 
 ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetResultsButton(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var keyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keyword.parentNode.appendChild(ariaDesc); ariaDesc.innerHTML = "Search suggestions have been displayed. Use the arrow keys to review the results.";  } 
 }
 },

 ptsOpenSearchBox: function () {
 this.ptsPagetype = "T"; if(window.innerWidth <= 680){
 this.ptsSearchWidget.classList.add("pts_search_widget_sff"); }else if (window.innerWidth <= 990 && window.innerWidth > 680){
 if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag && window.innerWidth >= 766)
 this.ptsSearchWidget.classList.add("pts_search_widget_mff_na");  else
 this.ptsSearchWidget.classList.add("pts_search_widget_mff");  }
 if(window.innerWidth > 680){
 var searchbutton; if(window.parent.document.getElementById("PT_GSEARCH_BTN")){
 searchbutton = window.parent.document.getElementById("PT_GSEARCH_BTN").getBoundingClientRect();  }
 else if (window.parent.document.getElementById("pthdr2suggestionsearch")){
 searchbutton = window.parent.document.getElementById("pthdr2suggestionsearch").getBoundingClientRect();  }
 
 this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; if ("right" === "right")
 this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px)"; else
 this.ptsSearchcontentDiv.style.left = searchbutton.left+"px";  }
 
 
 var searchBoxPlaceHolderClassicBanner = window.parent.document.getElementById('ptsKeywordPlaceHolder'); if(searchBoxPlaceHolderClassicBanner)
 this.ptsSearchcontentDiv.classList.add("pts_search_widget_for_classic"); else
 this.ptsSearchcontentDiv.style.position = "fixed";   this.ptsSearchcontentDiv.classList.remove("pts_search_widget_hide"); this.ptsSearchcontentDiv.style.zIndex = 211; this.ptsSearchWidgetMask.classList.remove("psc_hidden"); this.ptsSearchcontentDiv.classList.add("pts_search_focused"); this.ptsGetSearchResults(this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget))); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)});   if(!searchBoxPlaceHolderClassicBanner)
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus();  },

 ptsReposition: function (){
 if (this.ptsSearchcontentDiv.classList.contains("pts_search_focused")){
 if(this.ptsSearchWidget.parentNode.classList.contains("pts_pagesearch_div")){
 this.ptsCloseAllLists(); }else{
 var searchtray = this.ptsSearchWidget.querySelector(".pts_search_tray"); var resultbox = searchtray.querySelector(".pts_results_grid"); var messagebox = searchtray.querySelector(".pts_message"); if(window.innerWidth > 680){
 var searchbutton; if(window.parent.document.getElementById("PT_GSEARCH_BTN")){
 searchbutton = window.parent.document.getElementById("PT_GSEARCH_BTN").getBoundingClientRect();  if(searchbutton.left == 0) {
 notifyBtn = window.parent.document.getElementById("PT_NOTIFY"); if(notifyBtn != null)
  searchbutton = notifyBtn.getBoundingClientRect();  } 
 if (searchbutton.left == 0) 
 searchbutton = window.parent.document.getElementById("PT_HOME").getBoundingClientRect();  }
 else if (window.parent.document.getElementById("pthdr2suggestionsearch")){
 searchbutton = window.parent.document.getElementById("pthdr2suggestionsearch").getBoundingClientRect();  }
 if(searchbutton.left !== 0 && this.ptsOpenSearchInModal){
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff"); if (window.innerWidth <= 990)
 {
 if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag && window.innerWidth >= 766)
 this.ptsSearchWidget.classList.add("pts_search_widget_mff_na");  else
 this.ptsSearchWidget.classList.add("pts_search_widget_mff");  }
 else{
 this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); }
 this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; this.ptsSearchcontentDiv.style.width = ""; if ("right" === "right")
 this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px)"; else
 this.ptsSearchcontentDiv.style.left = searchbutton.left+"px";  }
 else if (!this.ptsOpenSearchInModal){ 
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff");  this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); this.ptsSearchcontentDiv.style.top = ""; this.ptsSearchcontentDiv.style.width = ""; this.ptsSearchcontentDiv.style.right =""; }
 else if(this.ptsOpenSearchInModal){
 this.ptsCloseIframe(); return; }
 var editbox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getBoundingClientRect(); var searchbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).getBoundingClientRect();  resultbox.style.width= editbox.width+searchbtn.width+"px"; messagebox.style.width= editbox.width+searchbtn.width+"px";  }else{
 this.ptsSearchcontentDiv.style.right = "0"; this.ptsSearchcontentDiv.style.width = "100%"; resultbox.style.width= "100%"; messagebox.style.width= "100%"; this.ptsSearchWidget.classList.add("pts_search_widget_sff"); this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); }
 }
 }
 },

 ptsTransactionViewTestPage: function () {
 this.ptsPagetype = "T"; var searchbutton = document.querySelector("#PTS_SEARCH_BTN").getBoundingClientRect(); this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px"; this.ptsSearchcontentDiv.style.position = "fixed"; this.ptsSearchWidget.classList.remove("pts_search_widget_hide"); }, 

 ptsDelOneRecent: function (url, recentType, nodename, objname, category, title, description, totalRecents, Recents, count) { 
 var baseURI = getptBaseURI(); var ajaxURL;  ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_DelRecents"
 + "?srchURL=" + encodeURIComponent(url) + "&recType=" + recentType + "&nodeName=" + nodename 
 + "&objName=" + objname + "&category=" + category + "&title=" + title + "&description=" + description; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 try{ 
 ptsProcessing(1,3000); inp = document.querySelector(".ptsf_brdcrmb_hghlt"); setTimeout(function(){ptsSearchUIObj.ptsGetSrchResltBrdCrmb(inp, 1, totalRecents, Recents, count);}, 3000); }
 catch(err){
 }
 }); },
 
 
 ptsSeeAllBrdCrumbs: function () { 
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrm = document.getElementById('win0hdrdivPTSF_BREADCRUM$0'); seeLinkk = document.getElementById("win0hdrdivPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 else {
 brdCrm = document.getElementById('win0divPTSF_BREADCRUM$0'); seeLinkk = document.getElementById("win0divPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 
 if(seeLinkk != null){
 this.ptsSearchWidget.querySelector(".pts_see_all").classList.add("psc_hidden"); var brdCrumb_hide = this.ptsSearchWidget.querySelector(".pts_hide");  brdCrumb_hide.classList.remove("psc_hidden");  brdCrumb_hide.classList.remove("ps_box-button");  brdCrumb_hide.querySelector(".pts_brdcrumb_size").classList.add("pts_hide_link");  brdCrumb_hide.querySelector(".pts_brdcrumb_size").classList.remove("ps-button");   this.ptsSearchWidget.querySelector(".pts_hide_link").focus();   var iter = 0; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumbs = document.getElementById(brdCrmb); while(breadCrumbs != null) {
 srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter); srchCatGridRow.classList.remove("psc_hidden"); srchCatButn = breadCrumbs.querySelector(".ps-button");  iter++; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumbs = document.getElementById(brdCrmb); } 
 brdcrm1 = brdCrm.querySelector(".pts_brdcrmb_disp"); brdCrm.classList.remove("pts_brdcrmb_disp"); brdCrm.classList.add("ptsf_brdcrmb_disp_all"); this.ptsSearchWidget.querySelector(".pts_hide_link").tabIndex = 0; } 
 
 var seeMoreDiv = document.querySelector(".pts_algnpadding"); if(seeMoreDiv != null) {
 if (seeMoreDiv.classList.contains("psc_hidden")){
 srchGrid = document.getElementById('win0hdrdivPTSF_BREADCRUM$0')
 if(srchGrid != null) {
 srchGrdScr = srchGrid.querySelector(".ps_scrollable")
 if(srchGrdScr != null)
 srchGrdScr.removeAttribute("style"); srchGrdLst = srchGrid.querySelector(".ps_grid-list"); if(srchGrdLst != null)
 srchGrdLst.removeAttribute("style"); }
 srchGrid = document.getElementById('win0divPTSF_BREADCRUM$0')
 if(srchGrid != null) {
 srchGrdScr = srchGrid.querySelector(".ps_scrollable")
 if(srchGrdScr != null)
 srchGrdScr.removeAttribute("style"); srchGrdLst = srchGrid.querySelector(".ps_grid-list"); if(srchGrdLst != null)
 srchGrdLst.removeAttribute("style"); }
 }
 } 
 },

 
 hideExtBrdCrumbs: function () { 
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrm = document.getElementById('win0hdrdivPTSF_BREADCRUM$0'); seeLinkk = document.getElementById("win0hdrdivPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 else {
 brdCrm = document.getElementById('win0divPTSF_BREADCRUM$0'); seeLinkk = document.getElementById("win0divPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 brdcrm1 = brdCrm.querySelector(".ptsf_brdcrmb_disp_all"); brdCrm.classList.add("pts_brdcrmb_disp"); brdCrm.classList.remove("ptsf_brdcrmb_disp_all"); if(seeLinkk != null){
 this.ptsSearchWidget.querySelector(".pts_see_all").classList.remove("psc_hidden");  } 
 if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))) {
 
 brdCrumbdispHt= document.getElementById("PTSF_BREADCRUM$0_row_0");  if(brdCrumbdispHt != null) {
 brdCrmbDispPos = brdCrumbdispHt.getBoundingClientRect();  var iter = 0; var fromIterToHide = 0; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumbs = document.getElementById(brdCrmb);  while(breadCrumbs != null) {
 srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter); brdCrmbPos = srchCatGridRow.getBoundingClientRect(); srchCatButn = breadCrumbs.querySelector(".ps-button"); hidebtn = srchCatGridRow.querySelector(".pts_hide"); if(srchCatButn != null) {
 if(brdCrmbPos.bottom > brdCrmbDispPos.bottom) { 
 if(fromIterToHide === 0)
 fromIterToHide = iter;  if(hidebtn == null); isBrdCrmOneRow = false; } else {
 isBrdCrmOneRow = true; }
 }
 iter++; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  }
 endIterToHide = iter-1; var breadCrumbs = document.getElementById(brdCrmb); }
 } 
 }

 
 for(let i = fromIterToHide; i < endIterToHide; i++) { 
 brdCrmbdiv = "PTSF_BREADCRUM$0_row_" + i; var breadCrumbsDiv = document.getElementById(brdCrmbdiv); if(breadCrumbsDiv != null)
 breadCrumbsDiv.classList.add("psc_hidden"); }
 var hideBtn = this.ptsSearchWidget.querySelector(".pts_hide"); if(hideBtn != null) {
 hideBtn.classList.add("psc_hidden");  this.ptsSearchWidget.querySelector(".pts_see_all").querySelector(".ps-button").focus();  }
 },

 hdleSrchEdtClick: function() {
 ptsSearchUIObj.ptsGetSearchResults(ptsSearchBox); },

 srchBtnSFF: function() {
 ptsSearchUIObj.ptsExpSrchWdgt(); },

 ptsAddEventListeners: function () {
 var ptsHeaderSearchBox; var ptsHeaderCategoryDD; var ptsHeaderCategoryDDSFF; ptsSearchBox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); ptsCategoryDD = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); ptsSearchBox.addEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) }); this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).addEventListener('keydown', function (e) { 
 ptsSearchUIObj.ptskeyDownFunction(e)}); window.top.addEventListener('click', function (e) {
 const button = document.getElementById('HOMEPAGE_SELECTOR$PIMG');  if(button != null) {
 button.addEventListener('click', function handleClick() {
 var srchWidget = top.document.getElementById('PTSKEYWORD');srchWidget.value = ""; }); } 
 }); ptsSearchBox.addEventListener('click', this.hdleSrchEdtClick);  var minsrch = document.querySelector(".psc_mini_search"); if(minsrch === null) {
 pageSrchIcn = document.getElementById('win0divPAGESRCHBTN'); if(pageSrchIcn != null) { 
 pageSrchIcn.classList.add("psc_hidden");  }
 pageSrchIcn = document.getElementById('win0srchdivPAGESRCHBTN'); if(pageSrchIcn != null) { 
 pageSrchIcn.classList.add("psc_hidden");  } 
 }
 else {
 var srchFocsd = document.querySelector(".pts_search_focused"); if (srchFocsd == null) {
 var keywordss = document.getElementById("PTSKEYWORDSS"); if(keywordss != null)
 keywordss.removeAttribute("role")
 }
 }
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET")) { 
 brdCrmb = "win0hdrdivPTSF_IMAGE$0"; }
 else { 
 brdCrmb = "win0divPTSF_IMAGE$0"; }
 srchexpfnc = "ptsSearchUIObj.ptsExpSrchWdgt()"; pageSrchBtn = document.getElementById('PAGESRCHBTN'); if(pageSrchBtn != null) {
 pageSrchBtn.setAttribute("onclick", srchexpfnc); pageSrchBtn.setAttribute("href","javascript:void(0);"); pageSrchBtn.addEventListener('click', function () { ptsSearchUIObj.ptsExpSrchWdgt() }); } 

 
 var breadCrumbs = document.getElementById(brdCrmb); if(breadCrumbs != null) { 
 breadCrumbs.querySelector(".ps-button").classList.add("ptsf_brdcrmb_hghlt"); breadCrumbs.querySelector(".ps-button").setAttribute("aria-pressed", "true"); var brdCrmbName = breadCrumbs.querySelector(".ps-text").innerHTML; ariaLblTxt = "Suggestions in "+ brdCrmbName; breadCrumbs.querySelector(".ptsf_brdcrmb_hghlt").setAttribute("aria-label", ariaLblTxt); }
 
 var iter = 0;  if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; seeAllLink = "win0hdrdivPTSF_BRDCRM_DVW_PTSF_LINK$0"; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; seeAllLink = "win0divPTSF_BRDCRM_DVW_PTSF_LINK$0"; }
 
 var seeLink = document.getElementById(seeAllLink); if(seeLink != null){
 seeLink.addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); seeAllClick = seeLink.querySelector(".ps-button"); seeAllClick.tabIndex = 0; seeAllClick.classList.add("pts_font_size"); seeAllClick.setAttribute("onclick", "ptsSearchUIObj.ptsSeeAllBrdCrumbs()"); seeAllClick.setAttribute("title","See All"); seeAllClick.setAttribute("aria-description","Displays all search categories"); seeAllClick.setAttribute("href","javascript:void(0);"); }

 var breadCrumbs = document.getElementById(brdCrmb); while(breadCrumbs != null) {
 breadCrumbs.querySelector(".ps-button-wrapper").removeAttribute("title"); breadCrumbs.addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter); srchCatGridRow.classList.add("pts_brdcrumb_ht");  srchCatButn = breadCrumbs.querySelector(".ps-button"); brdcrmbrow = srchCatGridRow.querySelector(".psc_rownum"); brdcrmbrow.classList.add("psc_hidden"); hghtdBrdCrmb = breadCrumbs.querySelector(".ptsf_brdcrmb_hghlt"); if(hghtdBrdCrmb == null) { 
 srchCatButn.removeAttribute("aria-label"); srchCatButn.setAttribute("aria-pressed", "false"); srchCatButn.tabIndex = -1; }
 srchCatButn.classList.add("pts_brdcrumb_size"); if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET"))
 srchCatButn.setAttribute("aria-controls","win0hdrdivPTS_RECOTHSUGG$0"); else
 srchCatButn.setAttribute("aria-controls","win0divPTS_RECOTHSUGG$0"); srchBtnScn = srchCatButn.querySelector(".ps-text"); if(srchBtnScn != null)
 srchBtnScn.classList.add("pts_brdcrm_sidepadding");  var srchCatBrdCmb = srchCatButn.getAttribute("catname"); srchrsltfnc = "ptsSearchUIObj.ptsGetSrchResltBrdCrmb(ptsSearchBox, 0, 0, 0, 0)"; srchCatButn.setAttribute("onclick", srchrsltfnc); srchCatButn.setAttribute("href","javascript:void(0);"); iter++;  if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) 
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; else
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  breadCrumbs = document.getElementById(brdCrmb);  }
 
 iter--; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumb = document.getElementById(brdCrmb); srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter); if(breadCrumb != null) {
 srchCatButn = breadCrumb.querySelector(".ps-button"); srchrsltfnc = "ptsSearchUIObj.hideExtBrdCrumbs()"; srchCatButn.setAttribute("onclick", srchrsltfnc); srchCatButn.setAttribute("href","javascript:void(0);"); }

 
 var ClrAll = document.getElementById('win0hdrdivPTS_CLRALL$0'); if (ClrAll == null) 
 ClrAll = document.getElementById('win0divPTS_CLRALL$0'); if(ClrAll != null)
 ClrAll.addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); var seeMore = document.getElementById('win0hdrdivPTS_SEEMORE$0');  if (seeMore == null) 
 seeMore = document.getElementById('win0divPTS_SEEMORE$0'); if(seeMore != null) {
 seeMore.addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); }
 ptsCategoryDD.setAttribute("href", "javascript:ptsSearchUIObj.ptsToggleCategories();"); ptsCategoryDD.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event);"); this.ptsSearchWidgetMask.addEventListener('click', function (e) { ptsSearchUIObj.ptsclickOutside(e) }); window.addEventListener("resize", function (e) { 
 if(ptsSearchUIObj.ptsSearchWidget !== null){
 ptsSearchUIObj.ptsReposition(); } }); },

 ptsStyleCategoryDropdown: function(){
 this.ptsSearchWidget.querySelector(".pts_category_dropdown").setAttribute("aria-modal","true"); this.ptsSearchWidget.querySelector(".pts_search_tray").setAttribute("aria-modal","true");  var catdropdownul = this.ptsSearchWidget.querySelector(".pts_category_dropdown").querySelector("ul"); catdropdownul.setAttribute("aria-label","Search in"); var resultdropdownul = this.ptsSearchWidget.querySelector(".pts_search_tray").querySelector("ul");  if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) {
 resultdropdownul.id = 'PTSF_SRCH_CAT'; resultdropdownul.setAttribute("aria-label","Search Categories"); }
 else {
 resultdropdownul.setAttribute("aria-label","Search Results"); }
 var contentLabel = this.ptsSearchWidget.querySelector(".pts_content_label"); if (contentLabel){
 contentLabel.classList.remove("ps_box-link"); contentLabel.parentNode.classList.remove("ps_box-menuitem"); contentLabel.parentNode.setAttribute("role","heading"); var length = contentLabel.childNodes.length; for (let i = 0; i < length; i++)
 contentLabel.removeChild(contentLabel.childNodes[0]); var node = document.createElement("h3");  node.innerHTML = "Category"; node.classList.add("ps-text"); contentLabel.appendChild(node); }
 },

 ptsToggleCategories: function () {
 this.ptsSetWidget(document.activeElement); var categoryDiv = this.ptsSearchWidget.querySelector(".pts_category_dropdown");  if (categoryDiv.classList.contains("psc_hidden")) {
 categoryDiv.classList.remove("psc_hidden"); categoryDiv.scrollTop = 0; this.ptsSearchWidgetMask.classList.remove("psc_hidden");  this.ptsSearchcontentDiv.classList.add("pts_search_focused");  var searchtray = categoryDiv.closest(".pts_search_widget").querySelector(".pts_search_tray"); if (!searchtray.classList.contains("psc_hidden")){
 searchtray.classList.add("psc_hidden"); }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "true"); var x = categoryDiv.querySelectorAll(".ps-link"); var i; for (i = 0; i < x.length; i++) {
 if (x[i].getAttribute("aria-current") != null)
 x[i].focus(); }
 } else {
 categoryDiv.classList.add("psc_hidden"); if (!this.ptsOpenSearchInModal){
 this.ptsSearchWidgetMask.classList.add("psc_hidden");  this.ptsSearchcontentDiv.classList.remove("pts_search_focused"); }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus(); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); }
 if (document.activeElement.closest(".psc_mini_search") !== null) { 
 if(window.innerWidth <= 767) { 
 ptsSearchUIObj.ptsExpSrchWdgt(); }
 }
 },

 ptsSetCategory: function (catrow) {
 var catselected = catrow.innerHTML; catrow.setAttribute("aria-current","true"); if (catselected === "All"){
 catselected = "All "+ "Category"
 }
 if (this.ptsSearchWidget !== null && this.ptsSearchWidget.contains(catrow)) {
 this.ptsSearchCategory = catrow.getAttribute("catname");  var catbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); catbtn.innerHTML = catselected; catbtn.setAttribute("title",catselected);  catbtn.setAttribute("scname",this.ptsSearchCategory); if (this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD")){
 var ariaDesc = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD"); ariaDesc.innerHTML = "Current search category:" + catselected; }
 var placeholdertext = "Search in "+ catselected;  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("placeholder",placeholdertext);   if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag)
 {
  
  var searchBoxPlaceHolderClassicBanner = window.parent.document.getElementById('ptsKeywordPlaceHolder');  if(searchBoxPlaceHolderClassicBanner)
  {
  searchBoxPlaceHolderClassicBanner.setAttribute("placeholder",placeholdertext);  searchBoxPlaceHolderClassicBanner.setAttribute("scnameholderforclassic",this.ptsSearchCategory);  searchBoxPlaceHolderClassicBanner.setAttribute("sclabelforclassic",catselected);  }
 }

 this.ptsToggleCategories(); var currentSelect = this.ptsSearchWidget.querySelector(".pts_category_dropdown .pts_category_selected"); currentSelect.querySelector(".ps-link").removeAttribute("aria-label"); currentSelect.querySelector(".ps-link").removeAttribute("aria-current"); currentSelect.classList.remove("pts_category_selected");  } 
 catrow.closest(".ps_box-link").classList.add("pts_category_selected");  if (document.activeElement.closest(".psc_mini_search") !== null) { 
 document.getElementById("PTS_PAGEEDITENT").value = ""; submitAction_win0(document.win0, '#ICSetField' + this.ptsPageName + '.PTS_PAGECATVAL.' + this.ptsSearchCategory);  } 
 },

 ptsGetSuggestions: function (inp, e) {
 var activeElement = document.activeElement; var keyCode = event.keyCode; this.ptsSetWidget(activeElement); inp = this.ptsSearchWidget.querySelector("[id*='"+this.ptsGetKeywordButton(this.ptsSearchWidget)+"']");  dispMsgNoRslts = document.getElementById('win0divPTSDISPLAYMSG')
 if(dispMsgNoRslts != null) {
 dispMsgNoRslts.tabIndex = 0; }

 if ((e.shiftKey && e.key === 'Tab') === true) {
 this.ptsCloseAllLists(); }
 if (!((keyCode >= 48 && keyCode <= 57) || 
 (keyCode >= 65 && keyCode <= 90) || 
 (keyCode >= 96 && keyCode <= 105) || 
 (keyCode >= 186 && keyCode <= 191) ||
 (keyCode >= 219 && keyCode <= 222) ||
 keyCode == 13 || keyCode == 27 || keyCode == 8 || keyCode == 32 ||
 (keyCode >= 37 && keyCode <= 40))) {
 return; }

 
 if((this.ptsSearchWidget.id.includes("srchdivPTS_SEARCHWIDGET") || this.ptsSearchWidget.id.includes("win0divPTS_SEARCHWIDGET")) && (!this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET")) && (!this.srchWidgetId.includes("classic")) && (!this.RedirectOnEnter))
 if (keyCode == 13)
 return;  if((this.ptsSearchWidget.id.includes("win0divPTS_SEARCHWIDGET")) || (this.ptsSearchWidget.id.includes("win0hdrdivPTS_SEARCHWIDGET")))
 if(document.activeElement.closest(".psc_mini_search") === null)
 if (keyCode == 13)
 return; if (activeElement.id == this.ptsGetKeywordButton(this.ptsSearchWidget)) {
 if (e.key === "Enter" && document.activeElement.closest(".psc_mini_search") !== null 
 && activeElement.id == this.ptsGetKeywordButton(this.ptsSearchWidget)) { 
 eval(document.getElementById("PAGEENTSRCH").href); return; }
 if (e.key === "Enter" && document.activeElement.closest(".psc_mini_search") === null) {
 var elSrchBtn = document.getElementById(this.ptsGetSearchButton(this.ptsSearchWidget)); ptsSearchUIObj.ptsDoGlobalSearch(elSrchBtn); return; }

 if (e.key === "ArrowRight") {
 if (activeElement.value == "" || e.target.selectionStart == activeElement.value.length) {
 var el = document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$0"); if (el){
 el.focus();  }
 }
 }
 }

 clearTimeout(this.inputDelayTime); this.inputDelayTime = setTimeout(function () {
 if (e.key !== "Escape" && e.key !== "Esc" && 
 e.key !== "Tab" && e.key !== "ArrowDown" && e.key !== "Down" 
 && e.key !== "ArrowUp" && e.key !== "Up" && e.key !== "ArrowRight")
 ptsSearchUIObj.ptsGetSearchResults(inp); if (e.key === "ArrowDown" || e.key === "Down" || e.key === "ArrowUp" || e.key === "Up") {
 if (ptsSearchUIObj.ptsResultsOpen) {
 if (e.key === "ArrowDown" || e.key === "Down") {
 var searchtray = ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray"); searchtray.scrollTop = 0;  var resultbox = searchtray.querySelector(".psc_width-100pct"); if (!resultbox.classList.contains("psc_hidden"))
 resultbox.querySelector(".ps-link").focus(); else {
 var resultbox = searchtray.querySelector(".pts_othSugg"); if (!resultbox.classList.contains("psc_hidden"))
 resultbox.querySelector(".ps-link").focus(); else {
 var resultbox = searchtray.querySelector(".pts_message"); if (!resultbox.classList.contains("psc_hidden"))
 resultbox.focus();  }
 }
 e.stopPropagation(); }
 else if (e.key === "ArrowUp" || e.key === "Up") {
 var searchtray = ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray"); searchtray.scrollTop = 9999; var resultbox = searchtray.querySelector(".pts_results_grid"); if (!resultbox.classList.contains("psc_hidden")) {
 var resultitems = resultbox.querySelectorAll(".ps_grid-row.ps_box-menuitem:not(.psc_hidden)"); resultitems[resultitems.length - 1].querySelector(".ps-link").focus(); }
 e.stopPropagation(); }
 } else {
 ptsSearchUIObj.ptsGetSearchResults(inp); }
 }
 else if(e.key === "Escape" || e.key === "Esc" || e.key === "Tab")
 ptsSearchUIObj.ptskeyDownFunction(e);  }, 1000); },

 ptsExpSrchWdgt: function(){ 
 pageSrchIcn = document.getElementById('win0divPAGESRCHBTN'); if(pageSrchIcn != null) {
 if((!pageSrchIcn.classList.contains("psc_hidden"))) { 
 pageSrchIcn.classList.add("psc_hidden");  } 
 }
 aTagPageSrchIcn = document.getElementById('PAGESRCHBTN'); if(aTagPageSrchIcn != null) {
 aTagPageSrchIcn.setAttribute("href","javascript:void(0);"); }
 kywrd = document.getElementById('win0divPTSKEYWORDSS'); if(kywrd != null) {
 kywrd.style.display = "block"; }
 backBtn = document.getElementById('win0divPTSBACKBTNSS'); if(backBtn != null) {
 backBtn.style.display = "block"; }
 contBox = document.getElementById('win0divPTSCONTENTBOX'); if(contBox != null) {
 if((!contBox.classList.contains("pts_search_focused"))) { 
 contBox.classList.add("pts_search_focused");  } 
 }
 },

 ptsGetSearchResults: function (inp) {
 if (this.ptsIsFetching){
 this.ptsIsSearchWaiting = true; return; }
 
 if (document.activeElement.closest(".psc_mini_search") !== null) { 

 pageSrchIcn = document.getElementById('win0divPAGESRCHBTN'); if(pageSrchIcn != null) {
 
 pageSrchIcn.classList.add("psc_hidden");   }
 contBox = document.getElementById('win0divPTSCONTENTBOX'); if(contBox != null) {
 if((!contBox.classList.contains("pts_search_focused"))) { 
 contBox.classList.add("pts_search_focused");  var keywordss = document.getElementById("PTSKEYWORDSS"); if(keywordss != null) {
 keywordss.setAttribute("role", "combobox"); keywordss.setAttribute("aria-expanded", "true"); }
 return; } 
 }
 }
 var resultbox = this.ptsSearchWidget.querySelector(".pts_results_grid");  this.ptsSetWidget(document.activeElement); inp = document.activeElement;   if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 seeLinkk = document.getElementById("win0hdrdivPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 else {
 seeLinkk = document.getElementById("win0divPTSF_BRDCRM_DVW_PTSF_LINK$0"); }
 if(seeLinkk != null) {
 if (!seeLinkk.classList.contains("psc_hidden")) {
 var hideBtn = this.ptsSearchWidget.querySelector(".pts_hide"); if((hideBtn != null) && !(inp.id.includes("PTSTITLE"))) {
 hideBtn.classList.add("psc_hidden");  } 
 }
 }
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) {
 
 RecOthSugg = document.getElementById('win0hdrdivPTS_RECOTHSUGG$0')
 if(RecOthSugg != null) {
 RecOthSugg.setAttribute("role", "region");  RecOthSugg.setAttribute("aria-label","Search Results"); }
 RecOthSugg = document.getElementById('win0divPTS_RECOTHSUGG$0')
 if(RecOthSugg != null) {
 RecOthSugg.setAttribute("role", "region");  RecOthSugg.setAttribute("aria-label","Search Results"); }

 srchGrid = document.getElementById('win0hdrdivPTSF_BREADCRUM$0')
 if(srchGrid != null) {
 srchGrid.querySelector(".ps_grid-body").classList.add("pts_flxdisp", "pts_listSty");  srchGrid.querySelector(".ps_box-grid-header").classList.add("psc_hidden"); }
 srchGrid = document.getElementById('win0divPTSF_BREADCRUM$0')
 if(srchGrid != null) {
 srchGrid.querySelector(".ps_grid-body").classList.add("pts_flxdisp", "pts_listSty");  srchGrid.querySelector(".ps_box-grid-header").classList.add("psc_hidden"); }
 srchGrid = document.getElementById('win0hdrdivPTSSEARCHTRAY'); if(srchGrid != null) {
 srchGrid.setAttribute("role","dialog"); srchGrid.setAttribute("aria-label","Search results based on search category"); srchGrid.querySelector(".ps_header-group").classList.add("pts_nobdrbtm","pts_searchwithin");  }

 srchGrid = document.getElementById('win0divPTSSEARCHTRAY'); if(srchGrid != null) {
 srchGrid.setAttribute("role","dialog"); srchGrid.setAttribute("aria-label","Search results based on search category"); srchHdrGrp = srchGrid.querySelector(".ps_header-group"); if(srchHdrGrp != null)
 srchHdrGrp.classList.add("pts_nobdrbtm","pts_searchwithin");  }

 if(g_bAccessibilityMode == true) {
 ptsSearchUIObj.ptsSeeAllBrdCrumbs(); seeLess = document.querySelector(".pts_hide"); if(seeLess != null)
 seeLess.classList.add("psc_hidden"); }

 rcntVist = document.getElementById('win0hdrdivPTSRECNTVIST$0')
 if(rcntVist != null) {
 rcntVist.classList.add("pts_dspinline", "pts_recentVis");  rcntVisthg = rcntVist.querySelector(".ps_header-group"); if(rcntVisthg != null)
 rcntVisthg.classList.add("pts_dspinline"); rcntVistcg = rcntVist.querySelector(".ps_content-group")
 if(rcntVistcg != null)
 rcntVistcg.classList.add("pts_dspinline"); }
 rcntVist = document.getElementById('win0divPTSRECNTVIST$0')
 if(rcntVist != null) {
 
 rcntVist.classList.add("pts_dspinline", "pts_recentVis");  rcntVisthg = rcntVist.querySelector(".ps_header-group"); if(rcntVisthg != null)
 rcntVisthg.classList.add("pts_dspinline"); rcntVistcg = rcntVist.querySelector(".ps_content-group")
 if(rcntVistcg != null)
 rcntVistcg.classList.add("pts_dspinline"); }

 othSuggs = document.getElementById('win0hdrdivPTSOTHSUGGS$0')
 if(othSuggs != null) {
 othSuggs.querySelector(".ps_header-group").classList.add("pts_grdbrdrnone"); }
 othSuggs = document.getElementById('win0divPTSOTHSUGGS$0')
 if(othSuggs != null) {
 othSuggs.querySelector(".ps_header-group").classList.add("pts_grdbrdrnone"); }
 
 dispMsgNoRslts = document.getElementById('win0hdrdivPTSMSGDISPLAY')
 if(dispMsgNoRslts != null) {
 dispMsgNoRslts.tabIndex = 0; } 
 else {
 dispMsgNoRslts = document.getElementById('win0divPTSMSGDISPLAY')
 if(dispMsgNoRslts != null) {
 dispMsgNoRslts.tabIndex = 0; }
 }

  
 var searchCategoryDiv = this.ptsSearchWidget.querySelector(".ptsf_brdcrmb_hghlt"); searchCategoryDiv.tabIndex = 0; var searchCategory = searchCategoryDiv.getAttribute('catname'); var srchCustCat = this.ptsSearchWidget.querySelector(".ptsf_custSrchCat");  if(srchCustCat != null) {
 var srchCustCatBtn = srchCustCat.querySelector(".ps-button");  searchCategoryDiv.removeAttribute("aria-label"); searchCategoryDiv.tabIndex = -1; searchCategoryDiv.setAttribute("aria-pressed", "false"); searchCategoryDiv.classList.remove("ptsf_brdcrmb_hghlt"); srchCustCatBtn.setAttribute("aria-pressed", "true"); srchCustCatBtn.classList.add("ptsf_brdcrmb_hghlt"); srchCustCatBtn.tabIndex = 0; brdCrmbName = srchCustCatBtn.querySelector(".ps-text").innerHTML; ariaLblTxt = "Suggestions in "+ brdCrmbName
 srchCustCatBtn.setAttribute("aria-label", ariaLblTxt); searchCategory = srchCustCatBtn.getAttribute('catname'); }
 
 
 var ptportDefCat = this.ptsSearchWidget.querySelector(".ptsf_defPTPortal"); if(ptportDefCat != null && srchCustCat == null) {
 var defCatBtn = ptportDefCat.querySelector(".ps-button");  searchCategoryDiv.setAttribute("aria-pressed", "false"); searchCategoryDiv.removeAttribute("aria-label"); searchCategoryDiv.classList.remove("ptsf_brdcrmb_hghlt"); defCatBtn.setAttribute("aria-pressed", "true"); defCatBtn.classList.add("ptsf_brdcrmb_hghlt"); searchCategoryDiv.tabIndex = -1; defCatBtn.tabIndex = 0; brdCrmbName = defCatBtn.querySelector(".ps-text").innerHTML; ariaLblTxt = "Suggestions in "+ brdCrmbName; defCatBtn.setAttribute("aria-label", ariaLblTxt); searchCategory = defCatBtn.getAttribute('catname'); }
 this.ptsSearchCategory = searchCategory; } 
 else {
 this.ptsSearchCategory = this.ptsSearchWidget.querySelector("#" + this.ptsGetCategory(this.ptsSearchWidget)).getAttribute("scname"); }

 this.ptsIsFetching = true; if (document.activeElement.closest(".psc_mini_search") !== null) {
 this.ptsIsFetching = false; }
 ptsProcessing(1,3000); categoryDiv = this.ptsSearchWidget.querySelector(".pts_category_dropdown");  this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); if (!categoryDiv.classList.contains("psc_hidden")) 
 categoryDiv.classList.add("psc_hidden"); var inputval = inp.value === undefined ? "" : inp.value;  if( this.ptsIsSearchWidgetOpenedFromClassicPageFlag )
 {
  
  if(this.ptsInitialStateFromClassicWithKeywordsTyped)
  {
  inputval = this.ptsGetKeywordsInClassicPlaceholderSearchBox();  }
  else
  {
  
  top.document.getElementById('ptsKeywordPlaceHolder').value = inputval;  }
 }

 inputval=inputval.replace(/%/g, "*"); inputval=inputval.replace(/&/g, " "); inputval=inputval.replace(/#/g, " "); var baseURI = getptBaseURI(); var ajaxURL; var isMiniSearch = false; if (document.activeElement.closest(".psc_mini_search") !== null) {
 isMiniSearch = true;  }
 if (!(this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) && (document.activeElement.closest(".psc_mini_search") !== null)) {
 document.querySelector("#PAGECSTSRCH").click(); } 
 else {
 if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) { 
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetMenuItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory + "&isMiniSearch=" + isMiniSearch; if (this.ptsincludeHiddenCref !== undefined)
 ajaxURL = ajaxURL + "&includeHiddenCref=" + this.ptsincludeHiddenCref
 if (this.ptsisComponentURL !== undefined)
 ajaxURL = ajaxURL + "&isComponentURL=" + this.ptsisComponentURL; if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined) 
 ajaxURL = ajaxURL + "&showCompletePath=" + this.ptsShowCompletePath;  if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) && !(inp.id.includes("PTS_SEEMORE")))
 ajaxURL = ajaxURL + "&isRecentsConf=" + "True";   }
 else {
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetContentItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory + "&editId=" + inp.id + "&isMiniSearch=" + isMiniSearch;  if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) && !(inp.id.includes("PTS_SEEMORE")))
 ajaxURL = ajaxURL + "&isRecentsConf=" + "True"; }
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 try{
 var resultJson = JSON.parse(this.req.responseText);  gsrchRslt = resultJson;  if(resultJson.hitcount != null)
 recentHitCount = resultJson.hitcount[0].recenthits; if(resultJson.recentItems.length <= 0 && resultJson.suggestionItems.length <= 0){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD");  if(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || ptsSearchUIObj.srchWidgetId.includes("classic"))
 ptsSearchUIObj.ptsDisplayMessageBrdCrmb(""); else
 ptsSearchUIObj.ptsshowDisplayMessage(""); }
 else{
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby",ptsSearchUIObj.ptsGetResultsButton(ptsSearchUIObj.ptsSearchWidget)+"_ariaD");  ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-expanded","true");  searchResults = resultJson.recentItems.concat(resultJson.suggestionItems);  if(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || ptsSearchUIObj.srchWidgetId.includes("classic")) 
 ptsSearchUIObj.ptsFillSearchResultGridHdr(searchResults, inp, recentHitCount); else
 ptsSearchUIObj.ptsFillSearchResultGrid(searchResults); ptsSearchUIObj.ptshideDisplayMessage(); }
 ptsSearchUIObj.ptsShowResults();  }
 catch(err){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD");  if(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || ptsSearchUIObj.srchWidgetId.includes("classic"))
 ptsSearchUIObj.ptsDisplayMessageBrdCrmb(this.req.responseText); else
 ptsSearchUIObj.ptsshowDisplayMessage(this.req.responseText); ptsSearchUIObj.ptsShowResults(); }

 
 if(inp.id.includes("PTSTITLE")) {
 document.getElementById("PTS_INTELLISRCH_RS$0_row_1").querySelector(".ps_box-link").focus(); }
 if(inp.id.includes("PTSKEYWORD")) {
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).focus(); } 
 });}
 var catBox = this.ptsSearchWidget.querySelector(".pts_results_grid");  if(catBox != null) {
 catBoxbrdCrmb = catBox.querySelector(".ps_box-group"); if(catBoxbrdCrmb != null) {
 catBoxbrdCrmb.classList.remove("ps_box-group"); }
 }
 },

 ptsGetSrchResltBrdCrmb: function (inp, delRec, totalRecents, Recents, count) { 
 if (this.ptsIsFetching){ 
 this.ptsIsSearchWaiting = true; return; }
 this.ptsSetWidget(document.activeElement);   inpKey = this.ptsSearchWidget.querySelector("[id*='"+this.ptsGetKeywordButton(this.ptsSearchWidget)+"']"); if (inpKey != null); var inpKeyWrd = inpKey.querySelector(".ps-edit");   if(delRec == 0 ){ 
 inp = document.activeElement;  ptsProcessing(1,3000);  }

 this.ptsIsFetching = true; categoryDiv = this.ptsSearchWidget.querySelector(".pts_category_dropdown");  this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); if (!categoryDiv.classList.contains("psc_hidden")) 
 categoryDiv.classList.add("psc_hidden");   var custSrchSetting = this.ptsSearchWidget.querySelector(".ptsf_custSrchCat"); if(custSrchSetting != null) {
 var custSrchSetBtn = custSrchSetting.querySelector(".ps-button"); custSrchSetting.classList.remove("ptsf_custSrchCat"); custSrchSetBtn.setAttribute("aria-pressed", "false"); custSrchSetBtn.removeAttribute("aria-label"); custSrchSetBtn.tabIndex = -1; custSrchSetBtn.classList.remove("ptsf_brdcrmb_hghlt")
 }

 var defSrchSetting = this.ptsSearchWidget.querySelector(".ptsf_defPTPortal"); if(defSrchSetting != null) {
 var defSrchSetBtn = defSrchSetting.querySelector(".ps-button");  defSrchSetting.classList.remove("ptsf_defPTPortal", "aria-label")
 defSrchSetting.setAttribute("aria-pressed", "false"); defSrchSetting.removeAttribute("aria-label"); defSrchSetting.tabIndex = -1; defSrchSetting.classList.remove("ptsf_brdcrmb_hghlt")
 }
 
 var iter = 0; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  } 

 
 var breadCrumbs = document.getElementById(brdCrmb); while(breadCrumbs != null) {
 breadCrumbs.querySelector(".pts_brdcrumb_size").setAttribute("aria-pressed", "false"); breadCrumbs.querySelector(".pts_brdcrumb_size").classList.remove("ptsf_brdcrmb_hghlt"); breadCrumbs.querySelector(".pts_brdcrumb_size").removeAttribute("aria-label"); breadCrumbs.querySelector(".pts_brdcrumb_size").tabIndex = -1; iter++ 
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) 
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; else
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  breadCrumbs = document.getElementById(brdCrmb);  }
 
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET")) {
 if(inp.id == "PTSKEYWORD") 
 brdCrmb = "win0hdrdivPTSF_IMAGE$0";  else
 brdCrmb = "win0hdrdiv" + inp.id; }
 else {
 if(inp.id == "PTSKEYWORD") 
 brdCrmb = "win0divPTSF_IMAGE$0";  else
 brdCrmb = "win0div" + inp.id; }

 var breadCrumbs = document.getElementById(brdCrmb); if(breadCrumbs != null) {
 var catselected = breadCrumbs.querySelector(".ps-button").querySelector(".ps-text").innerHTML;  breadCrumbs.querySelector(".ps-button").setAttribute("aria-pressed", "true"); breadCrumbs.querySelector(".ps-button").tabIndex = 0; breadCrumbs.querySelector(".ps-button").classList.add("ptsf_brdcrmb_hghlt");  ariaLblTxt = "Suggestions in "+ catselected; breadCrumbs.querySelector(".ptsf_brdcrmb_hghlt").setAttribute("aria-label", ariaLblTxt);  var placeholdertext = "Search in "+ catselected;  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("placeholder",placeholdertext);   this.ptsSearchCategory = breadCrumbs.querySelector(".ps-button").getAttribute('catname');  ariaDesc = this.ptsGetResultsButton(this.ptsSearchWidget)+"_ariaD"; ariaSrchEdit = document.getElementById(ariaDesc); var str = "Search suggestions have been displayed for %1. Use the down arrow key to review the results."; str = str.replace("%1", catselected); ariaSrchEdit.innerHTML = str; }
 var inputval = inpKeyWrd.value === undefined ? "" : inpKeyWrd.value;  if( this.ptsIsSearchWidgetOpenedFromClassicPageFlag )
 {
  
  if(this.ptsInitialStateFromClassicWithKeywordsTyped)
  {
  inputval = this.ptsGetKeywordsInClassicPlaceholderSearchBox();  }
  else
  {
  
  top.document.getElementById('ptsKeywordPlaceHolder').value = inputval;  }
 }

 inputval=inputval.replace(/%/g, "*"); inputval=inputval.replace(/&/g, " "); inputval=inputval.replace(/#/g, " "); var baseURI = getptBaseURI(); var ajaxURL;  var isMiniSearch = false; if (document.activeElement.closest(".psc_mini_search") !== null) {
 isMiniSearch = true;  }
 if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) { 
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetMenuItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory + "&isMiniSearch=" + isMiniSearch; if (this.ptsincludeHiddenCref !== undefined)
 ajaxURL = ajaxURL + "&includeHiddenCref=" + this.ptsincludeHiddenCref
 if (this.ptsisComponentURL !== undefined)
 ajaxURL = ajaxURL + "&isComponentURL=" + this.ptsisComponentURL; if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined) 
 ajaxURL = ajaxURL + "&showCompletePath=" + this.ptsShowCompletePath;  if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) && !(inp.id.includes("PTSTITLE")))
 ajaxURL = ajaxURL + "&isRecentsConf=" + "True"; }
 else { 
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetContentItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory + "&editId=" + inp.id + "&isMiniSearch=" + isMiniSearch;  if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) && !(inp.id.includes("PTSTITLE")))
 ajaxURL = ajaxURL + "&isRecentsConf=" + "True"; }
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () { 
 try{
 var resultJson = JSON.parse(this.req.responseText);  gsrchRslt = resultJson;  if(resultJson.hitcount != null)
 recentHitCount = resultJson.hitcount[0].recenthits; if(resultJson.recentItems.length <= 0 && resultJson.suggestionItems.length <= 0){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD");  ptsSearchUIObj.ptsDisplayMessageBrdCrmb(""); }
 else{
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby",ptsSearchUIObj.ptsGetResultsButton(ptsSearchUIObj.ptsSearchWidget)+"_ariaD");  ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-expanded","true");  searchResults = resultJson.recentItems.concat(resultJson.suggestionItems);  if(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || ptsSearchUIObj.srchWidgetId.includes("classic")) 
 ptsSearchUIObj.ptsFillSearchResultGridHdr(searchResults, inp, recentHitCount); else
 ptsSearchUIObj.ptsFillSearchResultGrid(searchResults); ptsSearchUIObj.ptshideDisplayMessage(); }
 ptsSearchUIObj.ptsShowResults();  if(delRec == 1 && Number(count) !== 0) {
 actCount = Number(count)+1; focLoc = Number(count)-1;  if((Number(totalRecents) === Number(Recents)) && (Number(Recents) === Number(actCount))) {
 if(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 clsBtn = document.getElementById('win0hdrdivPTS_INTSCH_DVW_PTSF_DEL$' + focLoc);  }
 else {
 clsBtn = document.getElementById('win0divPTS_INTSCH_DVW_PTSF_DEL$' + focLoc); } 
 ptsSearchUIObj.ptsGetSearchResults(ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget))); clsBtn.querySelector(".ps-button").focus(); }
 }
 }
 catch(err){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD"); ptsSearchUIObj.ptsDisplayMessageBrdCrmb(this.req.responseText); ptsSearchUIObj.ptsShowResults(); }
 
 }); if(ptsSearchUIObj.ptsSearchWidget !== null){
 hideLnk = ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_hide_link"); if(hideLnk != null)
 hideLnk.tabIndex = 0; }
 },

 ptsDoGlobalSearch: function (searchbtn) {
 this.ptsSetWidget(document.activeElement); var searchkeyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value.trim(); if (searchkeyword.trim() === "")
 searchkeyword = "**"; var searchCatBrdCrmb = this.ptsSearchWidget.querySelector(".ptsf_brdcrmb_hghlt"); if(searchCatBrdCrmb != null)
 var searchCategory = searchCatBrdCrmb.getAttribute('catname'); else
 var searchCategory = this.ptsSearchWidget.querySelector("#" + this.ptsGetCategory(this.ptsSearchWidget)).getAttribute("scname"); this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); if (document.activeElement.closest(".psc_mini_search") !== null ) { 
 var keywordPageCst = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); document.querySelector("#PAGEENTSRCH").click(); return; } else {
 this.ptsDoGSearch(searchkeyword, searchCategory); }
 },

 ptsDoGSearch: function (sKeyword, sSrchGrp) {
 var sUrl; var baseURI = getptBaseURI(); if(sSrchGrp === this.componentHeaderCategory){
 sUrl = this.componentSearchURL; var nIndex = sUrl.indexOf("?");  if (nIndex < 0) {
 sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchGrp);  } else {
 if (nIndex == (sUrl.length - 1))
 sUrl = sUrl.concat("SEARCH_GROUP=" + sSrchGrp);  else
 sUrl = sUrl.concat("&SEARCH_GROUP=" + sSrchGrp);  }
 } else{
 var sPortalGSUrl = baseURI + "c/PORTAL_ADMIN.PTSF_GBLSRCH_FLUID.GBL"; sUrl = sPortalGSUrl; sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchGrp);  } 
 sUrl = sUrl.concat("&SEARCH_TEXT=" + encodeURIComponent(sKeyword)); sUrl = sUrl.concat("&SEARCH_TYPE=BASIC");  if((gsrchRslt != null) && (gsrchRslt.recentItems.length + gsrchRslt.suggestionItems.length )=== 1){
 if((gsrchRslt.recentItems.length === 1) ) {
 var resUrl = gsrchRslt.recentItems[0].url;  } else {
 var resUrl = gsrchRslt.suggestionItems[0].url; }
 openSrchRsltURL(resUrl); } else {
 
 var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetBasicSearchPage"
 + "?keyword=" + encodeURIComponent(sKeyword) + "&category=" + this.ptsSearchCategory; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 var resultUrl = this.req.responseText; if(resultUrl) {
 resultUrl = resultUrl.concat("&SEARCH_TEXT=" + encodeURIComponent(sKeyword)); resultUrl = resultUrl.concat("&SEARCH_TYPE=BASIC"); LaunchURL(null, resultUrl, 4); } else {
 LaunchURL(null, sUrl, 4); } 
 }); }
 },

 ptsFillSearchResultGrid: function (suggestItemsJson) { 
 if (suggestItemsJson !== undefined) {
 for (i = 0; i < suggestItemsJson.length; i++) {
 var gridrow = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i); if(gridrow !== null){
 gridrow.classList.remove("psc_hidden"); resultlink = gridrow.querySelector(".ps-link");  resultlink.classList.add("pts_pagewidgt"); if (i === 0)
 resultlink.tabIndex = 0; if (suggestItemsJson[i].type === "R") {
 resultlink.classList.add("pts_recent_link"); }
 else {
 resultlink.classList.remove("pts_recent_link"); resultlink.classList.add("pts_icon"); }
 resultlink.innerHTML = ""; var node = document.createElement("span");  node.classList.add("psaccesshidden"); addtlText = "Recently Accessed" + "."; node.innerHTML = addtlText + " "+ "Title - ";  resultlink.appendChild(node); var node = document.createElement("span");  node.classList.add("ps-text","pts_link_title"); node.innerHTML = suggestItemsJson[i].title;  resultlink.appendChild(node);  resultlink.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event)");  if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsOpenLink('" + suggestItemsJson[i].url + "',this)"); resultlink.setAttribute("href","javascript:void(0);")
 resultlink.setAttribute("itemid", suggestItemsJson[i].objname); resultlink.setAttribute("itemurl", suggestItemsJson[i].url); resultlink.setAttribute("nodename",suggestItemsJson[i].nodename); var node = document.createElement("span");   if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined && this.ptsShowCompletePath){
 node.innerHTML = suggestItemsJson[i].path; }
 else{
 node.innerHTML = suggestItemsJson[i].folder; }
 node.classList.add("ps-text"); node.classList.add("pts_link_summary"); resultlink.appendChild(node); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("menu", resultlink, suggestItemsJson[i]);  }
 else {
 var keystring = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value; resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsStoreContentKeyword('" + keystring + "',this)"); resultlink.setAttribute("itemid", suggestItemsJson[i].category); resultlink.setAttribute("itemurl", suggestItemsJson[i].url); resultlink.setAttribute("href", "javascript:void(0);");  var node = document.createElement("span");  node.innerHTML = suggestItemsJson[i].description; node.classList.add("ps-text"); node.classList.add("pts_link_summary"); resultlink.appendChild(node); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("content", resultlink, suggestItemsJson[i]); } 

 if (document.activeElement.closest(".psc_mini_search") !== null) {
 const root = document.getElementById("PTSTITLESS$" + i);  var iconImg1 = "url(" + suggestItemsJson[i].iconLocation + ")"; resultlink.setAttribute("ptsuggsrchimage", iconImg1); root.style.setProperty("--pt-suggsrch-image", iconImg1); }
 }
 }
 }
 for (i = suggestItemsJson.length; i < 50; i++) {
 gridrowToDel = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i); if(gridrowToDel != null) gridrowToDel.classList.add("psc_hidden"); }

 },

 ptsFillSearchResultGridHdr: function (suggestItemsJson, inp, recentHitCount) { 
 if (suggestItemsJson !== undefined) {
 
 seeAll = document.querySelector(".pts_see_all");  seeAll.querySelector(".ps-button").setAttribute("aria-describedby","Search Within"); recentCnt = 0;  srchResltLen = 50;  if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 resAreaRecents = document.getElementById('win0hdrdivPTS_INTSCH_DVW_$0'); if(resAreaRecents != null)
 resAreaRecents.classList.remove("psc_hidden"); resAreaOthSugg = document.getElementById('win0hdrdivPTSOTHSUGGS$0'); if(resAreaOthSugg != null)
 resAreaOthSugg.classList.remove("psc_hidden"); }
 else{
 resAreaRecents = document.getElementById('win0divPTS_INTSCH_DVW_$0'); if(resAreaRecents != null)
 resAreaRecents.classList.remove("psc_hidden")
 resAreaOthSugg = document.getElementById('win0divPTSOTHSUGGS$0'); if(resAreaOthSugg != null)
 resAreaOthSugg.classList.remove("psc_hidden"); }

 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 document.getElementById('win0hdrdivPTS_INTSCH_DVW_$0').classList.remove("psc_hidden"); document.getElementById('win0hdrdivPTSOTHSUGGS$0').querySelector(".pts_grdbrdrnone").classList.remove("psc_hidden"); }
 else {
 document.getElementById('win0divPTS_INTSCH_DVW_$0').classList.remove("psc_hidden"); document.getElementById('win0divPTSOTHSUGGS$0').querySelector(".pts_grdbrdrnone").classList.remove("psc_hidden");  }

 
 
 for (i = 0; i < srchResltLen ; i++) { 
 var gridrow = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i); rowToReset1 = gridrow.querySelector(".psc_width-91pct"); rowToReset = gridrow.querySelector(".pts_align_head");  if(rowToReset != null) {
 rowToReset.classList.add("ps-link");  rowToReset.classList.remove("pts_align_head", "pts_pointer_event", "pts_see_more", "pts_clrall_text");  rowToReset1.classList.remove("pts_padding", "pts_seemore_padng"); }

 
 rowToReset = gridrow.querySelector(".psc_width-100pct"); gridrow.querySelector(".ps-link").removeAttribute("role"); if(rowToReset != null) {
 rowToReset.classList.remove("pts_srchgrid_height", "pts_recent_link"); }
 }

 for (i = 0; i < suggestItemsJson.length; i++) {
 if (suggestItemsJson[i].type === "R")
 recentCnt++; }
 if(recentCnt === 0) {
 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 document.getElementById('win0hdrdivPTS_INTSCH_DVW_$0').classList.add("psc_hidden"); document.getElementById('win0hdrdivPTSOTHSUGGS$0').querySelector(".pts_grdbrdrnone").classList.add("psc_hidden"); }
 else {
 document.getElementById('win0divPTS_INTSCH_DVW_$0').classList.add("psc_hidden"); document.getElementById('win0divPTSOTHSUGGS$0').querySelector(".pts_grdbrdrnone").classList.add("psc_hidden");  }
 }
 var seeMore = document.getElementById('PTS_SEEMORE$0');  var seeMoreDiv = document.querySelector(".pts_algnpadding"); if(recentHitCount == recentCnt) {
 if(seeMoreDiv != null)
 seeMoreDiv.classList.add("psc_hidden"); }
 else {
 seeMore.setAttribute("onclick", "ptsSearchUIObj.ptsGetSearchResults('moreLink')"); if(seeMoreDiv != null)
 seeMoreDiv.classList.remove("psc_hidden"); } 
 if(recentCnt > 0) {
 var clrAllLnk = document.getElementById("PTS_CLRALL$0"); clrAllLnk.classList.add("pts_clrall_text");  clrAllLnk.tabIndex = 0;    var ariaDesc = document.createElement('span'); ariaDesc.id = "PTSRECNTVIST_ariaD"; ariaDesc.style.display = "none"; if (clrAllLnk.parentNode.querySelector("#"+ariaDesc.id) === null) {
 clrAllLnk.parentNode.appendChild(ariaDesc); clrAllLnk.setAttribute("aria-describedby",ariaDesc.id); ariaDesc.innerHTML = "Recently Visited";  }
 
 var lstGrid = document.getElementById('win0divPTS_INTELLISRCH_RS$0'); if(lstGrid != null) { 
 lstGrid.querySelector(".ps_grid-body").classList.add("pts_listSty"); }
 var lstGrid = document.getElementById('win0hdrdivPTS_INTELLISRCH_RS$0'); if(lstGrid != null) { 
 lstGrid.querySelector(".ps_grid-body").classList.add("pts_listSty", "pts_lftAlgn"); } 

 var gridrow0 = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + 0); if(gridrow0 !== null){

 
 var ClsBtn = document.getElementById("PTS_CLRALL$0");  if(ClsBtn != null) {
 if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) 
 recentType = "Menu"; else 
 recentType = "Content"; var inpCat = this.ptsSearchWidget.querySelector(".ptsf_brdcrmb_hghlt"); var srchCategory = inpCat.getAttribute('catname');  ClsBtn.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsDelOneRecent('" + "ClearAll" + "', '" + recentType + "', '" + " " + "', '" + " " + "', '" + srchCategory + "', '" + " " + "', '" + " " + "', '" + " " + "')"); ClsBtn.setAttribute("href", "javascript:void(0);"); }
 } 
 
 ariaDesc = this.ptsGetResultsButton(this.ptsSearchWidget)+"_ariaD";  if (this.ptsSearchWidget !== null){
 var ariaSel = document.querySelector(".ptsf_brdcrmb_hghlt"); if(ariaSel != null) {
 var ariaSelName = ariaSel.querySelector(".ps-text").innerHTML; }
 ariaSrchEdit = document.getElementById(ariaDesc); var str = "Search suggestions have been displayed for %1. Use the down arrow key to review the results."; str = str.replace("%1", ariaSelName); ariaSrchEdit.innerHTML = str;  } 
 }
 var lstGrid = document.getElementById('win0divPTS_INTOTHERSUGG$grid$0');  if(lstGrid != null) { 
 lstGrid.querySelector(".ps_grid-body").classList.add("pts_listSty"); }
 var lstGrid = document.getElementById('win0hdrdivPTS_INTOTHERSUGG$grid$0'); if(lstGrid != null) { 
 lstGrid.querySelector(".ps_grid-body").classList.add("pts_listSty"); } 

 j = 0; for (i = 0; i < recentCnt ; i++) { 
 var gridrow = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i); if(i == 0) 
 gridrow.querySelector(".ps-link").tabIndex = 0; else
 gridrow.querySelector(".ps-link").tabIndex = -1;  gridrow.querySelector(".ps-button").removeAttribute('tabindex'); closebtn = gridrow.querySelector(".ps_box-button"); closebtnalt = closebtn.querySelector(".ps-img")
 if(closebtnalt != null)
 closebtnalt.alt = "Delete"; grdDataCell = gridrow.querySelector(".ps_grid-cell"); grdBtnCell = gridrow.querySelector(".psc_button"); if(grdDataCell != null) {
 grdDataCell.classList.add("pts_nobdrbtm"); grdBtnCell.classList.add("pts_nobdrbtm"); }
 if(gridrow !== null){
 gridrow.classList.remove("psc_hidden"); resultlink = gridrow.querySelector(".ps-link");  if(resultlink != null)
 resultlink.classList.add("psc_width-100pct", "pts_srchgrid_height"); if (suggestItemsJson[j].type === "R") { 
 resultlink.classList.add("pts_recent_link"); gridrow.querySelector(".psc_width-100pct").classList.add("pts_recent_link");   if(closebtn != null) { 
 closebtn.classList.remove("psc_hidden"); if(g_bAccessibilityMode == false)
 closebtn.querySelector(".ps-button-wrapper").title = "Delete Recent Search";  closeBtnLink = closebtn.querySelector(".ps-button"); }
 if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 recentType = "Menu";  }
 else {
 recentType = "Content";  }
 if(closeBtnLink != null) { 
 
 closeBtnLink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsDelOneRecent('" + suggestItemsJson[j].url + "', '" + recentType + "', '" + suggestItemsJson[j].nodename + "', '" + suggestItemsJson[j].objname + "', '" + suggestItemsJson[j].category + "', '" + suggestItemsJson[j].title + "', '" + suggestItemsJson[j].description + "', '" + recentHitCount + "', '" + recentCnt + "', '" + j + "')");  closeBtnLink.setAttribute("href","javascript:void(0);"); closeBtnLink.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event)"); clsarialbld = "PTSF_IMAGE1$IMG$" + i + " " + "RecVisTitle" + i + "_ariaD"
 closeBtnLink.setAttribute("aria-labelledby", clsarialbld); closebtn.querySelector(".ps-button").classList.add("pts_border_none"); }
 }
 else {
 resultlink.classList.remove("pts_recent_link");  gridrow.querySelector(".psc_width-91pct").classList.remove("pts_recent_link");  closebtn.classList.add("psc_hidden"); }
 resultlink.innerHTML = ""; spanTitle = gridrow.querySelector(".ps-link-wrapper"); spanTitle.classList.add("pts_row_disp"); var nodeTitle = document.createElement("span");  nodeTitle.id = "RecVisTitle" + j + "_ariaD"; nodeTitle.classList.add("ps-text","pts_link_title","pts_srchrow_start"); nodeTitle.innerHTML = suggestItemsJson[j].title;  title = suggestItemsJson[j].title;  resultlink.appendChild(nodeTitle);  resultlink.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event)");  if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsOpenLink('" + suggestItemsJson[j].url + "',this)"); resultlink.setAttribute("href","javascript:void(0);")
 resultlink.setAttribute("itemid", suggestItemsJson[j].objname); resultlink.setAttribute("nodename",suggestItemsJson[j].nodename); var nodeSummary = document.createElement("span");  nodeSummary.id = "RecVisSummary" + j + "_ariaD"; if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined && this.ptsShowCompletePath){
 nodeSummary.innerHTML = suggestItemsJson[j].path; summary = suggestItemsJson[j].path; }
 else{
 nodeSummary.innerHTML = suggestItemsJson[j].folder; summary = suggestItemsJson[j].folder; }
 nodeSummary.classList.add("ps-text"); nodeSummary.classList.add("pts_link_summary"); nodeSummary.classList.add("pts_srchrow_start"); resultlink.appendChild(nodeSummary); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("menu", resultlink, suggestItemsJson[j]);  }
 else {
 var keystring = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value; resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsStoreContentKeyword('" + keystring + "',this)"); resultlink.setAttribute("itemid", suggestItemsJson[j].category); resultlink.setAttribute("itemurl", suggestItemsJson[j].url); resultlink.setAttribute("href", "javascript:void(0);");  var nodeSummary = document.createElement("span");  nodeSummary.id = "RecVisSummary" + j + "_ariaD";  nodeSummary.innerHTML = suggestItemsJson[j].description; summary = suggestItemsJson[j].description; nodeSummary.classList.add("ps-text"); nodeSummary.classList.add("pts_link_summary"); nodeSummary.classList.add("pts_srchrow_start"); resultlink.appendChild(nodeSummary); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("content", resultlink, suggestItemsJson[j]); } 
 } 
 
 if((title.localeCompare(summary)))
 gridrow.querySelector(".pts_result_link").setAttribute("aria-labelledby", nodeTitle.id + " " + nodeSummary.id); else 
 gridrow.querySelector(".pts_result_link").setAttribute("aria-labelledby", nodeTitle.id);  j=j+1; }
 }

 for (i = recentCnt; i < 50; i++) {
 this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i).classList.add("psc_hidden"); }
 var seeMr = document.getElementById("win0hdrdivPTS_SEEMORE$0"); if(seeMr!= null) {
 seeMr.querySelector(".ps-button").classList.add("pts_see_more"); seeMr.querySelector(".ps-button").setAttribute("aria-describedby","Recently Visited");  }

 var seeMr = document.getElementById("win0divPTS_SEEMORE$0"); if(seeMr!= null) {
 seeMr.querySelector(".ps-button").classList.add("pts_see_more"); seeMr.querySelector(".ps-button").setAttribute("aria-describedby","Recently Visited");  }
 
 for (i = 0; i < 50; i++) { 
 othSuggRow = document.getElementById("PTS_INTOTHERSUGG$0_row_" + i); othSuggRow.classList.remove("psc_hidden"); }
 
 j = recentCnt;  if(recentCnt == suggestItemsJson.length) {
 othSuggHdr = document.querySelector(".pts_othSugg"); if(othSuggHdr != null)
 othSuggHdr.classList.add("psc_hidden"); }
 for (i = 0; i < srchResltLen && j <= (suggestItemsJson.length-1); i++) { 
 var gridrow = document.getElementById("PTS_INTOTHERSUGG$0_row_" + i);  if(gridrow !== null){
 gridrow.classList.add("pts_othsugg_width"); resultlink = gridrow.querySelector(".ps-link");  resWrp = gridrow.querySelector(".ps-link-wrapper");  if(resWrp != null)
 resWrp.classList.add("psc_width-100pct"); if(resultlink != null) {
 resultlink.classList.add("psc_width-100pct", "pts_srchgrid_height", "pts_icon");  if(g_bAccessibilityMode == false) {
 if(i == 0)
 resultlink.tabIndex = 0;  } 
 resultlink.innerHTML = ""; }
 

 var nodeTitle = document.createElement("span");   nodeTitle.id = "OthVisTitle" + j + "_ariaD";  nodeTitle.classList.add("ps-text","pts_link_title","pts_srchrow_start"); nodeTitle.innerHTML = suggestItemsJson[j].title;  title = suggestItemsJson[j].title;  resultlink.appendChild(nodeTitle);  resultlink.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event)");  if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsOpenLink('" + suggestItemsJson[j].url + "',this)"); resultlink.setAttribute("href","javascript:void(0);")
 resultlink.setAttribute("itemid", suggestItemsJson[j].objname); resultlink.setAttribute("nodename",suggestItemsJson[j].nodename); var nodeSummary = document.createElement("span");   nodeSummary.id = "OthVisSummary" + j + "_ariaD";  if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined && this.ptsShowCompletePath){
 nodeSummary.innerHTML = suggestItemsJson[j].path; summary = suggestItemsJson[j].path; }
 else{
 nodeSummary.innerHTML = suggestItemsJson[j].folder; summary = suggestItemsJson[j].folder; }
 nodeSummary.classList.add("ps-text"); nodeSummary.classList.add("pts_link_summary"); nodeSummary.classList.add("pts_srchrow_start"); resultlink.appendChild(nodeSummary); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("menu", resultlink, suggestItemsJson[j]);  }
 else {
 var keystring = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value; resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsStoreContentKeyword('" + keystring + "',this)"); resultlink.setAttribute("itemid", suggestItemsJson[j].category); resultlink.setAttribute("itemurl", suggestItemsJson[j].url); resultlink.setAttribute("href", "javascript:void(0);");  var nodeSummary = document.createElement("span");   nodeSummary.id = "OthVisSummary" + j + "_ariaD";  nodeSummary.innerHTML = suggestItemsJson[j].description; summary = suggestItemsJson[j].description; nodeSummary.classList.add("ps-text"); nodeSummary.classList.add("pts_link_summary"); nodeSummary.classList.add("pts_srchrow_start"); resultlink.appendChild(nodeSummary); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("content", resultlink, suggestItemsJson[j]); } 
 
 }
 
 if((title.localeCompare(summary)))
 gridrow.querySelector(".pts_result_link").setAttribute("aria-labelledby", nodeTitle.id + " " + nodeSummary.id); else 
 gridrow.querySelector(".pts_result_link").setAttribute("aria-labelledby", nodeTitle.id); j=j+1; }
 for (i = suggestItemsJson.length - recentCnt; i < 50; i++) { 
 othSuggRow = document.getElementById("PTS_INTOTHERSUGG$0_row_" + i); othSuggRow.classList.add("psc_hidden"); }
 },


 ptsAddResultAriaAttr: function(type, resultlink,suggestItemsJson){ 
 var ariaDescid = resultlink.id + "_ariaD"; ariaDescid = ariaDescid.replace("$",""); if (resultlink.parentNode.querySelector("#"+ariaDescid) === null){
 var ariaDesc = document.createElement('span'); ariaDesc.id = ariaDescid; ariaDesc.style.display = "none"; }
 else
 ariaDesc = resultlink.parentNode.querySelector("#"+ariaDescid); var addtlText = "";  if (resultlink.classList.contains("pts_recent_link")){
 addtlText = "Recently Accessed" + "."; }
 else{
 addtlText = "Suggestion"+ "."; }

 if(type === "menu"){ 
 ariaDesc.innerHTML = addtlText + " "+ "Title - "+suggestItemsJson.title; ariaDesc.innerHTML = ariaDesc.innerHTML + ",Root Folder - "+suggestItemsJson.folder; }
 else{
 
 ariaDesc.innerHTML = addtlText + " " + "Title - "+suggestItemsJson.title;  ariaDesc.innerHTML = ariaDesc.innerHTML + ",Summary - "+suggestItemsJson.description;  }
 },

 ptsOpenLink: function (menulink, e) {
 if (e.closest(".pts_pagesearch_div") !== null){
 submitAction_win0(document.win0, '#ICSetField' + this.ptsPageName + '.PORTALOBJSS.' + e.getAttribute("itemid")); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value = e.querySelector(".pts_link_title").innerHTML; this.ptsCloseAllLists(); }
 else if ((e.closest(".psc_mini_search") !== null) && !this.RedirectAutomatically) {
 var drillurl = document.querySelector("#DRILLURLSS"); if (drillurl.value == menulink) {
 drillurl.value = menulink +"&sameURL=Y"; }
 else {
 drillurl.value = menulink; }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value=""; addchg_win0(drillurl); submitAction_win0(document.win0,'DRILLURLSS'); this.ptsCloseAllLists(); } 
 else{
 var baseURI = getptBaseURI(); var sVal = "";  s = top.window.document.getElementById("ICSCRIPTSID"); if (s && s.tagName.toUpperCase() === "SPAN") {
 if (!/ptnbsid/.test(s.textContent))
 sVal = "&ptnbsid=" + s.textContent ;  else 
 sVal= "&" + s.textContent; } 
 var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_StoreMenuKeyword"
 + "?portalobj=" + e.getAttribute("itemid")+"&nodename="+e.getAttribute("nodename") + sVal; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); openSrchRsltURL(menulink); }); }
 },

 ptsStoreContentKeyword: function (keystring, e) {
 if ((e.closest(".psc_mini_search") !== null) && !(this.RedirectAutomatically)) {
 var drillurl = document.querySelector("#DRILLURLSS"); if (drillurl.value == e.getAttribute("itemurl")) {
 drillurl.value = e.getAttribute("itemurl") +"&sameURL=Y"; }
 else {
 drillurl.value = e.getAttribute("itemurl"); }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value=""; addchg_win0(drillurl); submitAction_win0(document.win0,'DRILLURLSS'); this.ptsCloseAllLists(); }
 else {
 var link = e.getAttribute("itemurl");  var titleValue = e.querySelector(".pts_link_title").innerHTML; titleValue=titleValue.replace(/"/g, "\\\""); titleValue = encodeURIComponent(unescape(titleValue)); var descrValue = e.querySelector(".pts_link_summary").innerHTML; descrValue=descrValue.replace(/"/g, "\\\""); descrValue = encodeURIComponent(unescape(descrValue)); var urlValue = encodeURIComponent(link); var requestJson = "{\"root\":{\"category\":\"" + e.getAttribute("itemid") + "\",\"keyword\":\"" + keystring + "\",\"title\":\"" + titleValue 
 + "\"," + "\"description\":\"" + descrValue + "\",\"url\":\"" + urlValue + "\"}}"; var baseURI = getptBaseURI(); var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_StoreContentKeyword?requestJson=" + requestJson;  var nUrlPos = String(link).indexOf('\/psp\/');  if(nUrlPos === -1)
 var nUrlContPos = String(link).indexOf('\/psc\/');   if(nUrlContPos === -1){
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () { 
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000);  openSrchRsltURL(link); ptsProcessing(0,3000);  });  } 
 else {
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () { 
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); openSrchRsltURL(link); }); }
 }
 },
 
 ptsShowResults: function () { 
 var searchtray = this.ptsSearchWidget.querySelector(".pts_search_tray"); var resultbox = searchtray.querySelector(".pts_results_grid");  var isBrdCrmOneRow = false;  seeAllDiv = document.querySelector(".pts_see_all"); seeLessDiv = document.querySelector(".pts_hide");  if (searchtray.classList.contains("psc_hidden")){
 if(window.innerWidth <= 680){
 this.ptsSearchWidgetMask.classList.add("psc_hidden");; }else {
 this.ptsSearchWidgetMask.classList.remove("psc_hidden");  }
 this.ptsSearchWidgetMask.classList.remove("psc_hidden");  this.ptsSearchcontentDiv.classList.add("pts_search_focused");  this.ptsSearchcontentDiv.classList.remove("psc_hidden");  var editbox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getBoundingClientRect(); var searchbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).getBoundingClientRect();  var messagebox = searchtray.querySelector(".pts_message"); if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET")) || (this.srchWidgetId.includes("classic"))) { } else {
 var categorybtn = this.ptsSearchWidget.querySelector(".pts_category_button").getBoundingClientRect(); if ("left" === "left")
 searchtray.style.marginLeft = categorybtn.width+"px"; else
 searchtray.style.marginRight = categorybtn.width+"px"; }
 resultbox.style.width= editbox.width+searchbtn.width+"px"; messagebox.style.width= editbox.width+searchbtn.width+"px"; if (searchtray.classList.contains("psc_hidden"))
 ptsProcessing(0,3000); if(!this.ptsInitialLoad){
 searchtray.classList.remove("psc_hidden"); }
 else
 this.ptsInitialLoad = false; if(this.ptsOpenSearchInModal){ 
 this.ptsReposition();  parent.ptsIsSearchLoaded = true;  }
 }
 searchtray.scrollTop = 0;  var ariaId = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getAttribute("aria-describedby"); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-describedby", ariaId); this.ptsIsFetching = false;  ptsProcessing(0,3000); if (this.ptsIsSearchWaiting){
 this.ptsGetSearchResults(this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget))); this.ptsIsSearchWaiting = false; }


 if((this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic")) && this.ptsResultsOpen == false) {
 if(seeLessDiv != null)
 seeLessHid = seeLessDiv.classList.contains("psc_hidden");   if(seeLessHid != false) {
 
 brdCrumbdispHt= document.getElementById("PTSF_BREADCRUM$0_row_0"); if(brdCrumbdispHt != null) {
 brdCrmbDispPos = brdCrumbdispHt.getBoundingClientRect();  var iter = 0; var fromIterToHide = 0; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumbs = document.getElementById(brdCrmb);   while(breadCrumbs != null) { 
 srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter);  hidebtn = srchCatGridRow.querySelector(".pts_hide"); if(hidebtn == null)
 srchCatGridRow.classList.remove("psc_hidden");  iter++; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  }
 var breadCrumbs = document.getElementById(brdCrmb); }

 iter = 0; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter; }
 var breadCrumbs = document.getElementById(brdCrmb); while(breadCrumbs != null) { 
 srchCatGridRow = document.getElementById("PTSF_BREADCRUM$0_row_" + iter);  brdCrmbPos = srchCatGridRow.getBoundingClientRect(); srchCatButn = breadCrumbs.querySelector(".ps-button"); hidebtn = srchCatGridRow.querySelector(".pts_hide"); if(srchCatButn != null) {
 if(brdCrmbPos.bottom > brdCrmbDispPos.bottom) { 
 if(fromIterToHide === 0)
 fromIterToHide = iter;  if(hidebtn == null); isBrdCrmOneRow = false; } else {
 isBrdCrmOneRow = true; }
 }
 iter++; if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmb = "win0hdrdivPTSF_IMAGE$" + iter; }
 else {
 brdCrmb = "win0divPTSF_IMAGE$" + iter;  }
 endIterToHide = iter-1; var breadCrumbs = document.getElementById(brdCrmb); }
 } 
 if(isBrdCrmOneRow) { 
 
 endIterToHide = 0; if(seeAllDiv != null)
 seeAllDiv.classList.add("psc_hidden"); if(seeLessDiv != null)
 seeLessDiv.classList.add("psc_hidden"); }
 else { 
 if(seeLessDiv != null) { 
 
 seeLessHid = seeLessDiv.querySelector(".psc_hidden"); if(seeLessHid != null) {
 if(seeAllDiv != null)
 seeAllDiv.classList.remove("psc_hidden"); }
 }
 }

 
 if(g_bAccessibilityMode == false) {
 for(let i = fromIterToHide; i < endIterToHide; i++) { 
 brdCrmbdiv = "PTSF_BREADCRUM$0_row_" + i; var breadCrumbsDiv = document.getElementById(brdCrmbdiv); if(breadCrumbsDiv != null)
 breadCrumbsDiv.classList.add("psc_hidden"); }
 } 
 }
 }
 this.ptsResultsOpen = true;  },

 ptsclickOutside: function (e) {
 if (this.ptsSearchWidget !== null && this.ptsSearchWidget.classList.contains("pts_search_widget_sff")){
 if(this.ptsSearchcontentDiv.querySelector(".pts_back_button").contains(e.target))
 this.ptsCloseAllLists();  }
 else if (this.ptsPagetype === "T") {
 if (!(this.ptsSearchWidget !== null && this.ptsSearchWidget.querySelector(".pts_search_content").contains(e.target)))
 this.ptsCloseAllLists();  }
 else{
 if (!(this.ptsSearchWidget !== null && this.ptsSearchWidget.querySelector(".pts_search_tray").contains(e.target)) 
 && e.target != document.getElementById("PTS_SEARCH_BTN$IMG")) {
 this.ptsCloseAllLists(); }
 }
 },

 ptsCloseIframe: function () {
 doCloseLocalModals(); parent.ptsIsSearchLoaded = false; var searchbutton; var parentdoc = window.parent.document; var searchmodal = parentdoc.getElementById("ptsSearchModal");  if (window.parent.document.getElementById("ptsKeywordPlaceHolder")){
 searchbutton = parentdoc.getElementById("ptsKeywordPlaceHolder");   if(searchbutton !== null)
  searchbutton.focus();  }

 var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; if(is_chrome){
 if(parentdoc.getElementById("pthdr2home")){
 homebuttonptsf = parentdoc.getElementById("pthdr2home");  if(homebuttonptsf !== null)
  homebuttonptsf.focus(); }
 }

 searchmodal.parentNode.removeChild(searchmodal);   if(parentdoc.getElementById("PT_GSEARCH_BTN")){
 searchbutton = parentdoc.getElementById("PT_GSEARCH_BTN");  if(searchbutton !== null)
  searchbutton.focus(); } 
 
 },
 
 ptsReestablishStyle: function () { 
 if(this.ptsSearchWidget != null) {
 var SrchCategory = top.document.getElementById('PTSCATEGORYBTNSS').getAttribute("title"); if(SrchCategory != null)
 this.ptsSetPlaceholder(SrchCategory, "", "Keywords");  top.document.getElementById('win0divPTSCONTENTBOX').classList.remove("psc_hidden"); top.document.getElementById('win0divPTSKEYWORDSS').classList.add("pts_categorybtn_exists"); top.document.getElementById('win0divPTSKEYWORDSS').classList.add("pts_searchbtn_exists"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_categorybtn_exists_test"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_searchbtn_exists"); ptsSearchBox = top.document.getElementById('PTSKEYWORDSS'); if(ptsSearchBox != null) {
 
 ptsSearchBox.removeEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) }); ptsSearchBox.addEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) });   ptsSearchBox.removeEventListener('click', function () { ptsSearchUIObj.ptsGetSearchResults(ptsSearchBox) }); ptsSearchBox.addEventListener('click', function () { ptsSearchUIObj.ptsGetSearchResults(ptsSearchBox) }); } }
 },

 ptsPopulateCstSrch: function () { 
 var SrchCategory = this.ptsSearchWidget.querySelector("#" + this.ptsGetCategory(this.ptsSearchWidget)).innerHTML; if(SrchCategory != null)
 this.ptsSetPlaceholder(SrchCategory, "", "Keywords");  this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_categorybtn_exists"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_searchbtn_exists"); ptsSearchBox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget));   ptsSearchBox.focus(); ptsSearchBox.setSelectionRange(ptsSearchBox.value.length, ptsSearchBox.value.length); ptsSearchBox.removeEventListener('click', this.hdleSrchEdtClick); ptsSearchBox.addEventListener('click', this.hdleSrchEdtClick); ptsSearchBox.removeEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) }); ptsSearchBox.addEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) });  JsonReslt = document.getElementById('PTS_INTSRCH_WK_PTS_JSONVAL').innerHTML; var resultJson = JSON.parse(JsonReslt); searchResults = resultJson.recentItems.concat(resultJson.suggestionItems);  ptsSearchUIObj.ptsFillSearchResultGrid(searchResults); ptsSearchUIObj.ptshideDisplayMessage();  ptsSearchUIObj.ptsShowResults(); },

 ptsCloseAllLists: function () {
 if (this.ptsSearchWidget !== null) {

 this.ptsSearchWidgetMask.classList.add("psc_hidden");  this.ptsSearchcontentDiv.classList.remove("pts_search_focused");  if (this.ptsSearchWidget.classList.contains("pts_search_widget_sff")){
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff"); this.ptsSearchWidget.removeAttribute("style"); this.ptsSearchcontentDiv.querySelector(".pts_back_button").classList.add("psc_hidden"); } else{
 this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  if (document.activeElement.closest(".psc_mini_search") !== null) { 
 var keywordss = document.getElementById("PTSKEYWORDSS"); if(keywordss != null) {
 keywordss.removeAttribute("role"); keywordss.setAttribute("aria-expanded", "false"); }
 } 
 }
 
 if (window.innerWidth <= 767) { 
 backBtn = document.getElementById('win0divPTSBACKBTNSS'); if(backBtn != null) {
 backBtn.style.display = "none"
 }
 kywrd = document.getElementById('win0divPTSKEYWORDSS'); if(kywrd != null) {
 kywrd.style.display = "none"; }
 pageSrchIcn = document.getElementById('win0divPAGESRCHBTN'); if(pageSrchIcn != null) {
 if((pageSrchIcn.classList.contains("psc_hidden"))) { 
 pageSrchIcn.classList.remove("psc_hidden");  } 
 } 
 }
 this.ptsSearchWidget.querySelector(".pts_category_dropdown").classList.add("psc_hidden"); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded","false"); this.ptsSearchWidget.querySelector(".pts_message ").classList.add("psc_hidden");  this.ptsSearchWidget.querySelector(".pts_results_grid").classList.remove("psc_hidden"); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-describedby",this.ptsGetKeywordButton(this.ptsSearchWidget)+"_ariaD");  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-expanded","false");  }
 if(window.parent.document.getElementById("ptsSearchModal")){
 this.ptsCloseIframe(); } 
 this.ptsResultsOpen = false; },


 ptsshowDisplayMessage: function(message){
 if (this.ptsSearchWidget !== null) {
 messagediv = this.ptsSearchWidget.querySelector(".pts_message ");  resultsgrid = this.ptsSearchWidget.querySelector(".pts_results_grid");  }
 if(this.ptsMessage === undefined){
 this.ptsMessage = messagediv.querySelector(".ps-text").innerHTML; }
 if(message !== ""){
 messagediv.querySelector(".ps-text").innerHTML = message; }
 else{
 messagediv.querySelector(".ps-text").innerHTML = this.ptsMessage; }
 var messagespan = messagediv.querySelector(".ps-text"); messagespan.setAttribute("id","PTSDISPLAYMSG_ariaD"); messagediv.classList.remove("psc_hidden"); resultsgrid.classList.add("psc_hidden"); },

 ptsDisplayMessageBrdCrmb: function(message){ 
 if (this.ptsSearchWidget !== null) {

 if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 brdCrmbMsgDisp = "win0hdrdivPTSMSGDISPLAY"; }
 else {
 brdCrmbMsgDisp = "win0divPTSMSGDISPLAY"; }
 brdCrmbMsgDispdiv = document.getElementById(brdCrmbMsgDisp); messagediv = this.ptsSearchWidget.querySelector(".pts_message ");  resultsgrid = this.ptsSearchWidget.querySelector(".pts_results_grid");  resultsgridbrdcrmb = resultsgrid.querySelector(".psc_grid-norowcount"); }
 if(this.ptsMessage === undefined){
 this.ptsMessage = brdCrmbMsgDispdiv.querySelector(".ps-text").innerHTML; }
 if(message !== ""){
 brdCrmbMsgDispdiv.querySelector(".ps-text").innerHTML = message; }
 else{
 brdCrmbMsgDispdiv.querySelector(".ps-text").innerHTML = this.ptsMessage; }
 var messagespan = brdCrmbMsgDispdiv.querySelector(".ps-text"); brdCrmbMsgDispdiv.classList.remove("psc_hidden"); if(this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") ) {
 resAreaRecents = document.getElementById('win0hdrdivPTS_INTSCH_DVW_$0'); if(resAreaRecents != null)
 resAreaRecents.classList.add("psc_hidden"); resAreaOthSugg = document.getElementById('win0hdrdivPTSOTHSUGGS$0'); if(resAreaOthSugg != null)
 resAreaOthSugg.classList.add("psc_hidden"); }
 else{
 resAreaRecents = document.getElementById('win0divPTS_INTSCH_DVW_$0'); if(resAreaRecents != null)
 resAreaRecents.classList.add("psc_hidden")
 resAreaOthSugg = document.getElementById('win0divPTSOTHSUGGS$0'); if(resAreaOthSugg != null)
 resAreaOthSugg.classList.add("psc_hidden"); }
 },

 ptshideDisplayMessage: function(){ 
 if (this.ptsSearchWidget !== null) {
 messagediv = this.ptsSearchWidget.querySelector(".pts_message ");  resultsgrid = this.ptsSearchWidget.querySelector(".pts_results_grid"); } 
 messagediv.classList.add("psc_hidden"); resultsgrid.classList.remove("psc_hidden"); resultsgridbrdcrmb = resultsgrid.querySelector(".psc_grid-norowcount"); if(resultsgridbrdcrmb != null) { resultsgridbrdcrmb.classList.remove("psc_hidden"); }
 },

 ptskeyDownFunction: function(e){ 
 var activeElement = document.activeElement; var activelemId = activeElement.id; var partArray; this.ptsSetWidget(activeElement); if ((e.shiftKey && e.key === 'Tab') && (activeElement.closest(".ps_box-menuitem")!==null)) {
 return; }
 if ((e.shiftKey && e.key === 'Tab') && (activeElement.closest(".pts_icon")!==null)) {
 return; }

 if(!(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))) {
 if ((e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Down") && (activeElement.closest(".pts_recent_link")!==null)) {
 e.preventDefault(); return; }
 }
 if ((e.key === "ArrowDown" || e.key === "Down" || e.code === "Space") && (activelemId == this.ptsGetCategory(this.ptsSearchWidget))) {
 ptsSearchUIObj.ptsToggleCategories(); e.stopPropagation(); return; }

 if (e.key === "ArrowLeft") {
 if (activelemId == this.ptsGetTitle(this.ptsSearchWidget)+"$0") 
 this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).focus(); else {
 partArray = activelemId.split('$'); if (partArray.length == 2) {
 var nRes = parseInt(partArray[1] - 1); document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$" + nRes.toString()).focus(); }
 }
 return; }

 if(!(ptsSearchUIObj.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))) {
 if (e.key === "ArrowRight") {
 if (activeElement.id == this.ptsGetTitle(this.ptsSearchWidget)+"$49") 
 this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).focus(); else {
 partArray = activelemId.split('$'); if (partArray.length == 2) {
 var nRes = 1 + parseInt(partArray[1]); var elemT = document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$" + nRes.toString()); var elemLi = document.getElementById(this.ptsGetSuggGrid(this.ptsSearchWidget)+"$0_row_" + nRes.toString()); var sLiCls = elemLi.getAttribute("class"); if (sLiCls.indexOf('psc_hidden') == -1)
 elemT.focus(); else; this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).focus(); }
 }
 }
 }

 if (e.key === "Escape" || e.key === "Esc" || e.key === "Tab") {
 
 if((activeElement.closest(".pts_brdcrumb_size")!==null || (activeElement.closest(".pts_see_all")!==null) || 
 (activeElement.closest(".pts_clrall_text")!==null) || (activeElement.closest(".pts_algnpadding")!==null)) && e.key === "Tab") return; this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); if(this.ptsOpenSearchInModal && activeElement.closest(".pts_category_dropdown")!==null){
 this.ptsToggleCategories(); }
 else if((this.ptsOpenSearchInModal && (e.key === "Escape"|| e.key === "Esc")) || !this.ptsOpenSearchInModal){ 
 if(activeElement.closest(".pts_results_grid")!==null){
 
 if(!this.ptsOpenSearchInModal && (e.key === "Escape"|| e.key === "Esc"))
 this.ptsSearchWidgetMask.classList.add("psc_hidden");   if(((activeElement.closest(".pts_see_all")!==null) || (activeElement.closest(".pts_clrall_text")!==null)
 || (activeElement.closest(".pts_algnpadding")!==null) || (activeElement.closest(".pts_srchgrid_height")!==null)
 || (activeElement.closest(".pts_border_none")!==null) || (activeElement.closest(".pts_nobdrbtm")!==null)
 || (activeElement.closest(".ps_box-menuitem")!==null) || (activeElement.closest(".pts_brdcrumb_size")!==null)) 
 && (e.key === "Escape"|| e.key === "Esc")){
 this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  this.ptsResultsOpen = false; this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).focus(); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-expanded","false"); }
 }else{
 if(e.key === "Escape"|| e.key === "Esc") {
 this.ptsCloseAllLists();  e.stopPropagation(); }
 }
 } 

 
 if(e.key === "Tab" && (this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") )) { 
 if(activeElement.closest(".pts_results_grid")!==null){
 if(activeElement.closest(".pts_recent_link")===null) {
 if(this.ptsOpenSearchInModal) {
 this.ptsCloseAllLists(); }
 }
 if((activeElement.closest(".pts_icon")!==null) || (activeElement.closest(".pts_message")!==null)) { 
 this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).focus();  e.preventDefault(); return;  }
 }
 }
 
 if(activeElement.closest(".pts_category_dropdown")!==null){
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus(); e.stopPropagation(); } 
 }
 }
};var ptsSearchUIObj = new PTS_SearchUI();if (!Element.prototype.matches) {
 Element.prototype.matches = Element.prototype.msMatchesSelector || 
 Element.prototype.webkitMatchesSelector;}

if (!Element.prototype.closest) {
 Element.prototype.closest = function(s) {
 var el = this; do {
 if (Element.prototype.matches.call(el, s)) return el; el = el.parentElement || el.parentNode; } while (el !== null && el.nodeType === 1); return null; };}

if (!String.prototype.startsWith) {
 String.prototype.startsWith = function(searchString, position){
 return this.substr(position || 0, searchString.length) === searchString; };}
