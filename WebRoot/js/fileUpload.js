 function uploadFile(fpointWord,fpointId){
        $("#dialog-modal").omDialog({
            autoOpen: false,
            width:450,
            height: 400,
            modal: true
            
        });
        $( "#dialog-modal").omDialog('open');
            var frameLoc=window.frames[0].location;
            frameLoc.href='../../printjsp/uploadfile.jsp?billType='+billType+'&materialName='+materialName+'&fpointId='+fpointId+"&fpointWord="+fpointWord;
        return false;
      }