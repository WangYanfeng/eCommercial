function contactUsPanel(){
	var panel=Ext.create('Ext.panel.Panel',{
		id:'contactUs',
		title:'联系我们',
		closable:true,
		bodyStyle:'overflow-y:auto;',
		autoLoad:'?m=Main&a=contactUs'
	});
	return panel;
}