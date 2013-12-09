function newPurchaseOrderPanel(){
	var form=new Ext.form.Panel({
		title:'new',
		width:500,
		height:400,
		frame:true,
		closable:true,
		fieldDefaults:{
			labelSeparator:':',
			msgTarget:'side',
			labelWidth:80
		},
		defaultType:'textfield',
		items:[{
			fieldLabel:'username',
			name:'username',
			allowBlank:false
		}]
	});
	// new orderPanel=Ext.create('Ext.panel.Panel',{
	// 	title:'新建进货单',
	// 	items:[{
	// 		xtype:'form'
	// 	}]
	// });
	return form;
}