function ourTeamPanel(){
	var panel=Ext.create('Ext.panel.Panel',{
		id:'ourTeam',
		title:'开发团队',
		closable:true,
		bodyStyle:'overflow-y:auto;',
		autoLoad:'?m=Main&a=ourTeam'
	});
	return panel;
}