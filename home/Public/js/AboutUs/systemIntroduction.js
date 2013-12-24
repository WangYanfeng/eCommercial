function systemIntroductionPanel() {
	var panel=Ext.create('Ext.panel.Panel',{
		id:'systemIntroduction',
		title:'系统简介',
		closable:true,
		bodyStyle:'overflow-y:auto;',
		autoLoad:'?m=Main&a=systemIntroduction'
	});
	return panel;
}