
function validate(type) {
	if (type == "reserveorder") {
		loadjs("../../awjs/reserveordervali.js");
	} else {
		if (type == "salebill") {
			loadjs("../../awjs/salebillvali.js");
		} else {
			if (type == "accountbill") {
				loadjs("../../awjs/accountbillvali.js");
			} else {
				if (type == "trackreturn") {
					loadjs("../../awjs/trackreturnvali.js");
				} else {
					if (type == "complain") {
						loadjs("../../awjs/complainvali.js");
					} else {
						if (type == "giftvoucher") {  
		      				 //礼金卷
							loadjs("../../awjs/giftvouchervali.js");
						} else {
							if (type == "godownentry") {  
		      				 //入库单
								loadjs("../../awjs/godownentryvali.js");
							} else {
								if (type == "stockout") {  
		    					   //出库单
									loadjs("../../awjs/stockoutvali.js");
								}
							}
						}
					}
				}
			}
		}
	}
}

