/** ***根据不同的基础资料加载不同的js***** */
function dynamicLoadJs(basicdata) {
	loadEntryInfo(basicdata);
	if (basicdata == 'coderule') {
		loadjs('../../awjs/coderule.js');
	} else if (basicdata == 'customer') {
		loadjs('../../awjs/customer.js');
	} else if (basicdata == 'reportform') {// 报表
		loadjs('../../reportjsp/js/report.js');
	} else if (basicdata == 'importDataToORCL') {
		loadjs('../../importDataJs/importDataToORCL.js');
	} else if (billType == 'taxpayerinfo') {
		loadjs('../../baseinfo/js/taxPayerInfo.js');
	} else if (billType == 'nationalTax') {
		loadjs('../../zhzsjs/nationalTax.js');
	} else if (billType == 'localTax') {
		loadjs('../../zhzsjs/localTax.js');
	} else if (billType == 'taxCheck') {
		loadjs('../../zhzsjs/taxCheck.js');
	} else if (basicdata == 'customJobTask') {
		loadjs('../../awjs/customJobTask.js');
	}else if (basicdata == 'systemCheck') {
		loadjs('../../zhzsjs/systemCheck.js');
	}
}

// 加载序时簿界面js
function dynamicLoadListJs(basicdata) {
 if (basicdata == 'customJobTask') {
		loadjs('../../awjs/customJobTaskList.js');
	}
 else if (basicdata == 'keyCompanies') {//重点企业（列表添加同步按钮）
	 loadjs('../../awjs/keyCompanies.js');
 }
 else if (basicdata == 'systemCheck') {
	 loadjs('../../zhzsjs/systemCheckList.js');
 }
}

function loadjs(url) {
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	// 动态加载js时,消除缓存导致的乱码
	url += "?random=" + Math.random();
	oScript.src = url;
	oHead.appendChild(oScript);
}

// 加载分录明细
function loadEntryInfo(type) {
	if (firstLoad) {
		$.ajax({
			type : 'POST',
			url : "getEntryJsonDataByHeadName",
			data : "type=" + type,
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			success : function(data) {
				if (data != '') {
					addtable(0, data);
				}
			}
		});
	}
}