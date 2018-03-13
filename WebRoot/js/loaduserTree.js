function loadusertree(tagid)
{
	$("#"+tagid).omTree({
                dataSource : 'findAllUserToMenu',
               // dataSource : data2,
                simpleDataModel: true,
                //showCheckbox: true
                //选择树节点回调方法
                onSelect: function(node){
                	nowChoiceId=node.fId;
               							},
            });
}
