
PT_typeahead.prototype.SetProperties = function(xElem, xColNum, xHidden,xserverCode,
 xignoreCase,xmatchAnywhere,xmatchTextBoxWidth,
 xshowNoMatchMessage,xuseTimeout,xtheVisibleTime) {
 var props={
 elem:xElem,
 colnum:xColNum,
 hidden:xHidden,
 serverCode:xserverCode,
 regExFlags: ( (xignoreCase)?"i":""),
 regExAny:((xmatchAnywhere)?"":"^"), 
 matchAnywhere:xmatchAnywhere,
 matchTextBoxWidth:xmatchTextBoxWidth,
 theVisibleTime:xtheVisibleTime,
 showNoMatchMessage:xshowNoMatchMessage,
 useTimeout:xuseTimeout,
 arrOptions:new Array(),
 arrHeaders:new Array()
 }; this.AddHandler(xElem); this.cleanFluidCache(xElem);  if (bSpEnable)
 this.smartPromtsEnabled = true; else
 this.smartPromtsEnabled = false; return props;};PT_typeahead.prototype.cleanFluidCache = function(el) {
 if (isFModeLayout()) {
 var mObj = ptTAObj_win0.oDoc.getElementById(el.id +'$typeahead'); if (mObj != null && typeof mObj != "undefined"){
 mObj.removeAttribute("squeryvalue"); mObj.arrOptions = new Array(); }
 }
};PT_typeahead.prototype.AddHandler = function(objText){
 objText.onblur=function(){
 ptTAObj_win0.bLostFocus = true; if (this.obj.useTimeout) {
 ptTAObj_win0.StartTimeout(); }
 }
};PT_typeahead.prototype.resetTextBox = function(theTextBox){
 this.theTextBox=theTextBox;};PT_typeahead.prototype.OnPromptLaunch = function(oDoc) {
 if (!oDoc || typeof oDoc == 'undefined') return; el=oDoc.getElementById('pt_typeahead0'); if (el && typeof el != 'undefined')
 el.innerHTML="<span id='pt_typeahead' class='spanTextDropdown'></span>";};PT_typeahead.prototype.KeyUpDown = function(e) {
 if (typeof ptTAObj_win0.oWin == 'undefined') 
 return; this.bTabPressed = false; this.bKeyUp = false; this.bKeyDown = false; var intKey=-1; ptTAObj_win0.bLostFocus = false; if (this.theTextBox)
 addchg_win0(this.theTextBox); if (ptTAObj_win0.oWin.event) 
 intKey=ptTAObj_win0.oWin.event.keyCode; else
 intKey = e.which; if (intKey == this.CTRL) 
 return true; if (intKey == this.ALT) { 
 ptTAObj_win0.EraseDelayTime();  return true; }
 if (intKey==this.UPARROW) {
 this.bKeyUp = true; ptTAObj_win0.MoveHighlight(-1); ptTAObj_win0.GrabHighlighted(); return true; }
 else if (intKey == this.DOWNARROW) {
 this.bKeyDown = true; ptTAObj_win0.MoveHighlight(1); ptTAObj_win0.GrabHighlighted(); return true; }
 else if (intKey == this.ENTER) { 
 if (this.currentValueSelected >= 0) {
 var xVal = this.currentValueSelected + this.startPos; this.SetText(xVal); ptTAObj_win0.isTiming = true; }
 return true; }
 else if (intKey == this.ESCAPE) {
 ptTAObj_win0.isTiming = true; ptTAObj_win0.HideTheBox();  return true; }
 else if (intKey == this.TAB) {
 this.bTabPressed = true;  var xVal;  if (isTypeAheadEl(ptTAObj_win0.oWin.event) && (ptTAObj_win0.IsGrabHighlighted())) {
 
 if (this.currentValueSelected >= 0 && this.currentValueSelected < 5) {
 xVal = this.currentValueSelected + this.startPos;  if (!ptTAObj_win0.IsSelectedUnique(xVal)) {
 this.UpdateControlField(xVal); } 
 } 
 } 

 if (typeof xVal == 'undefined')
 xVal = this.currentValueSelected + this.startPos;   if (this.theTextBox != null) {
 var thisObj = this.theTextBox.attributes.getNamedItem('onchange'); if (thisObj != null && thisObj.nodeValue != null) 
 this.theTextBox.onchange(); else if ((typeof xVal != 'undefined') && (xVal >= 0))
 this.SetText(xVal); if (isFModeLayout())
 typeAheadPositionTopClear()
 else
 ptTAObj_win0.HideTheBox();  if (pm)
 pm.updateEventAfterTypeahead(); }
 return true; }
 return false;};PT_typeahead.prototype.GiveOptions = function(e) {
 if (typeof ptTAObj_win0.oWin == 'undefined') 
 return; this.PositionTop(getEventTarget(e)); var intKey = -1; if (ptTAObj_win0.oWin.event) { 
 intKey = ptTAObj_win0.oWin.event.keyCode; this.theTextBox=ptTAObj_win0.oWin.event.srcElement; }
 else{
 intKey = e.which; this.theTextBox = e.target; }
 if(intKey == 8) bBackSpaceKeyFlagForSmartPrompt = true; if (intKey == this.CTRL || intKey == this.TAB) { 
 this.lastIntKey = intKey;  return true; }
 if (intKey == this.SHIFT || intKey == this.END) { 
 this.lastIntKey = intKey;  return true; }

 if (ptTAObj_win0.CancelTypeAhead(this.theTextBox)) return false;  if (intKey == this.BACKSPACE || this.lastIntKey != this.BACKSPACE) {
 ptTAObj_win0.EraseDelayTimeout(); }

 
 if ((intKey == this.SHIFT && this.lastIntKey == this.TAB) ||
 (intKey == this.SHIFT && this.lastIntKey == this.SHIFT)) { 
 this.lastIntKey = intKey; return false; } 

 this.lastIntKey = intKey; if ((intKey>=this.LEFTARROW && intKey<=this.DOWNARROW)) {
 return false; }

 ptTAObj_win0.resetTextBox(this.theTextBox); if (this.theTextBox.value.length==0&&!this.isOpera) { 
 this.InitArrOptions(); ptTAObj_win0.HideTheBox(); ptTAObj_win0.strLastValue=''; this.cleanFluidCache(this.theTextBox); }
 if (this.objLastActive==this.theTextBox) {
 if (intKey==this.ENTER) { 
 ptTAObj_win0.GrabHighlighted(); this.theTextBox.blur(); }
 } 
 if (this.theTextBox.value.length==0) {

 ptTAObj_win0.isTiming = true; ptTAObj_win0.HideTheBox();  }
 else {
 if ( ptTAObj_win0.bInProcess || (this.objLastActive!=this.theTextBox) ||
 ((this.theTextBox.value.length!=0) && (this.theTextBox.value.length > ptTAObj_win0.strLastValue.length)) ||
 (this.theTextBox.value.indexOf(ptTAObj_win0.strLastValue)!=0) ||
 (this.GetArrOptions().length==0 && !this.bNoResults) ||
 (this.theTextBox.value.length <= ptTAObj_win0.strLastValue.length) ) {
 ptTAObj_win0.StartDelayTimeout(); } else {
 if (this.theTextBox.obj.nMaxRows==this.GetArrOptions().length) {
 ptTAObj_win0.DoTypeAhead(); }
 else {
 ptTAObj_win0.BuildList(this.theTextBox.value); }
 }
 }
 return true;};PT_typeahead.prototype.reachMaxBufferSize = function(){
 return this.GetArrOptions().length >= 300;};PT_typeahead.prototype.DoTypeAhead = function(){
 this.smartPromtsEnabledAtFieldLevel = false; var checkIfFieldEnabledForSP = this.theTextBox.getAttribute('onfocus');   if (checkIfFieldEnabledForSP && checkIfFieldEnabledForSP.includes("onSmartPromptDataChange"))
 this.smartPromtsEnabledAtFieldLevel = true; else {
 checkIfFieldEnabledForSP = this.theTextBox.getAttribute('onfocusin');  if (checkIfFieldEnabledForSP && checkIfFieldEnabledForSP.includes("onSmartPromptDataChange"))
 this.smartPromtsEnabledAtFieldLevel = true; else {
 checkIfFieldEnabledForSP = this.theTextBox.getAttribute('onfocusout');  if (checkIfFieldEnabledForSP && checkIfFieldEnabledForSP.includes("onSmartPromptDataChange"))
 this.smartPromtsEnabledAtFieldLevel = true; else {
 this.smartPromtsEnabledAtFieldLevel = false; }
 }
 }

 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel && !isFModeLayout()) {
 this.fetchDataFromIndexDbForTypeAheadSP(); }
 

 var mObj = this.GetContainerEl(); var theMatch = null; if (isFModeLayout() && mObj) {
 var sQuery = mObj.getAttribute('sQueryValue'); if (sQuery && sQuery.length > 0 
 && this.getPrefixLength(this.theTextBox.value,sQuery) > 0) {
 theMatch = true; }
 }

 var sTmpBuildChoices = 1; if (ptTAObj_win0 && ptTAObj_win0.theTextBox && ptTAObj_win0.theTextBox.form)
 sTmpBuildChoices = ptTAObj_win0.theTextBox.form.TA_BuildChoices.value; if (!this.reachMaxBufferSize() 
 && (theMatch || ((this.GetArrOptions().length > 0 && !this.bNoResults)
 && (this.objLastActive == null || this.objLastActive.id == this.theTextBox.id)
 && (this.getPrefixLength(this.theTextBox.value,ptTAObj_win0.strLastValue) > 0)
 && (sTmpBuildChoices == 0)
 )) ) { 
 
 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel && isFModeLayout()) {
 this.fetchDataFromIndexDbForTypeAheadSP();  }
 else {
 var bShowMatch = this.theTextBox.obj.showNoMatchMessage; this.theTextBox.obj.showNoMatchMessage = false; ptTAObj_win0.BuildList(this.theTextBox.value); this.theTextBox.obj.showNoMatchMessage = bShowMatch; if (!this.bNoResults) {
 ptTAObj_win0.strLastValue=this.theTextBox.value; return; }
 }
 } 
 
 else if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel && isFModeLayout()) {
 this.fetchDataFromIndexDbForTypeAheadSP(); }
 


 

 var bSpValidation = false; if ((typeof sTmpBuildChoices != "undefined") && sTmpBuildChoices && (sTmpBuildChoices == "0"))
 bSpValidation = true; if (ptTAObj_win0.theTextBox.obj) 
 ptTAObj_win0.theTextBox.obj.showNoMatchMessage = isTypeAheadEvtTgt(ptTAObj_win0.theTextBox); if ((bSpValidation == false) && 
 (ptTAObj_win0.theTextBox.value.length==0 || typeof ptTAObj_win0.theTextBox.value == "undefined")) { 
 ptTAObj_win0.HideTheBox(); }
 else {
 this.ResetContainerEl(); ptTAObj_win0.bMadeRequest = true; ptTAObj_win0.bInProcess = true;  if (doTypeaheadFromValidateRelevantsFlag)
 ptTAObj_win0.TypeAhead(""); else
 ptTAObj_win0.TypeAhead(ptTAObj_win0.theTextBox.value); ptTAObj_win0.objLastActive = ptTAObj_win0.theTextBox; ptTAObj_win0.sQueryValue = ptTAObj_win0.theTextBox.value; ptTAObj_win0.bInProcess = false; }

 ptTAObj_win0.strLastValue=this.theTextBox.value;};function getCaretPos(focusEle)
{
 var caretPos = undefined; var range, textInputRange, len, endRange;  if (typeof focusEle.selectionStart == "number") {
 caretPos = focusEle.selectionStart; } else if (document.selection){
 range = document.selection.createRange(); if (range && range.parentElement() == focusEle) {
 len = focusEle.value.length;  textInputRange = focusEle.createTextRange(); textInputRange.moveToBookmark(range.getBookmark());    endRange = focusEle.createTextRange(); endRange.collapse(false); if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
 caretPos = len; } else {
 caretPos = -textInputRange.moveStart("character", -len); }
 }
 }
 

 return caretPos;};function setCaretPos(ele, caretPos){
 if (ele.focus)
 ele.focus(); else if (ele.setActive)
 ele.setActive();  if (caretPos == undefined) return; if (ele.setSelectionRange)
 ele.setSelectionRange(caretPos, caretPos); else if (ele.createTextRange) {
 var range = ele.createTextRange(); range.collapse(true); range.moveEnd('character', caretPos); range.moveStart('character', caretPos); range.select(); }


};function saveTALostFocus()
{
 if (ptTAObj_win0.theTextBox != null && ptTAObj_win0.theTextBox != undefined)
 ptTAObj_win0.caretPos = getCaretPos(ptTAObj_win0.theTextBox); var lost = ptTAObj_win0.bLostFocus; return function () {
 ptTAObj_win0.bLostFocus = lost; lost = null; };}


PT_typeahead.prototype.TypeAhead = function(xStrText) {
 if ((ptTAObj_win0.theTextBox) && (typeof(this.theTextBox) !== "undefined") && (this.theTextBox) && (this.theTextBox.form)) {
 
 if (!doTypeaheadFromValidateRelevantsFlag && this.theTextBox.form)
 this.theTextBox.form.PrmtTbl_fv.value = ptTAObj_win0.theTextBox.value; }

 if (ptTAObj_win0.bLostFocus) return;  ptTAObj_win0.SetOpValue(this.theTextBox); this.theTextBox.obj.hidden.value=this.theTextBox.id; ptTAObj_win0.bLostFocus = false;  addchg_win0(this.theTextBox);   if (!doTypeaheadFromValidateRelevantsFlag && this.theTextBox.form)
 this.theTextBox.form.PrmtTbl_fv.value = ptTAObj_win0.theTextBox.value;  eval(this.theTextBox.obj.serverCode); ptTAObj_win0.RestoreOpValue(this.theTextBox);};PT_typeahead.prototype.setPromptTable = function (sPrmtTblNm) {
 
 this.theTextBox.setAttribute('pt', sPrmtTblNm); };PT_typeahead.prototype.CorrectPromptHeadersOrder = function (arrHeaders) {
 var elem = this.theTextBox; if (elem) {
 for (var i = 0; i < arrHeaders.length; i++) {
 if (arrHeaders[i]) {
 elem.setAttribute('listhdr' + i, arrHeaders[i]); }
 }
 }
};PT_typeahead.prototype.buildArrMatchesOnFocusEvent = function (relevantsListArrWithMultipleColValues, elem) {

 var tmpArrRelevantsListArrWithMultipleColValues = []; tmpArrRelevantsListArrWithMultipleColValues = relevantsListArrWithMultipleColValues.map(item => item); var sPrmtTbl = elem.getAttribute('pt'); var sSesnStorageItmNm = getViewAllElemId(elem.id) + '_' + sPrmtTbl + '_Dflt'; var spDfltVal = sessionStorage.getItem(sSesnStorageItmNm); g_nMostRelKeyIndx = getTypeAheadKeyIndex(elem); var valueExistsInIndexDb = tmpArrRelevantsListArrWithMultipleColValues.some(item => item.Value.split('~')[g_nMostRelKeyIndx] === spDfltVal); if (!valueExistsInIndexDb) {
 if (tmpArrRelevantsListArrWithMultipleColValues.length > 0) {
 var sTmpValue = ""; for (var k = 0; k < 20; k++) {
 var sTmp = sessionStorage.getItem(sSesnStorageItmNm + '_c' + k); if (sTmp) {
 if (sTmpValue.length > 0)
 sTmpValue = sTmpValue + "~" + sTmp; else
 sTmpValue = sTmp; }
 }

 if ((typeof (sTmpValue) !== 'undefined') && (sTmpValue) && (sTmpValue !== ""))
 tmpArrRelevantsListArrWithMultipleColValues.unshift({count: 'NA', Value: sTmpValue, timestamp: 'NA'}); }
 }

 if ((typeof tmpArrRelevantsListArrWithMultipleColValues != 'undefined') && tmpArrRelevantsListArrWithMultipleColValues.length > 0) {
 ptTAObj_win0.arrMatches = []; this.currentValueSelected = -1; var nTaFldIndx = this.getTaFldIndex(this.GetArrHeaders()); for (var i = 0 ; i < tmpArrRelevantsListArrWithMultipleColValues.length; i++) {
 var arrAfterSplit = tmpArrRelevantsListArrWithMultipleColValues[i].Value.split('~'); this.arrOptions.some((element) => {
 if (element[nTaFldIndx] === arrAfterSplit[nTaFldIndx]) {
 ptTAObj_win0.arrMatches[ptTAObj_win0.arrMatches.length] = element; }
 })
 }
 }
};PT_typeahead.prototype.SetPrmtTbl = function (sPrmtTable) {
 this.theTextBox.setAttribute('pt', sPrmtTable); if ((typeof this.theTextBox.form !== "undefined") && (this.theTextBox.form)) {
 this.theTextBox.form.PrmtTbl.value = ""; this.theTextBox.form.SP_FldValues.value = ""; this.theTextBox.form.TA_BuildChoices.value = "1"; }
 setElementValueUtil('PrmtTbl', sPrmtTable); setElementValueUtil('SP_FldValues', ""); setElementValueUtil('TA_BuildChoices', '1'); var elem = this.theTextBox; var sVal = elem.value; if ((typeof sVal === 'undefined') || (!sVal) || (sVal == '')) {
 var sSesnStorageItmNm = getViewAllElemId(elem.id) + '_' + sPrmtTable + '_Dflt'; var spDfltVal = sessionStorage.getItem(sSesnStorageItmNm); createRelevantsMenuForLookupFieldWithoutTA(this.theTextBox, spDfltVal); } 
};PT_typeahead.prototype.SetValidValues = function (arrOptions, arrHeaders) {
 var sVal = this.theTextBox.value;  if(bSpDefaultVal)
 this.validValuesForFieldWithDefaultValue = arrOptions; if ((typeof this.theTextBox.form !== "undefined") && (this.theTextBox.form)) {
 this.theTextBox.form.TA_BuildChoices.value = "1"; this.theTextBox.form.SP_FldName.value = ""; this.theTextBox.form.SP_FldValues.value = ""; this.theTextBox.form.TA_SkipFldNms.value = ""; }

 setElementValueUtil('TA_BuildChoices', "1"); setElementValueUtil('SP_FldName', ""); setElementValueUtil('SP_FldValues', ""); setElementValueUtil('TA_SkipFldNms', ""); setChangeId(g_oChangeId); g_oChangeId = ""; if ((typeof arrOptions === "undefined") || (typeof arrHeaders === "undefined")) return; if (!arrOptions || !arrHeaders) return; if ((this.theTextBox.obj) && (typeof this.theTextBox.obj.hidden !== 'undefined') && (this.theTextBox.obj.hidden))
 this.theTextBox.obj.hidden.value = ""; this.CorrectPromptHeadersOrder(arrHeaders); var sVal = this.theTextBox.value;  if ((typeof sVal !== 'undefined') && (sVal) && (sVal !== "")) {
 this.theTextBox.setAttribute("value", sVal); this.theTextBox.setAttribute('listval' + g_nMostRelKeyIndx, sVal); return; }

 
 if ((typeof sVal !== 'undefined') && (sVal) && (sVal !== "")) {
 var el = this.theTextBox; var nColCnt = arrHeaders.length; if ((arrOptions.length > 0) && (arrOptions[0].length != nColCnt)) return; if (arrOptions.length == 1) {
 if (g_bDoSpDataChange == true) {
 for (var m = 0; m < nColCnt; m++) {
 var sHdr = "listhdr" + m; var sHdrNm = el.getAttribute(sHdr); if (arrHeaders[m] === sHdrNm) {
 var sColVal = restoreComma(arrOptions[0][m]); el.setAttribute("listval" + m, sColVal); } else {
 console.log('DoSpDataChange arrHeaders[m]=' + arrHeaders[m] + ', sHdrNm=' + sHdrNm); }
 }
 g_bDoSpDataChange = false; el.focus(); onSmartPromptDataChange(window.event, el, sVal, "onfocus") ; return; }
 }
 }

 arrSpValidHeaders = arrHeaders; arrSpValidOptions = arrOptions; var el = this.theTextBox; var nColCount = arrHeaders.length; var sPrmtTbl = el.getAttribute('pt'); var sSesnStorageItmNm = getViewAllElemId(el.id) + '_' + sPrmtTbl + '_Dflt'; var spDfltVal = sessionStorage.getItem(sSesnStorageItmNm);  var spDfltColVal; for (var m = 0; m < this.relevantsListArrKeys.length; m++) {
 if (doTypeaheadFromValidateRelevantsFlag)
 this.relevantsListArrKeys[m].Value = this.relevantsListArrKeys[m].Value; else
 this.relevantsListArrKeys[m].Value = UnEscapeHTMLSymbol(this.relevantsListArrKeys[m].Value); }
 for (var m = 0; m < this.relevantsListArrSequencedKeysAndValues.length; m++) {
 this.relevantsListArrSequencedKeysAndValues[m].Value = UnEscapeHTMLSymbol(this.relevantsListArrSequencedKeysAndValues[m].Value); }
 for (var m = 0; m < arrRelevants.length; m++) {
 arrRelevants[m] = UnEscapeHTMLSymbol(arrRelevants[m]); if (arrRelevants[m].indexOf('"') == 0)
 arrRelevants[m] = arrRelevants[m].substring(1, (arrRelevants[m].length - 1)); }

 var nRelevantsCount = arrRelevants.length; var nValidOptnsCount = arrSpValidOptions.length; var nDelCnt = 0; if (bDebugMode == true) {
 console.log('arrSpValidOptions: ' + arrSpValidOptions.toString()); console.log('arrSpValidHeaders: ' + arrSpValidHeaders.toString()); }

 var bValid = true; var keyIndex = this.getTaFldIndex(arrSpValidHeaders); g_nMostRelKeyIndx = keyIndex; var arrTmp = structuredClone(arrRelevants); if ((typeof spDfltVal !== 'undefined') && (spDfltVal) && (spDfltVal !== "") && (typeof arrTmp !== 'undefined') && (arrTmp) && (arrTmp.includes(spDfltVal) == false))
 arrTmp.push(spDfltVal); for (var m = 0; m < arrTmp.length; m++) {
 bValid = false; for (var n = 0; n < nValidOptnsCount; n++) {
 var optnColValues = arrSpValidOptions[n]; if (optnColValues[keyIndex].search('::::') >= 0) {
 optnColValues[keyIndex] = restoreComma(optnColValues[keyIndex]);  }

 var tempOptnColVal = optnColValues[keyIndex]; var tempoptnColValues = UnEscapeHTMLSymbol(tempOptnColVal); if ((typeof spDfltColVal === 'undefined') || (!spDfltColVal) || (spDfltColVal === '')) {
 if ((spDfltVal === tempoptnColValues) || (spDfltVal === optnColValues[keyIndex])) {
 sessionStorage.setItem(sSesnStorageItmNm, tempoptnColValues); for (var p = 0; p < optnColValues.length; p++) {
 spDfltColVal = UnEscapeHTMLSymbol(optnColValues[p]); if (spDfltColVal.search('::::') >= 0) {
 spDfltColVal = restoreComma(spDfltColVal); }
 sessionStorage.setItem(sSesnStorageItmNm + "_c" + p, spDfltColVal); sessionStorage.setItem(sSesnStorageItmNm + "_h" + p, arrSpValidHeaders[p]); }
 }
 } 

 if (arrTmp[m] === tempoptnColValues) {
 bValid = true; break; }
 }

 if (bValid == false) {
 if ((g_bDoSpDataChange == false) && (arrTmp[m] === spDfltVal)) {
 console.log('default value is now invalid - ' + spDfltVal + "=" + sSesnStorageItmNm + "=" + spDfltVal); } 

 var nTmpIndex = arrRelevants.indexOf(arrTmp[m]); if (nTmpIndex >= 0) {
 arrInvalidRelevants.push(arrTmp[m]); this.relevantsListArrKeys.splice(nTmpIndex - nDelCnt, 1); this.relevantsListArrSequencedKeysAndValues.splice(nTmpIndex - nDelCnt, 1); nDelCnt = nDelCnt + 1; }
 } 
 }

 var arrUpdateValues = []; for (var m = 0; m < this.relevantsListArrSequencedKeysAndValues.length; m++) {
 var sRelevantKey = ""; if (this.relevantsListArrKeys.length > m)
 sRelevantKey = this.relevantsListArrKeys[m].Value; for (var n = 0; n < arrSpValidOptions.length; n++) {
 var sValidColValues = ""; if (arrSpValidOptions[n][keyIndex] == sRelevantKey) {
 var optnColValues = arrSpValidOptions[n]; for (var p = 0; p < optnColValues.length; p++) {
 arrSpValidOptions[n][p] = restoreComma(arrSpValidOptions[n][p]); var sValidColVal = arrSpValidOptions[n][p]; sValidColValues += sValidColVal + "~"; }
 if (sValidColValues != "") {
 var sRelevantCols = this.relevantsListArrSequencedKeysAndValues[m].Value; if (sRelevantCols != sValidColValues) {
 
 this.relevantsListArrSequencedKeysAndValues[m].Value = sValidColValues;   arrUpdateValues.push(sRelevantKey); }
 }
 break; }
 }
 }

 
 if ((arrUpdateValues.length > 0) || (arrInvalidRelevants.length > 0)) {
 var el = this.theTextBox; var elKeys = getSmartPromptKeys(el.id); var transGet = getSmartPromptTransactionObject("readonly"); if (!objectStoreSmartPrompt) return; var byKeysIndex = objectStoreSmartPrompt.index("bySpKeys"); if (!byKeysIndex) return; var getRequest0 = byKeysIndex.get(elKeys); getRequest0.onsuccess = function (event) {
 var dataRecord = event.target.result; if ((typeof dataRecord === 'undefined') || (!dataRecord)) return; var bPut = false; if (dataRecord.datavalues.length > g_nDataValuesIndx) {
 for (var r = 0; r < arrUpdateValues.length; r++) {
 for (var p = 0; p < dataRecord.datavalues[g_nDataValuesIndx].values.length; p++) {
 if (dataRecord.datavalues[g_nDataValuesIndx].values[p].fieldvalue == arrUpdateValues[r]) {
 for (var n = 0; n < arrSpValidOptions.length; n++) {
 if (arrSpValidOptions[n][keyIndex] == arrUpdateValues[r]) {
 for (var q = 0; q < arrSpValidOptions[n].length; q++) {
 
 dataRecord.datavalues[g_nDataValuesIndx].values[p].columns[q] = arrSpValidOptions[n][q]; }
 bPut = true; break; }
 }
 break; }
 }
 }

 if (arrInvalidRelevants.length > 0) {
 bPut = true; if (g_nDataValuesIndx < 0) {
 for (var p = 0; p < dataRecord.datavalues.length; p++) {
 for (var q = 0; q < dataRecord.datavalues[p].values.length; q++) {
 if (dataRecord.datavalues[p].values[q].fieldvalue === arrInvalidRelevants[0]) {
 g_nDataValuesIndx = p; }
 }
 }
 }

 if (g_nDataValuesIndx < 0) 
 g_nDataValuesIndx = 0; for (var r = 0; r < arrInvalidRelevants.length; r++) {
 for (var p = 0; p < dataRecord.datavalues[g_nDataValuesIndx].values.length; p++) {
 if (dataRecord.datavalues[g_nDataValuesIndx].values[p].fieldvalue == arrInvalidRelevants[r]) {
 
 var bEffdt = false; for (var t = 0; t < dataRecord.datavalues[g_nDataValuesIndx].dependson.length; t++) {
 if (dataRecord.datavalues[g_nDataValuesIndx].dependson[t].keyname === 'EFFDT') {
 bEffdt = true; break; }
 }
 if (bEffdt == false)
 dataRecord.datavalues[g_nDataValuesIndx].values.splice(p, 1); break; }
 }
 if (dataRecord.datavalues[g_nDataValuesIndx].values.length == 0) 
 dataRecord.datavalues.splice(g_nDataValuesIndx, 1); }

 if (dataRecord.datavalues.length == 0) {
 bPut = false; var transdel = getSmartPromptTransactionObject("readwrite"); if (!objectStoreSmartPrompt) return; var delRequest = objectStoreSmartPrompt.delete(elKeys); delRequest.onsuccess = function (eventDel) {
 try {
 transdel.commit(); } catch(err) { console.log('error deleteSmartPromptFromIndexedDb'); }
 }; delRequest.onerror = function (event) {
 console.log("delete indexeddb failed for smart prompt"); try {
 transdel.commit(); } catch(err) { }
 }; }
 }
 }

 if (bPut == true) {
 var transPut = getSmartPromptTransactionObject("readwrite"); if (!objectStoreSmartPrompt) return; var putRequest = objectStoreSmartPrompt.put(dataRecord); putRequest.onsuccess = function (eventPutNew) {
 try {
 transPut.commit(); } catch(err) { }
 }; }
 }; }
 

 if ((typeof(this.theTextBox) !== "undefined") && this.theTextBox) {
 
 if (bSpMfuFirst)
 this.relevantsListArrSequencedKeysAndValues.sort((a, b) => b.count - a.count); else
 this.relevantsListArrSequencedKeysAndValues.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)); if ((bDebugMode == true) && (arrInvalidRelevants.length > 0))
 console.log('not valid - ' + arrInvalidRelevants.toString());  this.validValuesListUsedForMoreRows = this.relevantsListArrKeys;  if (!doTypeaheadFromValidateRelevantsFlag) {
 
 if (isFModeLayout())
 renderRelevantsMenuForLookupFieldWithoutTAInFluid(this.relevantsListArrKeys, this.relevantsListArrSequencedKeysAndValues, this.theTextBox); else
 renderRelevantsMenuForLookupFieldWithoutTAInClassic(this.relevantsListArrKeys, this.relevantsListArrSequencedKeysAndValues, this.theTextBox); this.buildArrMatchesOnFocusEvent(this.relevantsListArrSequencedKeysAndValues, this.theTextBox); this.currentTotalRow = arrOptions.length; }
 }
};PT_typeahead.prototype.buildChoices = function (arrOptions, arrHeaders) {
 this.oWin.gFocusId = this.theTextBox.id; if (typeof this.oWin.modWin != 'undefined' && this.oWin.modWin != null) {
 return; }
 
 if (ptTAObj_win0.bLostFocus && !isFModeLayout()) {
 return;  }

 this.bStartNewList = 1; if (this.RestoreTextBox())
 { 
 var bSetOpn = false; var sValidColVal = ""; for (var n = 0; n < arrOptions.length; n++) {
 var optnColValues = arrOptions[n]; for (var p = 0; p < optnColValues.length; p++) {
 arrOptions[n][p] = restoreComma(arrOptions[n][p]); var sValidColVal = arrOptions[n][p]; }
 }

 var elem = this.theTextBox; if (elem) {
 for (var i = 0; i < arrHeaders.length; i++) {
 if (arrHeaders[i]) {
 elem.setAttribute('listhdr' + i, arrHeaders[i]); }
 }
 }

 this.theTextBox.obj.arrHeaders = arrHeaders; this.theTextBox.obj.arrOptions = arrOptions; this.GetContainerEl().arrOptions = arrOptions; this.theTextBox.obj.bNew = true; if (isFModeLayout()) {
 this.Close();  }
 this.BuildList(ptTAObj_win0.strLastValue ); ptTAObj_win0.bMadeRequest = false; this.startPos = 0; }
};PT_typeahead.prototype.RestoreTextBox = function() {
 if (!this.theTextBox || !this.theTextBox.obj) return; var tempColNum = this.theTextBox.obj.colnum; var tempMaxRows = this.theTextBox.obj.nMaxRows;  var elementValueToRetainSpaceIfExists = this.theTextBox.value; this.theTextBox = document.getElementById(this.theTextBox.id); this.theTextBox.value = elementValueToRetainSpaceIfExists; if (this.theTextBox == null || typeof this.theTextBox.id == "undefined") 
 return false;  else {
 setCaretPos(this.theTextBox, ptTAObj_win0.caretPos);  if (!this.theTextBox.obj)
 initTypeAheadEl(this.theTextBox); this.theTextBox.obj.colnum = tempColNum; this.theTextBox.obj.nMaxRows = tempMaxRows;  var thisObj = this.theTextBox.attributes.getNamedItem('onchange'); if (thisObj != null && thisObj.nodeValue != null) {
 this.theTextBox.onchange(); }
 return true; }
};PT_typeahead.prototype.EscapeHTMLSymbol = function(theText) {
 if ((typeof theText === 'undefined') || (!theText)) return theText;  theText = this.replaceAmp(theText); theText = theText.replace(/'/gi, '&#039;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;').replace(/%/gi,'&#037;').replace(/ /gi, '&nbsp;'); theText = theText.replace(/"/gi,"&quot;") 
 return theText;};PT_typeahead.prototype.replaceAmp = function(theText) {
 if ((typeof theText === 'undefined') || (!theText)) return theText; var entityRegexp = /&#x[0-9a-fA-F]{1,8};/g;  var position = theText.search(entityRegexp); if ( position != -1 ) {
 var results = theText.match(entityRegexp); theText = this.replaceAmp( theText.substring(0,position) ) + results[0] + 
 this.replaceAmp( theText.substring( position + results[0].length ) ); } else {
 theText = theText.replace(/&/gi,'&amp;'); }
 return theText;};PT_typeahead.prototype.TAFieldHasFocus = function() {
 var bTAFieldHasFocus = false;  if (typeof PFieldList_win0!='undefined' && PFieldList_win0) {
 for (var i = 0; i < PFieldList_win0.length; i++) {
 var fname = PFieldList_win0[i][0];  var nStop = PFieldList_win0[i][1]; for (var j=0; j<nStop; j++) { 
 var name = fname;  var nsuffix = ""; if (nStop>1) { 
 nsuffix = '$'+j;  name = fname+nsuffix; } else if (ptTAObj_win0.oDoc.getElementById(fname+'$'+j)) {
 nsuffix = '$'+j;  name = fname+nsuffix; }
 var el = ptTAObj_win0.oDoc.getElementById(name); if (el && el.getAttribute("focus") == "true") {
 bTAFieldHasFocus = true; return bTAFieldHasFocus; }
 } 
 } 
 }

 if (bTAFieldHasFocus)
 return bTAFieldHasFocus; if (typeof EFieldList_win0!='undefined' && EFieldList_win0) {
 for (var i = 0; i < EFieldList_win0.length; i++) {
 var fname = EFieldList_win0[i][0];  var nStop = EFieldList_win0[i][1]; for (var j=0; j<nStop; j++) { 
 var name = fname;  var nsuffix = ""; if (nStop>1) { 
 nsuffix = '$'+j;  name = fname+nsuffix; } else if (ptTAObj_win0.oDoc.getElementById(fname+'$'+j)) {
 nsuffix = '$'+j;  name = fname+nsuffix; }
 var el = ptTAObj_win0.oDoc.getElementById(name); if (el && el.getAttribute("focus") == "true") {
 bTAFieldHasFocus = true; return bTAFieldHasFocus; }
 } 
 } 
 }
 return bTAFieldHasFocus;};PT_typeahead.prototype.SetProcessedTypeAheadValue = function(theText) {
 this.typeAheadProcessedValue = theText;  this.bStaledResult = false;  this.currentTypeAheadField = document.getElementById(this.theTextBox.id);   if ( this.typeAheadProcessedValue == '' || 
 this.typeAheadProcessedValue != this.EscapeHTMLSymbol(this.currentTypeAheadField.value) ) {
 this.bStaledResult = true; }
};PT_typeahead.prototype.SetMaxRange = function(theTextBoxInt,nMatchLength) {
 if (isFModeLayout()) {
 this.maxRange = this.GetArrOptions().length; return; }
 var selectedPosX=0; var selectedPosY=0; var theElement=theTextBoxInt; if (!theElement) 
 return; var theElemHeight=theElement.offsetHeight; var divgbr = null; var divgbrId = null; var divgblr = null;  var divgblrId = null; this.maxRange=3; var XYposition = ptCommonObj2.getPosition2(theElement, "win0"); selectedPosY= XYposition.y; selectedPosX= XYposition.x;   var viewportHeight = ptCommonObj2.getViewportHeight(); var nBelHeightLeft = viewportHeight + document.body.scrollTop - (selectedPosY+theElemHeight);  var nAbvHeightLeft = viewportHeight - (nBelHeightLeft+theElemHeight);  var nMinHeight = theElemHeight*3;  var nBelMaxRange = Math.floor((nBelHeightLeft - nMinHeight)/theElemHeight); var nAbvMaxRange = Math.floor((nAbvHeightLeft - nMinHeight)/theElemHeight);  var minRange = 5; nBelMaxRange = nBelMaxRange < minRange ? minRange:nBelMaxRange; nAbvMaxRange = nAbvMaxRange < minRange ? minRange:nAbvMaxRange; if (nBelMaxRange >= nMatchLength || nBelMaxRange >= this.maxRange) {
 if (nBelMaxRange >= nMatchLength)
 this.maxRange = nMatchLength; else
 this.maxRange = nBelMaxRange; this.ndisplay = 1;  return {x:selectedPosX, y:(selectedPosY+theElemHeight)}; }
 else if (nAbvMaxRange>= nMatchLength || nAbvMaxRange >= this.maxRange) {
 if (nAbvMaxRange >= nMatchLength) 
 this.maxRange = nMatchLength; else
 this.maxRange = nAbvMaxRange; this.ndisplay = 0;  return {x:selectedPosX, y:selectedPosY}; }
 else if (nBelMaxRange > nAbvMaxRange && nBelMaxRange > 0) {
 this.maxRange = nBelMaxRange; this.ndisplay = 1;  return {x:selectedPosX, y:(selectedPosY+theElemHeight)}; }
 else if (nAbvMaxRange > 0) {
 this.maxRange = nAbvMaxRange; this.ndisplay = 0;  return {x:selectedPosX, y:selectedPosY}; }
 else {
 this.maxRange = 1; this.ndisplay = 1;  return {x:selectedPosX, y:(selectedPosY+theElemHeight)}; }
};PT_typeahead.prototype.BuildList = function(theText) {
 if (isFModeLayout())
 return this.BuildListF(theText);  if (this.bTabPressed) {
 this.bTabPressed = false; return; }
 
 
 if (this.bStaledResult) {
 return;  } 
 
 var theElemWidth=this.theTextBox.offsetWidth; var theMatches = null; var matchGrid = null; var xPosElement = this.GetContainerEl(); this.SetMatchesArr(theText); var mLengthA= ptTAObj_win0.arrMatches.length; var boxPos = this.SetMaxRange(this.theTextBox,mLengthA);  theMatches = this.MakeMatchesArr(theText.replace(/^\s+/,"")); if (theMatches.length>0) 
 matchGrid=this.CreateGrid(theMatches,mLengthA); var bHideTheBox = false; if (matchGrid) {
 xPosElement.innerHTML=matchGrid; if (ptTAObj_win0.oDoc.getElementById("OptionsList_0"))
 ptTAObj_win0.oDoc.getElementById("OptionsList_0").className="spanNormalElement"; this.currentValueSelected=-1; this.bNoResults=false; if (this.ndisplay == 0) { 
 
 
 if (this.bStartNewList) {
 this.bStartNewList = 0;  var nListH = this.maxRange * this.theTextBox.offsetHeight + this.theTextBox.offsetHeight; if (this.bScrolldownImage) 
 nListH = nListH + 3; boxPos.y = boxPos.y - nListH; }
 else
 boxPos.y = boxPos.y - xPosElement.scrollHeight; }
 }
 else {
 
 
 if (this.GetArrOptions() && this.GetArrOptions().length>0 && (this.theTextBox.value.replace(/^\s+/,"")).length < this.theTextBox.value){
 this.HideTheBox(); this.StartDelayTimeout(); }else{
 this.bStartNewList = 0; this.currentValueSelected=-2; this.bNoResults=true; if (this.theTextBox.obj.showNoMatchMessage) {
 this.GetContainerEl().innerHTML="<span class='noMatchData' style='white-space:nowrap;background-color: rgb(226,226,226);'>"+this.noMatchingDataMessage+"</span>";  } else {
 bHideTheBox = true; this.HideTheBox(); }
 }
 }

 
 this.SetElementPosition(this.theTextBox, boxPos.x, boxPos.y); };PT_typeahead.prototype.BuildListF = function(theText){

 
 if (this.bTabPressed) {
 this.bTabPressed = false; return; }
 
 
 if (this.bStaledResult) {
 return;  } 
 
 var theElemWidth=this.theTextBox.offsetWidth; var theMatches = null; var matchGrid = null; var xPosElement = this.GetContainerEl(); this.SetMatchesArr(theText); var mLengthA= ptTAObj_win0.arrMatches.length; var boxPos = this.SetMaxRange(this.theTextBox,mLengthA);  theMatches = this.MakeMatchesArr(theText.replace(/^\s+/,""));  if (theMatches.length > 0) 
 matchGrid = this.CreateGridF(theMatches,mLengthA); if (matchGrid) {
 xPosElement.innerHTML = matchGrid; this.currentValueSelected = -1; this.bNoResults = false; if (this.ndisplay == 0) { 
 
 
 if (this.bStartNewList) {
 this.bStartNewList = 0;  var nListH = this.maxRange * this.theTextBox.offsetHeight + this.theTextBox.offsetHeight; if (this.bScrolldownImage) 
 nListH = nListH + 3; boxPos.y = boxPos.y - nListH; }
 else
 boxPos.y = boxPos.y - xPosElement.scrollHeight; }
 }
 else {
 this.bStartNewList = 0; this.currentValueSelected = -2; this.bNoResults = true; if (this.theTextBox.obj.showNoMatchMessage) {
 this.GetContainerEl().innerHTML="<span class='noMatchData' style='white-space:nowrap;background-color: rgb(226,226,226);'>"+this.noMatchingDataMessage+"</span>";  } else {
 this.HideTheBox(); }
 }

 var mObj = document.getElementById(this.theTextBox.id + '$typeahead'); if (!mObj) {
 mObj = document.createElement('div'); mObj.innerHTML = xPosElement.innerHTML; }
 if (!mObj.id || isHidden(mObj) || (mObj.id && mObj.id.indexOf('$typeahead') == -1)) {
 var sOptions = ""; mObj.setAttribute('id', this.theTextBox.id + '$typeahead'); mObj.setAttribute('sQueryValue', ptTAObj_win0.sQueryValue); var sOptions = "bPIA@1;bCache@1;sCacheParentId@pt_typeahead0;nAlign@1;bAnm@0;bPopup@1;bVertical@1;bTail@0;bResize@0;bHeader@0;bMask@0;bAutoClose@0;sStyle@ps_typeahead_modal;"; if (sOptions.indexOf("sPopupParent") == -1)
 sOptions += "sPopupParentId@" + this.theTextBox.id + ";"; mObj.setAttribute('options', sOptions); if (isHidden(mObj))
 removeHide(mObj); bLocalModal = true; addDivPopup(mObj, window, sOptions); playDivPopup(); }
 
 if (matchGrid) this.Resize();};PT_typeahead.prototype.SetColNum = function(colnum,nMaxRows){
 if ((typeof(this.theTextBox) !== 'undefinned') && (this.theTextBox) && (typeof(this.theTextBox.obj) !== "undefined") && (this.theTextBox.obj)) {
 this.theTextBox.obj.colnum=colnum; this.theTextBox.obj.nMaxRows=nMaxRows; }
}; PT_typeahead.prototype.SetElementPosition = function(theTextBoxInt, selectedPosX, selectedPosY ){
 var theElement = theTextBoxInt; if (!theElement) 
 return; var theElemHeight=theElement.offsetHeight; var theElemWidth=theElement.offsetWidth; var el = ptTAObj_win0.oDoc.getElementById("pt_typeahead0"); if (el && typeof el != 'undefined')
 el.style.display='block';  var xPosElement = this.GetContainerEl(); if ('ltr' == 'ltr') 
 xPosElement.style.left = selectedPosX + "px";  else {
 var viewportWidth = ptCommonObj2.getViewportWidth();   xPosElement.style.left = "-9999px"; xPosElement.style.right = "9099px"; xPosElement.style.display='block';  var adjustWidth = 0; var ttableEle = ptTAObj_win0.oDoc.getElementById("ttable"); if (ttableEle != null)
 adjustWidth = ttableEle.offsetWidth; xPosElement.style.display='none'; if (browserInfoObj2.isiPad && browserInfoObj2.isSafari)
 adjustWidth += 15 + 3; xPosElement.style.left = selectedPosX + theElemWidth - adjustWidth + "px";  xPosElement.style.right = viewportWidth - selectedPosX - theElemWidth + "px";  }

 if (theTextBoxInt.obj.matchTextBoxWidth)
 xPosElement.style.width=theElemWidth; xPosElement.style.top=selectedPosY + "px"; xPosElement.style.display='block'; if (theTextBoxInt.obj.useTimeout) {
 xPosElement.onmouseout = ptTAObj_win0.StartTimeout; xPosElement.onmouseover = ptTAObj_win0.EraseTimeout; }
 else {
 xPosElement.onmouseout = null; xPosElement.onmouseover = null; } 
 
 
};PT_typeahead.prototype.SetOpValue = function(theTextBox) {
 var name = theTextBox.id; if (name.indexOf('$to')>0)
 name = name.split('$')[0]; var elOP=this.oWin.document.getElementById(name + "$op"); if (elOP == null || elOP.value == "1") return; ptTAObj_win0.opValue = elOP.value; elOP.value = 1; return;};PT_typeahead.prototype.RestoreOpValue = function(theTextBox) {
 var name = theTextBox.id; if (name.indexOf('$to') > 0)
 name = name.split('$')[0]; var elOP = this.oWin.document.getElementById(name+"$op"); if (elOP == null) return; if (ptTAObj_win0.opValue != -1) {
 elOP.value = ptTAObj_win0.opValue; ptTAObj_win0.opValue = -1; }
 return;};PT_typeahead.prototype.CancelTypeAhead = function(theTextBox) {
if (!ptCommonObj2.isSearchPage(this.oForm)) return false; var name=theTextBox.id; if (name.indexOf('$to')>0)
 name = name.split('$')[0]; var elOP = this.oWin.document.getElementById(name + "$op"); if (elOP == null || elOP.value == "1" || elOP.value == "2" || elOP.value == "8") 
 return false;  else 
 return true;};PT_typeahead.prototype.GetRegExPattern = function(theTextBox,compareStr) {
  
 return theTextBox.obj.regExAny+compareStr; };PT_typeahead.prototype.SetMatchesArr = function(xCompareStr){
 this.countForId=0; this.currentTotalRow=0;  ptTAObj_win0.arrMatches=new Array();  if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel) {
 this.reorderTypeAheadListBasedOnIndexDbData(xCompareStr); }
 
 else {
 this.DecodeArrOptions(); for (var i = 0; i < this.GetArrOptions().length; i++) {
 var str = this.GetArrOptions()[i][this.theTextBox.obj.colnum]; var theMatch = this.getPrefixLength(str, xCompareStr) > 0; if (theMatch) {
 ptTAObj_win0.arrMatches[ptTAObj_win0.arrMatches.length] = this.GetArrOptions()[i]; }
 }
 }
 
 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel) {
 var sTmpVal = "" + this.theTextBox.value; if (g_nMostRelKeyIndx < 0)
 g_nMostRelKeyIndx = getTypeAheadKeyIndex(this.theTextBox); var nOptnsCnt = this.GetArrOptions().length; var bFound = false; var nSelectedOptnIndx = 0; var sOptn = ""; for (var k = 0; k < nOptnsCnt; k++) {
 sOptn = "" + this.GetArrOptions()[k][g_nMostRelKeyIndx]; if (sOptn.toUpperCase() === sTmpVal.toUpperCase()) {
 bFound = true; nSelectedOptnIndx = k; }
 }

 if (bFound == true) {
 var arrHeaders = this.GetArrHeaders(); for (var k = 0; k < arrHeaders.length; k++) {
 this.theTextBox.setAttribute('listhdr' + k.toString(), arrHeaders[k]); }

 if (g_nMostRelKeyIndx >= 0) {
 for (var j = 0; j < this.GetArrOptions()[nSelectedOptnIndx].length; j++) {
 this.theTextBox.setAttribute('listval' + j.toString(), this.GetArrOptions()[nSelectedOptnIndx][j]); }
 var caretPositionBeforeForSpUpdate = this.theTextBox.selectionStart; this.theTextBox.value = this.GetArrOptions()[nSelectedOptnIndx][g_nMostRelKeyIndx]; this.theTextBox.setSelectionRange(caretPositionBeforeForSpUpdate, caretPositionBeforeForSpUpdate); this.theTextBox.setAttribute("sp_done", '0'); var sClNam = "PSERROR"; if (isClass(this.theTextBox, sClNam)) {
 
 this.theTextBox.className = this.theTextBox.className.replace(new RegExp("\\b"+ sClNam+"\\b\\s*", "g"), ""); }
 
 }
 }
 }
 
};PT_typeahead.prototype.getIndex = function(str, prefix) 
{
 if ((str == null) || (prefix == null))
 return -1; var length1 = str.length; var length2 = prefix.length; if (length2 == 0)
 return 0; else if (length1 < length2 )
 return -1; else{
 for (var i = 0; i < length1-length2+1; i++)
 for (var j = 0;j<length2; j++){
 if (prefix[j]=='_' || str[i+j] == prefix[j]){
 if (j == length2-1){
 return i; }
 continue; } else{
 break; }
 }
 return -1; }
};PT_typeahead.prototype.MakeMatchesArr = function(xCompareStr) {
 this.countForId = 0; this.currentTotalRow = 0; var matchArray = new Array(); for (var i = this.startPos; (i < ptTAObj_win0.arrMatches.length && (i - this.startPos) < this.maxRange); i++){
 var matchRowArr=new Array(); for (var j = 0; j < this.GetArrOptions()[i].length; j++) {
 if (j == this.theTextBox.obj.colnum) {
 matchRowArr[matchRowArr.length]=this.CreateBold(ptTAObj_win0.arrMatches[i][j],xCompareStr, i); }
 else 
 matchRowArr[matchRowArr.length]=this.CreateBoldOtherCol(ptTAObj_win0.arrMatches[i][j], i); }
 matchArray[matchArray.length]=matchRowArr; }
 return matchArray;};PT_typeahead.prototype.CheckDup = function(tmpArray,value) {
 
 return false;};PT_typeahead.prototype.ScrollUp = function() {
 this.startPos = this.startPos - this.maxRange+1; if (this.startPos < 0 )
 this.startPos = 0; this.BuildList(ptTAObj_win0.strLastValue); var xPosElement = this.GetContainerEl(); xPosElement.onmouseover(); this.MoveHighlight(1);};PT_typeahead.prototype.ScrollDown = function(){
 this.startPos = this.startPos + this.maxRange-1; if (this.startPos < ptTAObj_win0.arrMatches.length)
 this.BuildList(ptTAObj_win0.strLastValue); var xPosElement = this.GetContainerEl(); xPosElement.onmouseover(); this.MoveHighlight(1);};PT_typeahead.prototype.CreateGrid = function(matchArray,mLengthA) {

 
 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel) {
 var matchGrid = this.generateTypeAheadHTMLForClassicSP(matchArray,mLengthA); return matchGrid; }
 
 else {
 var matchGrid = this.tableStart; this.bScrolldownImage = 0;  if (this.arrHeaders.length > 0) {
 matchGrid += this.trStart; for (var i = 0; i < this.arrHeaders.length; i++) 
 matchGrid += this.thStart+this.arrHeaders[i]+this.thEnd; matchGrid += this.trEnd; }
 var odd = true; var mLength = matchArray.length; var nCol = matchArray[0].length;  if (isTouchDevice()) {
 var sCloseTAResult = "<img align='right' src='"+this.url_close+"'/ onclick='ptTAObj_win0.HideTheBox()'>"; matchGrid=matchGrid+this.trStart; matchGrid=matchGrid+sCloseTAResult;  matchGrid=matchGrid+this.trEnd; }
 
 if (isTouchDevice() ){
 var sScrollUp = "<img align='absmiddle' src='"+this.url_up+"'/ onclick='ptTAObj_win0.ScrollUp()'>"; } else {
 var sScrollUp = "<img align='absmiddle' src='"+this.url_up+"'/ onmouseover='ptTAObj_win0.ScrollUp()'>"; } 
 sScrollUp = this.tdScrollStart + nCol + "'>" + sScrollUp + this.tdEnd
 if (this.startPos > 0 && (mLength >= this.maxRange || this.startPos + mLength == mLengthA)){
 matchGrid = matchGrid + this.trStart; matchGrid = matchGrid + sScrollUp;  matchGrid = matchGrid + this.trEnd; }
 odd = false; for (var i = 0; i < matchArray.length; i++) {
 matchGrid += this.trStart; for (var j = 0; j < matchArray[i].length; j++) {
 if (odd) 
 matchGrid += this.tdODDStart + matchArray[i][j] + this.tdEnd; else 
 matchGrid += this.tdEVENStart + matchArray[i][j] + this.tdEnd; }
 if (odd) 
 odd=false;  else 
 odd=true; matchGrid += this.trEnd; }

 if (((this.startPos + this.maxRange) < ptTAObj_win0.arrMatches.length) && mLength >= this.maxRange) {
 if (isTouchDevice()) {
 var sScrollDown = "<img align='absmiddle' src='"+this.url_dn+"'/ onclick='ptTAObj_win0.ScrollDown()'>"; } else {
 var sScrollDown = "<img align='absmiddle' src='"+this.url_dn+"'/ onmouseover='ptTAObj_win0.ScrollDown()'>"; }
 this.bScrolldownImage = 1;  sScrollDown = this.tdScrollStart + nCol + "'>" + sScrollDown + this.tdEnd; matchGrid = matchGrid+this.trStart;  matchGrid = matchGrid+sScrollDown;  matchGrid = matchGrid+this.trEnd; }
 matchGrid += this.tableEnd; return matchGrid; }
};PT_typeahead.prototype.CreateGridF = function (matchArray, mLengthA) {
 
 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel) {
 var matchGrid = this.generateTypeAheadHTMLForFluidSP(matchArray,mLengthA); return matchGrid; }
 
 else {
 var matchGrid = "<div class='ps_box-gridc' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "gridc'>"; matchGrid += "<div class='ps_box-grid ps_box-grid-head' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "colhdr'>"; matchGrid += "<table class='ps_grid-flex ps_grid-flex-head'>"; var arrHeaders = this.GetArrHeaders(); if (arrHeaders.length > 0) {
 matchGrid += "<thead class='ps_grid-head'>"; matchGrid += this.trHStart; for (var i = 0; i < arrHeaders.length; i++)
 matchGrid += this.thStart + arrHeaders[i] + this.thEnd; matchGrid += this.trEnd; matchGrid += "</thead>"; }
 matchGrid += this.tableEnd; matchGrid += "</div>"; matchGrid += "<div class='ps_box-grid ps_box-grid-typeahead ps_scrollable sbar sbar_v ps_scrollable_v' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "grid' onscroll='ptTAObj_win0.EraseTimeout();' onmouseup=\"setFocus_win0('"+this.theTextBox.id+"');\">"; matchGrid += this.tableStart;  if (arrHeaders.length > 0) {
 matchGrid += "<thead class='ps_grid-head psc_invisible'>"; matchGrid +=this.trHStart; for (var i = 0; i < arrHeaders.length; i++)
 matchGrid += this.thStart + arrHeaders[i] + this.thEnd; matchGrid += this.trEnd; matchGrid += "</thead>"; }
 var mLength = matchArray.length; var nCol = matchArray[0].length;  matchGrid += "<tbody class='ps_grid-body'>"; for (var i = 0; i < matchArray.length; i++) {
 matchGrid += "<tr class='ps_grid-row psc_rowact' onclick='ptTAObj_win0.SetText(" + i + ");typeAheadPositionTopClear();'>"; for (var j = 0; j < matchArray[i].length; j++) {
 matchGrid += this.tdStart+matchArray[i][j] + this.tdEnd; }
 matchGrid += this.trEnd; } 
 matchGrid += "</tbody>";  matchGrid += this.tableEnd + "</div>"; matchGrid += "</div>"; return matchGrid; }
};PT_typeahead.prototype.getPrefixLength = function(str, prefix) {
 if ((str == null) || (prefix == null))
 return 0; var str1 = str.toUpperCase(); var str2 = prefix.toUpperCase(); var values = str2.split('%'); var pos = 0; for (var i =0; i< values.length; i++) {
 var tempPos = this.getIndex(str1.substr(pos),values[i]); if (tempPos == -1 || (i ==0 && tempPos != 0))
 return 0; else{
 pos += tempPos + values[i].length; }
 }

 if (str2.charAt(str2.length-1) == '%')
 return str.length; else
 return pos;};PT_typeahead.prototype.CreateBold = function(xStr,xTextMatch,xVal) { 
 var selectSpanMid = ""; if (!isFModeLayout())
 selectSpanMid="onclick='ptTAObj_win0.SetText("+xVal+")'"; selectSpanMid += " id='OptionsList_" + this.countForId + "' theArrayNumber='" + xVal + "'>"; xTextMatch = xTextMatch.replace(/\\\\/g,'\\');   prefixLength = this.getPrefixLength(xStr,xTextMatch); var matchedText = xStr.substring(0,prefixLength); var postMatchedText = xStr.substring(prefixLength);   this.countForId++; this.currentTotalRow++; return this.selectSpanStart + selectSpanMid + this.undeStart + this.EscapeHTMLSymbol(matchedText) + this.undeEnd+this.EscapeHTMLSymbol(postMatchedText) + this.selectSpanEnd;};PT_typeahead.prototype.CreateBoldOtherCol = function(xStr,xVal) {
 selectSpanMid = "onclick='ptTAObj_win0.SetText("+xVal+")'" + "id='OptionsList_" + this.countForId + "' theArrayNumber='" + xVal + "'>"; this.countForId++;  return this.selectSpanStart + selectSpanMid + this.EscapeHTMLSymbol(xStr) + this.selectSpanEnd;};PT_typeahead.prototype.MoveHighlight = function(xDir) {
 if (this.currentValueSelected >= -1){
 newValue = parseInt(this.currentValueSelected) + parseInt(xDir); if (newValue > -1 && newValue < this.currentTotalRow) { 
 this.currentValueSelected = newValue; this.SetHighColor(null, xDir); }
 if (newValue == this.currentTotalRow && ((this.startPos+this.maxRange) < ptTAObj_win0.arrMatches.length)) {
 this.ScrollDown(); this.currentValueSelected = 0; ptTAObj_win0.GrabHighlighted(); this.MoveHighlight(xDir); }
 if (newValue == -1 && this.startPos > 0) {
 this.ScrollUp(); this.currentValueSelected = this.currentTotalRow; ptTAObj_win0.GrabHighlighted(); this.MoveHighlight(xDir); }
 }
};PT_typeahead.prototype.SetHighColor = function(theTextBox, xDir) {
 if (theTextBox) {
 this.currentValueSelected = theTextBox.id.slice(theTextBox.id.indexOf("_") + 1, theTextBox.id.length); }
 var odd = false; var totalCol = 0; if ((typeof ptTAObj_win0.arrMatches[0] !== 'undefined') && (ptTAObj_win0.arrMatches[0]))
 totalCol = ptTAObj_win0.arrMatches[0].length; for (i = 0; i < this.currentTotalRow; i++) {
 var tObj = ptTAObj_win0.oDoc.getElementById('OptionsList_'+i*totalCol); if (!tObj) continue; var trObj = tObj.parentNode.parentNode; for (var j = 0; j < trObj.childNodes.length; j++) {
 if (isFModeLayout()) {
 removeSelected(trObj); }
 else {
 var node = trObj.childNodes[j]; if (odd)
 node.className = 'PSSRCHRESULTSODDROW'; else
 node.className = 'PSSRCHRESULTSEVENROW'; }
 }
 if (odd) 
 odd=false;  else 
 odd=true; }

 
 var selectOBJ; if (theTextBox) {
 selectOBJ = ptTAObj_win0.oDoc.getElementById('OptionsList_' + this.currentValueSelected); this.currentValueSelected = selectOBJ.getAttribute("theArrayNumber") - this.startPos;  }
 else
 selectOBJ = ptTAObj_win0.oDoc.getElementById('OptionsList_' + this.currentValueSelected * totalCol);  if (selectOBJ) {
 var trObj = selectOBJ.parentNode.parentNode; if (isFModeLayout()) {
 addSelected(trObj);  var objScroll = this.GetScrollContainer(); if (objScroll) {
 var nRowH = trObj.clientHeight; if (xDir == 1 && this.currentValueSelected > 0)
 objScroll.scrollTop += nRowH; else
 objScroll.scrollTop -= nRowH; }
 }
 else {
 for (var j = 0; j < trObj.childNodes.length; j++) {
 var node = trObj.childNodes[j]; node.className = 'spanHighElement'; }
 }
 }
};PT_typeahead.prototype.IsSelectedUnique = function(xVal) {
 var bUnique = true;  if (xVal < 0) return bUnique; if (ptTAObj_win0.arrMatches.length <= xVal) return bUnique; var selectedValue; var aboveValue; var belowValue;  selectedValue = this.DecodeValue(ptTAObj_win0.arrMatches[xVal][this.theTextBox.obj.colnum]); if (xVal > 0) 
 aboveValue = this.DecodeValue(ptTAObj_win0.arrMatches[xVal -1][this.theTextBox.obj.colnum]); if (xVal + 1 < ptTAObj_win0.arrMatches.length) 
 belowValue= this.DecodeValue(ptTAObj_win0.arrMatches[xVal + 1][this.theTextBox.obj.colnum]); if (selectedValue == aboveValue || selectedValue == belowValue)
 bUnique = false; return bUnique; };PT_typeahead.prototype.GetIndexBasedOnSelectedVal = function(xVal) {
 var index = 0; var i = xVal; var aboveValue; var selectedValue = this.DecodeValue(ptTAObj_win0.arrMatches[xVal][this.theTextBox.obj.colnum]); while (i > 0) {
 aboveValue = this.DecodeValue(ptTAObj_win0.arrMatches[i -1][this.theTextBox.obj.colnum]); if (selectedValue == aboveValue) 
 i--; else
 break; }
 index = xVal - i; return index;};PT_typeahead.prototype.UpdateControlField = function(xVal) {
 if (ptCommonObj2.isSearchPage(this.oForm)) return;  if (ptCommonObj2.isClassicAddPage(this.oForm)) return; var rowNum = this.GetIndexBasedOnSelectedVal(xVal);  var val = '#ICRow' + rowNum; document.win0.target = window.id; document.win0.ICAction.value = val; aAction_win0(document.win0, val);};PT_typeahead.prototype.SetText = function(xVal) {
 
 var sDelVal = this.theTextBox.value; if ((this.theTextBox).focus)
 (this.theTextBox).focus(); else if ((this.theTextBox).setActive)
 (this.theTextBox).setActive();  this.theTextBox.value=this.DecodeValue(ptTAObj_win0.arrMatches[xVal][this.theTextBox.obj.colnum]);  if (!ptTAObj_win0.IsSelectedUnique(xVal)) {
 var postUrl_win0_old = postUrl_win0; postUrl_win0 += (postUrl_win0.split("?")[1] ? "&":"?") + "ICTypeAheadSelectedUnique=0"; this.UpdateControlField(xVal); postUrl_win0 = postUrl_win0_old; } 
 addchg_win0(this.theTextBox);   var thisObj = this.theTextBox.attributes.getNamedItem('onchange'); if (thisObj != null && thisObj.nodeValue != null) 
 this.theTextBox.onchange();  if (isTouchDevice()) {
 ptTAObj_win0.HideTheBox();  } 

 
 if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel) {
 var nIndx = 0;  var keyIndex = this.getTaFldIndex(this.GetArrHeaders()); for (var i = 0; i < this.GetArrOptions().length; i++) {
 for (var j = 0; j < this.GetArrOptions()[i].length; j++) {
 
 if (this.GetArrOptions()[i][keyIndex] !== this.theTextBox.value) break; this.theTextBox.setAttribute('listval' + nIndx.toString(), this.GetArrOptions()[i][j]); nIndx++; }
 }
 this.theTextBox.setAttribute("sp_done", '0'); onSmartPromptDataChange(window.event, this.theTextBox, this.theTextBox.value, 'onclick0'); }
  

};PT_typeahead.prototype.DecodeValue = function(xVal) {
 var newValue = xVal;  newValue = newValue.replace(/&quot;/gi,'"');  newValue = newValue.replace(/&#039;/gi, '\'').replace(/&acute;/gi,'\'').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#037;/,'%').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi,'&');  return newValue;};PT_typeahead.prototype.GrabHighlighted = function() {
 if (this.currentValueSelected >= 0) {
 this.bGrabHighlighted = true; var xVal = this.currentValueSelected + this.startPos;  if ((xVal >= 0) && (ptTAObj_win0.arrMatches) && (ptTAObj_win0.arrMatches.length > xVal)) {
 this.theTextBox.value=this.DecodeValue(ptTAObj_win0.arrMatches[xVal][this.theTextBox.obj.colnum]); }
 }
};PT_typeahead.prototype.AutoWinAdj = function(xPosElement) {
 ptTAObj_win0.bodyScrollLeft = ptTAObj_win0.oDoc.body.scrollLeft;  ptTAObj_win0.bodyScrollTop = ptTAObj_win0.oDoc.body.scrollTop; var t1 = parseInt(xPosElement.offsetHeight,10); var t2 = parseInt(document.body.offsetHeight,10)-(parseInt(xPosElement.style.top,10)-ptTAObj_win0.oDoc.body.scrollTop); if (t1 > t2)
 ptTAObj_win0.oDoc.body.scrollTop = t1 - t2 + 10; t1 = parseInt(xPosElement.offsetWidth, 10); t2 = parseInt(document.body.offsetWidth, 10) - (parseInt(xPosElement.style.left, 10) - ptTAObj_win0.oDoc.body.scrollLeft); if (t1 > t2) {
 if (ptTAObj_win0.oDoc.win0.ICActionPrompt.value == 'true') {
 var o = ptTAObj_win0.oWin.parent.document.getElementById('popupContainer'); ptTAObj_win0.promptWidth = Math.max(0, o.style.width.replace('px','')); var newW = ptTAObj_win0.promptWidth + t1 - t2 + 20 + 'px'; o.style.width = newW; o = ptTAObj_win0.oWin.parent.document.getElementById('popupFrame'); o.style.width = newW; o = ptTAObj_win0.oWin.parent.document.getElementById("popupTitleBar"); o.style.width = newW; }
 var selectedPosX = 0; var selectedPosY = 0; var theElement = xPosElement; if (!theElement) return; var theElemHeight = theElement.offsetHeight; var theElemWidth = theElement.offsetWidth; while (theElement != null) {
 selectedPosX += theElement.offsetLeft; selectedPosY += theElement.offsetTop; theElement = theElement.offsetParent; }
 if ((t1 - t2 + 20) > selectedPosX)
 ptTAObj_win0.oDoc.body.scrollLeft = selectedPosX - 20; else
 ptTAObj_win0.oDoc.body.scrollLeft = t1 - t2 + 20; }
};PT_typeahead.prototype.AutoWinUnAdj = function() {
 ptTAObj_win0.oDoc.body.scrollLeft = ptTAObj_win0.bodyScrollLeft;  ptTAObj_win0.oDoc.body.scrollTop = ptTAObj_win0.bodyScrollTop;  if (!ptTAObj_win0.oDoc.win0.ICActionPrompt || ptTAObj_win0.oDoc.win0.ICActionPrompt.value != 'true') {
 ptTAObj_win0.promptWidth = 0; return; }
 if (ptTAObj_win0.promptWidth == 0) return; var o = ptTAObj_win0.oWin.parent.document.getElementById('popupContainer'); o.style.width = ptTAObj_win0.promptWidth + 'px'; o = ptTAObj_win0.oWin.parent.document.getElementById('popupFrame'); o.style.width = ptTAObj_win0.promptWidth + 'px'; o = ptTAObj_win0.oWin.parent.document.getElementById("popupTitleBar"); o.style.width = ptTAObj_win0.promptWidth + 'px'; };PT_typeahead.prototype.ClearResultData = function() {
 ptTAObj_win0.arrHeaders.length = 0; this.GetArrOptions().length = 0; ptTAObj_win0.arrMatches.length = 0;};PT_typeahead.prototype.DecodeArrOptions = function() {
 if (typeof this.GetArrOptions() == 'undefined') 
 return; for (var i = 0; i < this.GetArrOptions().length; i++) {
 for (var j = 0; j < this.GetArrOptions()[i].length; j++) {
 this.GetArrOptions()[i][j] = this.DecodeValue(this.GetArrOptions()[i][j]); }
 }
};PT_typeahead.prototype.HideTheBox = function(){
 if (ptTAObj_win0.isTiming == false)
 return; if ((ptTAObj_win0.theTextBox.value === '') && bSpEnable)
 bSPDisplay = true; else
 bSPDisplay = false; if (isFModeLayout()) {
 this.Close(); return; }

 
 
 this.bGrabHighlighted = false; var el = ptTAObj_win0.oDoc.getElementById('pt_typeahead0'); if (el && typeof el != 'undefined') {
 el.style.display='none'; }
 ptTAObj_win0.oDoc.getElementById('pt_typeahead').style.display='none'; ptTAObj_win0.currentValueSelected=-2; ptTAObj_win0.EraseTimeout();    this.startPos = 0;  ptTAObj_win0.ClearResultData(); };PT_typeahead.prototype.IsGrabHighlighted = function() { 
 if (this.bGrabHighlighted)
 return true; return false;};PT_typeahead.prototype.EraseDelayTime = function(){
 clearTimeout(ptTAObj_win0.isDelayTiming); ptTAObj_win0.isDelayTiming=false;};PT_typeahead.prototype.StartDelayTimeout = function(){
 if (!ptTAObj_win0.theTextBox) return; ptTAObj_win0.EraseDelayTimeout(); ptTAObj_win0.isDelayTiming=setTimeout("ptTAObj_win0.DoTypeAhead()",this.nDelayTime);};PT_typeahead.prototype.EraseDelayTimeout = function(){
 clearTimeout(ptTAObj_win0.isDelayTiming); ptTAObj_win0.isDelayTiming=false;};PT_typeahead.prototype.EraseTimeout = function(){
 clearTimeout(ptTAObj_win0.isTiming); ptTAObj_win0.isTiming=false;};PT_typeahead.prototype.StartTimeout = function(){
 if (!ptTAObj_win0.theTextBox) 
 return;  ptTAObj_win0.SPFlagBlur = true; if ((typeof ptTAObj_win0.theTextBox.obj !== 'undefined') && (ptTAObj_win0.theTextBox.obj)) {
 ptTAObj_win0.EraseTimeout(); ptTAObj_win0.isTiming=setTimeout("ptTAObj_win0.HideTheBox()", ptTAObj_win0.theTextBox.obj.theVisibleTime); }
};PT_typeahead.prototype.GetContainerEl = function () { 
 var xPosElement = null; if (isFModeLayout()) {
 xPosElement = ptTAObj_win0.oDoc.getElementById(this.theTextBox.id + '$typeahead'); if (!xPosElement)
 xPosElement = ptTAObj_win0.oDoc.getElementById("pt_typeahead"); }
 else {
 xPosElement = ptTAObj_win0.oDoc.getElementById("pt_typeahead");  if (this.smartPromtsEnabled && this.smartPromtsEnabledAtFieldLevel)
 xPosElement.classList.add('renderSmartPromptUi'); xPosElement.classList.remove('customSPMenu');  }

 return xPosElement;};PT_typeahead.prototype.ResetContainerEl = function () {
 if (!isFModeLayout()) return; var mObj = document.getElementById(this.theTextBox.id + '$typeahead'); if (mObj) {
 mObj.arrHeaders = ""; mObj.arrOptions = ""; }
}

PT_typeahead.prototype.GetArrOptions = function () {

 if (this.GetContainerEl().arrOptions)
 return this.GetContainerEl().arrOptions; if (this.theTextBox && this.theTextBox.obj)
 return this.theTextBox.obj.arrOptions; return new Array();};PT_typeahead.prototype.GetArrHeaders = function () {
 if (this.GetContainerEl().arrHeaders)
 return this.GetContainerEl().arrHeaders; if (this.theTextBox && this.theTextBox.obj)
 return this.theTextBox.obj.arrHeaders; return new Array();};PT_typeahead.prototype.InitArrOptions = function () {
 if (this.theTextBox && this.theTextBox.obj)
 this.theTextBox.obj.arrOptions = new Array();};PT_typeahead.prototype.GetScrollContainerId = function () {
 return getPageFormName(this.theTextBox.parentNode) + "div" + this.theTextBox.id + "grid";}

PT_typeahead.prototype.GetScrollContainer = function () {
 return document.getElementById(this.GetScrollContainerId());}

PT_typeahead.prototype.PositionTop = function (el) {
 return false; if (isFModeLayout() && isTouchKeyboard() && el) {
 var elp = document.getElementById(getPageFormName(el.parentNode) + "div" + el.id); if (!elp) return; elp.style.top = 0, elp.style.left = 0, elp.style.position = "absolute", elp.style.zIndex = 211; ptCommonObj2.showPopupMask(window, 'pt_modalMask', false, 'ps_maskwhite '); var popMask = document.getElementById('pt_modalMask'); popMask.bTypeAhead = true; popMask.addEventListener("click", typeAheadPositionTopClear, false); }
}

PT_typeahead.prototype.PositionTopClear = function () {
 return;  if (isFModeLayout() && isTouchKeyboard()) {
 var el = document.getElementById(this.theTextBox.id); if (!el) return; var elp = document.getElementById(getPageFormName(el.parentNode) + "div" + this.theTextBox.id); if (!elp) return; elp.style.top = "", elp.style.left = "", elp.style.position = "", elp.style.zIndex = ""; ptCommonObj2.hidePopupMask(window, 'pt_modalMask', false, 'ps_maskwhite '); var popMask = document.getElementById('pt_modalMask');  popMask.bTypeAhead = false; popMask.removeEventListener("click", typeAheadPositionTopClear, false); }
}

PT_typeahead.prototype.Resize = function () {
 var mObj = document.getElementById(this.theTextBox.id + '$typeahead'); nMaxH = getModObjHeight(MTop().modId); var objH = mObj.querySelector(".ps_grid-head"); if (objH) nMaxH -= objH.clientHeight; var cObj = this.GetScrollContainer(); cObj.bVScroll = 1; cObj.bHScroll = 0; scrollInit(this.GetScrollContainerId(), true, nMaxH); gridInit(this.GetScrollContainerId()); resizeModalDialog_pt(MTop().modId);}

PT_typeahead.prototype.Close = function () {
 autoCloseTypeAhead(); if (this.theTextBox != null) {
 var mObj = document.getElementById(this.theTextBox.id + '$typeahead'); if (mObj && this.theTextBox.obj.bNew) {
 mObj.arrHeaders = this.theTextBox.obj.arrHeaders; mObj.arrOptions = this.theTextBox.obj.arrOptions; this.theTextBox.obj.bNew = false; }
 }
 ptTAObj_win0.isTiming = false;}

PT_typeahead.prototype.isNew = function () {
 if ((this.theTextBox != null) && (typeof this.theTextBox.obj !== 'undefined') && (this.theTextBox.obj))
 return this.theTextBox.obj.bNew; else
 return false;}

PT_typeahead.prototype.getTaFldIndex = function (arrHdrs) {
 var keyIndex = 0; var lbl = this.theTextBox.getAttribute('pt_flbl'); if ((typeof(lbl) !== "undefined") && (lbl) && (lbl !== "")) {
 for (var m = 0; m < arrHdrs.length; m++) {
 if (arrHdrs[m] === lbl)
 keyIndex = m; }

 if (arrHdrs.length == 0) {
 g_nMostRelKeyIndx = getTypeAheadKeyIndex(this.theTextBox); keyIndex = g_nMostRelKeyIndx; }
 }
 return keyIndex;}


PT_typeahead.prototype.reorderTypeAheadListBasedOnIndexDbData = function (xCompareStr) {
 
 var relevantsArrayValidUnSorted = new Array(); var othersListArray = new Array(); var relevantsArrayValidSorted = new Array(); var concatenatedArr = new Array(); var sortedRelevantKeys = this.relevantsListArrSequencedKeysAndValues.map(({ Value }) => Value); var validKeys = []; var counter = 0; var validatedFlagForSp = this.theTextBox.getAttribute('validatedFlag');  var validatedListForDefaultVal = new Array(); if(!this.validValuesListUsedForMoreRows) {
 if(this.validValuesForFieldWithDefaultValue) {
 for (i = 0; i < this.validValuesForFieldWithDefaultValue.length; i++) {
 validatedListForDefaultVal.push({Value: this.validValuesForFieldWithDefaultValue[i][0]});}
 }
 }

 
 if(!this.validValuesListUsedForMoreRows) {
 this.validValuesListUsedForMoreRows = validatedListForDefaultVal; this.validValuesForFieldWithDefaultValue = ""; }
 else {
 if ((typeof(this.relevantsListArrKeys) !== "undefined") &&
 (this.relevantsListArrKeys) &&
 (this.relevantsListArrKeys.length > 0)) { 
 if ((typeof this.theTextBox.value === 'undefined') || (!this.theTextBox.value) || (this.theTextBox.value === "")) {
 this.validValuesListUsedForMoreRows = this.relevantsListArrKeys; }
 }
 }

 var nTaFldIndx = this.getTaFldIndex(this.GetArrHeaders());  if ((this.validValuesListUsedForMoreRows) && (this.theTextBox.obj.arrOptions.length == 100) && (!this.GetContainerEl().arrOptions))
 this.GetContainerEl().arrOptions = this.theTextBox.obj.arrOptions; var validValuesFetchedOnFocus = []; if ((this.validValuesListUsedForMoreRows) && (this.theTextBox.obj.arrOptions.length == 100)) {

 validValuesFetchedOnFocus = this.validValuesListUsedForMoreRows.map(({ Value }) => Value); if ((typeof(validValuesFetchedOnFocus) !== "undefined") && (validValuesFetchedOnFocus) && (validValuesFetchedOnFocus.length>0))
 validValuesFetchedOnFocus = this.validValuesListUsedForMoreRows; var validValuesThatAreInNetworkCall = []; var validValuesThatAreNotInNetworkCall = []; for (i = 0; i < validValuesFetchedOnFocus.length; i++) {
 var elemValueValidated = [validValuesFetchedOnFocus[i]]; var valueInNetworkCallflag = false; this.GetContainerEl().arrOptions.some((element) => {
 if (element[nTaFldIndx] === elemValueValidated[0]) {
 validValuesThatAreInNetworkCall.push(element); valueInNetworkCallflag = true; }
 else if (element[nTaFldIndx] === elemValueValidated[0].Value) {
 validValuesThatAreInNetworkCall.push(element); valueInNetworkCallflag = true; }
 })
 if (!valueInNetworkCallflag && validatedFlagForSp) { 
 this.relevantValuesWithMultipleColsInSP.some((element) => {
 if (element[nTaFldIndx] === elemValueValidated[0]) {
 this.GetContainerEl().arrOptions.push(element); }
 else if (element[nTaFldIndx] === elemValueValidated[0].Value) {
 this.GetContainerEl().arrOptions.push(element); }
 })
 }
 }
 }

 
 
 this.GetArrOptions().forEach(element => {
 validKeys.push(UnEscapeHTMLSymbol(element[nTaFldIndx])); }); for (i = 0; i < sortedRelevantKeys.length; i++) {
 if (!validKeys.includes(sortedRelevantKeys[i])) {
 this.relevantsListArrSequencedKeysAndValues.splice(i-counter, 1); counter++; }
 }

 
 
 
 var relevantsListArrSequencedKeysAndValuesContainingMruMfuList = this.relevantsListArrSequencedKeysAndValues; var mruValues = []; var mfuValues = []; var concatenatedMfuMruArr = [];  concatenatedMfuMruArr = sortAndCombineMfuMru(this.relevantsListArrSequencedKeysAndValues);  function removeDuplicates(arr) {
 return [...new Set(arr)]; }
 concatenatedMfuMruArr = removeDuplicates(concatenatedMfuMruArr);  this.relevantsListArrSequencedKeysAndValues = concatenatedMfuMruArr;  var sortedValidRelevantKeys = this.relevantsListArrSequencedKeysAndValues.map(({ Value }) => Value);   var sPrmtTbl = this.theTextBox.getAttribute('pt'); var sSesnStorageItmNm = getViewAllElemId(this.theTextBox.id) + '_' + sPrmtTbl + '_Dflt'; var spDfltVal = sessionStorage.getItem(sSesnStorageItmNm); if ((typeof(spDfltVal) !== "undefined") && (spDfltVal)) {
 if (sortedValidRelevantKeys.includes(spDfltVal)) {
 
 sortedValidRelevantKeys.unshift(sortedValidRelevantKeys.splice(sortedValidRelevantKeys.findIndex(item => item === spDfltVal), 1)[0]); } else {
 if (sortedValidRelevantKeys.length > 0)
 sortedValidRelevantKeys.unshift(spDfltVal);  }
 }

 
 this.relevantsListArrKeys = sortedValidRelevantKeys;  for (i = 0; i < this.GetArrOptions().length; i++) {
 if (sortedValidRelevantKeys.includes(this.GetArrOptions()[i][nTaFldIndx])) {
 relevantsArrayValidUnSorted.push(this.GetArrOptions()[i]); } else {
 othersListArray.push(this.GetArrOptions()[i]); }
 }

 
 var arrTargetSequence = sortedValidRelevantKeys ;  var arrToBeSorted = relevantsArrayValidUnSorted; var sortArrayBasedOnGivenSequence = (arrTargetSequence, arrToBeSorted) => {
 arrToBeSorted.sort((a, b) => {
 var aKey = a[0]; var bKey = b[nTaFldIndx]; return arrTargetSequence.indexOf(aKey) - arrTargetSequence.indexOf(bKey); }); }; sortArrayBasedOnGivenSequence(arrTargetSequence, arrToBeSorted); relevantsArrayValidSorted = arrToBeSorted;  concatenatedArr = relevantsArrayValidSorted.concat(othersListArray);  this.DecodeArrOptions(); for (var i = 0; i < concatenatedArr.length; i++) {
 var str = concatenatedArr[i][this.theTextBox.obj.colnum]; var theMatch = this.getPrefixLength(str, xCompareStr) > 0; if (theMatch) {
 ptTAObj_win0.arrMatches[ptTAObj_win0.arrMatches.length] = concatenatedArr[i]; }
 }
}

PT_typeahead.prototype.fetchDataFromIndexDbForTypeAheadSP = function () {
 if (this.theTextBox.value == "") return;  var key = getSmartPromptKeys(this.theTextBox.id); if ((typeof(key) === "undefined") || (!key) || (key.length < 9)) return; var currentTimestamp = new Date(); var objTA = this;  var trans = getSmartPromptTransactionObject("readonly"); if (!objectStoreSmartPrompt) return; var byKeysIndex = objectStoreSmartPrompt.index("bySpKeys"); if (!byKeysIndex) return; var getRequest = byKeysIndex.get(key); getRequest.onsuccess = function (event) {

 objTA.relevantsListArrKeys = []; objTA.relevantsListArrSequencedKeysAndValues = []; objTA.relevantValuesWithMultipleColsInSP = []; var dataRecord = {userid: key[0], dbname: key[1], portalname: key[2], langcd: key[3], componentname: key[4], htmlid: key[5], values: [], recname: key[6], fldname: key[7], prompttbl: key[8], dttm: currentTimestamp}; var tmp = event.target.result; if (typeof tmp !== "undefined") {
 for (var i = 0; i < tmp.datavalues.length; i++) {
 var dependsOnHtmlId = ""; var dependsOnFieldValue, actualFieldValue; var dependsOnKeyNm = ""; var bDependsOnMatched = true; for (var k = 0; k < tmp.datavalues[i].dependson.length; k++) {
 
 dependsOnHtmlId = tmp.datavalues[i].dependson[k].htmlid; dependsOnKeyNm = tmp.datavalues[i].dependson[k].keyname; if (dependsOnKeyNm === 'EFFDT') continue; if (dependsOnHtmlId !== "") {
 dependsOnFieldValue = "" + tmp.datavalues[i].dependson[k].fieldvalue; var dependsOnElem = getDependsOnElementFromFieldNm(dependsOnKeyNm, null); if (typeof dependsOnElem !== 'undefined' && dependsOnElem)
 actualFieldValue = "" + getDependsOnValue(dependsOnElem); if (actualFieldValue !== dependsOnFieldValue) {
 bDependsOnMatched = false; break; }
 }
 }

 if (bDependsOnMatched == false) continue; for (var j = 0; j < tmp.datavalues[i].values.length; j++) {

 var relevantValuesWithMultiCols = []; for (var k = 0; k < tmp.datavalues[i].values[j].columns.length; k++) {
 if( typeof(tmp.datavalues[i].values[j].columns[k].value) !== 'undefined')
 relevantValuesWithMultiCols.push(tmp.datavalues[i].values[j].columns[k].value); else
 relevantValuesWithMultiCols.push(tmp.datavalues[i].values[j].columns[k]); }
 objTA.relevantValuesWithMultipleColsInSP.push(relevantValuesWithMultiCols); var elemVal = tmp.datavalues[i].values[j].fieldvalue; var elemCount = tmp.datavalues[i].values[j].count; var elemTimeStamp = tmp.datavalues[i].values[j].timestamp; objTA.relevantsListArrKeys.push(elemVal); objTA.relevantsListArrSequencedKeysAndValues.push({count: elemCount, Value: elemVal, timestamp: elemTimeStamp});  }
 }
 }
 }
}

PT_typeahead.prototype.generateTypeAheadHTMLForClassicSP = function (matchArray,mLengthA) {
 var matchGrid = this.tableStart + "<thead>"; this.bScrolldownImage = 0;  if (this.arrHeaders.length > 0) {
 matchGrid += this.trStart; for (var i = 0; i < this.arrHeaders.length; i++) 
 matchGrid += this.thStart + this.arrHeaders[i] + this.thEnd; matchGrid +=this.trEnd; }
 matchGrid = matchGrid + "</thead>"; var odd = true; var mLength = matchArray.length; var nCol = matchArray[0].length;  if (isTouchDevice()) {
 var sCloseTAResult = "<img align='right' src='"+this.url_close+"'/ onclick='ptTAObj_win0.HideTheBox()'>"; matchGrid = matchGrid + this.trStart; matchGrid = matchGrid + sCloseTAResult;  matchGrid = matchGrid + this.trEnd; }
 
 var trStartArrowRowAtTheTop = "<tr class='psTARowWithArrowsAtTop' align=\'"+'left'+"\'>"; if (isTouchDevice()) {
 var sScrollUp = "<img align='absmiddle' src='" + this.url_up + "'/ onclick='ptTAObj_win0.ScrollUp()'>"; } else {
 var sScrollUp = "<img align='absmiddle' src='" + this.url_up + "'/ onmouseover='ptTAObj_win0.ScrollUp()'>"; } 
 sScrollUp = this.tdScrollStart + nCol + "'>" + sScrollUp + this.tdEnd
 if (this.startPos > 0 && (mLength >= this.maxRange || this.startPos+mLength == mLengthA)) {
 matchGrid = matchGrid + trStartArrowRowAtTheTop; matchGrid = matchGrid + sScrollUp;  matchGrid = matchGrid + this.trEnd; }
 odd = false; var relavantsMatchArray = []; var updatedMatchArray = []; for (var i = 0; i < matchArray.length; i++) {
 var keyIndex = this.getTaFldIndex(this.GetArrHeaders()); var cleanText = matchArray[i][keyIndex].replace(/<\/?[^>]+(>|$)/g, ""); cleanText = cleanText.replace(/&nbsp;/g, ' ');  if (this.relevantsListArrKeys.includes(UnEscapeHTMLSymbol(cleanText))) {
 relavantsMatchArray.push(matchArray[i]); }
 else {
 updatedMatchArray.push(matchArray[i]); }
 }

 var trStartArrowRowAtTheBottom = "<tr class='psTARowWithArrowsAtBottom' align=\'" + 'left' + "\'>"; var trStartMrCells = "<tr class='mostRelevantTrCells' align=\'" + 'left' + "\'>"; var trStartOthCells = "<tr class='otherTrCells' align=\'" + 'left' + "\'>"; var trStartMr = "<tr align=\'"+'left'+"\' class='mostrelevant PSGROUPBOXLABEL'><th scope='rowgroup'>Most Relevant"; var trStartOth = "<tr align=\'"+'left'+"\' class='mostrelevant PSGROUPBOXLABEL'><th scope='rowgroup'>Others"; var tbodyStart = "<tbody>"; var tbodyEnd = "</tbody>"; if (relavantsMatchArray.length)
 matchGrid = matchGrid + tbodyStart + trStartMr; matchGrid = matchGrid+this.trEnd; for (var i = 0; i < relavantsMatchArray.length; i++) {
 matchGrid += trStartMrCells; for (var j = 0; j < relavantsMatchArray[i].length; j++) {
 if (odd) 
 matchGrid += this.tdODDStart+relavantsMatchArray[i][j]+this.tdEnd; else 
 matchGrid += this.tdEVENStart+relavantsMatchArray[i][j]+this.tdEnd; }
 if (odd) 
 odd=false;  else 
 odd=true; matchGrid += this.trEnd; }

 if (relavantsMatchArray.length && updatedMatchArray.length)
 matchGrid = matchGrid + tbodyEnd + tbodyStart + trStartOth; matchGrid = matchGrid+this.trEnd; for (var i = 0; i < updatedMatchArray.length; i++) {
 matchGrid += trStartOthCells; for (var j = 0; j < updatedMatchArray[i].length; j++) {
 if (odd) 
 matchGrid += this.tdODDStart+updatedMatchArray[i][j] + this.tdEnd; else 
 matchGrid += this.tdEVENStart+updatedMatchArray[i][j] + this.tdEnd; }
 if (odd) 
 odd=false;  else 
 odd=true; matchGrid += this.trEnd; }

 if (((this.startPos+this.maxRange) < ptTAObj_win0.arrMatches.length) && mLength >= this.maxRange) {
 if (isTouchDevice()) {
 var sScrollDown = "<img align='absmiddle' src='"+this.url_dn+"'/ onclick='ptTAObj_win0.ScrollDown()'>"; } else {
 var sScrollDown = "<img align='absmiddle' src='"+this.url_dn+"'/ onmouseover='ptTAObj_win0.ScrollDown()'>"; }
 this.bScrolldownImage = 1;  sScrollDown = this.tdScrollStart+nCol + "'>" + sScrollDown + this.tdEnd; matchGrid = matchGrid + trStartArrowRowAtTheBottom;  matchGrid = matchGrid + sScrollDown;  matchGrid = matchGrid + this.trEnd; }

 matchGrid += tbodyEnd + this.tableEnd; return matchGrid;}


PT_typeahead.prototype.generateTypeAheadHTMLForFluidSP = function (matchArray,mLengthA) {
 var matchGrid = "<div class='ps_box-gridc' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "gridc'>"; matchGrid += "<div class='ps_box-grid ps_box-grid-head' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "colhdr'>"; matchGrid += "<table class='ps_grid-flex ps_grid-flex-head'>"; var arrHeaders = this.GetArrHeaders(); if (arrHeaders.length > 0) {
 matchGrid += "<thead class='ps_grid-head'>"; matchGrid += this.trHStart; for (var i = 0; i < arrHeaders.length; i++)
 matchGrid += this.thStart + arrHeaders[i] + this.thEnd; matchGrid += this.trEnd; matchGrid += "</thead>"; }
 matchGrid += this.tableEnd; matchGrid += "</div>"; matchGrid += "<div class='ps_box-grid ps_box-grid-typeahead ps_box-grid-typeahead_with_sp ps_scrollable sbar sbar_v ps_scrollable_v' id='" + getPageFormName(this.theTextBox) + "div" + this.theTextBox.id + "grid' onscroll='ptTAObj_win0.EraseTimeout();' onmouseup=\"setFocus_win0('"+this.theTextBox.id+"');\">"; matchGrid += this.tableStart;  if (arrHeaders.length > 0) {
 matchGrid += "<thead class='ps_grid-head psc_invisible'>"; matchGrid += this.trHStart; for (var i = 0; i < arrHeaders.length; i++)
 matchGrid += this.thStart + arrHeaders[i] + this.thEnd; matchGrid += this.trEnd; matchGrid += "</thead>"; }
 var mLength = matchArray.length; var nCol = matchArray[0].length;   var relavantsMatchArray = []; var updatedMatchArray = []; var nTaFldIndx = this.getTaFldIndex(this.GetArrHeaders()); for (var i = 0; i < matchArray.length; i++) {
 var cleanText = matchArray[i][nTaFldIndx].replace(/<\/?[^>]+(>|$)/g, ""); cleanText = cleanText.replace(/&nbsp;/g, ' ');  if (this.relevantsListArrKeys.includes(UnEscapeHTMLSymbol(cleanText))) {
 relavantsMatchArray.push(matchArray[i]); } else {
 updatedMatchArray.push(matchArray[i]); }
 }

 matchGrid += "<tbody class='ps_grid-body'>";  var trStartMr = "<tr class='ps_grid-head-row ps_grid-typeahead-spmrrow'><th scope='rowgroup' class='ps_grid-cols'><div class='ps_box_grid-col'>Most Relevant</div></th></tr>"
 var trStartOth = "<tr class='ps_grid-head-row ps_grid-typeahead-spotherrow'><th scope='rowgroup' class='ps_grid-cols'><div class='ps_box_grid-col'>Others</div></th></tr>"

 
 if (relavantsMatchArray.length) {
 matchGrid = matchGrid+trStartMr; matchGrid = matchGrid+this.trEnd; }
 var counterForRows = relavantsMatchArray.length; for (var i = 0; i < relavantsMatchArray.length ;i++) {
 matchGrid += "<tr class='ps_grid-row psc_rowact ps_grid-typeahead-spmrrow' onclick='ptTAObj_win0.SetText(" + i + ");typeAheadPositionTopClear();'>"; for (var j=0; j<relavantsMatchArray[i].length; j++) {
 matchGrid += this.tdStart + relavantsMatchArray[i][j] + this.tdEnd; }
 matchGrid += this.trEnd; }

 
 if (relavantsMatchArray.length && updatedMatchArray.length) {
 matchGrid += "</tbody><tbody class='ps_grid-body'>"; matchGrid = matchGrid + trStartOth; matchGrid = matchGrid + this.trEnd; }
 for (var i = 0; i < updatedMatchArray.length; i++){ 
 var updatedCounter = counterForRows + i; matchGrid += "<tr class='ps_grid-row psc_rowact ps_grid-typeahead-spotherrow' onclick='ptTAObj_win0.SetText(" + updatedCounter + ");typeAheadPositionTopClear();'>"; for (var j = 0; j < updatedMatchArray[i].length; j++) {
 matchGrid += this.tdStart + updatedMatchArray[i][j] + this.tdEnd; }
 matchGrid += this.trEnd; }

 matchGrid += "</tbody>";  matchGrid += this.tableEnd + "</div>"; matchGrid += "</div>"; return matchGrid;}



function typeAheadPositionTopClear() {
 ptTAObj_win0.Close(); ptTAObj_win0.PositionTopClear();}


function isTypeHeadeNew() {
 return ptTAObj_win0.isNew();}
