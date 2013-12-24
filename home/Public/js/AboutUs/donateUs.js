function donateUsPanel(){
	var panel=Ext.create('Ext.panel.Panel',{
		id:'donateUs',
		title:'捐赠我们',
		closable:true,
		autoLoad:'?m=Main&a=donateUs'
	});
	return panel;
}