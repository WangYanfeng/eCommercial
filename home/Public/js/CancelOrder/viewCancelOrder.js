function viewCancelOrderPanel () {
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		model:'CancelOrders',
		proxy:{
			type:'ajax',
			url:'?m=CancelOrder&a=getOrders&father_vender='+father_vender,
			reader:{
				type:'json',
				root:'orders',
				idProperty:'order_id'
			}
		}
	});
	store.load();
	var grid=new Ext.grid.Panel({
		frame:true,
		store:store,
		viewConfig:{
				stripeRows:true
			},
		autoExpandColumn:'order_id',
		// columns:[
		// 		Ext.create('Ext.grid.RowNumberer',{text:'行号',width:50}),
		// 		{header: "账单id", dataIndex: 'order_id',sortable:true},
		// 		{header: "店铺id", dataIndex: 'vender_id',sortable:true},
		// 		{header: "商品个数", dataIndex: 'ware_num'},
		// 		{header: "商品编号", dataIndex: 'ware_id'},
		// 		{header: "订单总价", dataIndex: 'order_total_price'},
		// 		{header: "订单时间", dataIndex: 'order_time',width:150},
		// 		{header: "顾客名称", dataIndex: 'customer_name'},
		// 		{header:"意见反馈",dataIndex:'others'},
		// 		{header:"操作",xtype:'actioncolumn',icon:'__ROOT__/fa.ico',handler:function(){alert();}}
		// ]
	});
	var panel=new Ext.panel.Panel({
		title:'浏览退货单',
		id:'viewCancelOrder',
		closable:true,
		tbar:getToolbar_viewCancelOrder(),
		layout:'fit',
		bodyStyle:'background-color:#ffffff;overflow-y:auto',
		listeners:{
			afterRender:function(){
				this.add(grid);
			}
		}
	});
	return panel;
}
function getToolbar_viewCancelOrder(){
	var toolbar=new Ext.toolbar.Toolbar({
		padding:'5 5 5 5'
	});
	toolbar.add(
				{text:'导出为excel',
					handler:function(btn){
						alert();
					}
				},'-'
		);
	return toolbar;
}