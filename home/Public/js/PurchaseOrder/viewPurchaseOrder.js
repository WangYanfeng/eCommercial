function viewPurchaseOrderPanel(){
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		model:'PurchaseOrders',
		proxy:{
			type:'ajax',
			url:'?m=PurchaseOrder&a=getOrders&father_vender='+father_vender,
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
		columns:[
				Ext.create('Ext.grid.RowNumberer',{text:'行号',width:50}),
				{header: "账单id", dataIndex: 'order_id',sortable:true},
				{header: "店铺id", dataIndex: 'vender_id',sortable:true},
				{header: "商品个数", dataIndex: 'ware_num'},
				{header: "商品编号", dataIndex: 'ware_id'},
				{header: "订单总价", dataIndex: 'order_total_price'},
				{header: "折扣", dataIndex: 'seller_discount'},
				{header: "支付金额", dataIndex: 'order_payment'},
				{header: "订单时间", dataIndex: 'order_time',width:150},
				{header: "供应商名称", dataIndex: 'supplier_name',width:150},
				{header: "供应商电话", dataIndex: 'supplier_phone',width:150},
				{header: "供应商地址", dataIndex: 'supplier_addr',width:200},
				{header:"操作",xtype:'actioncolumn',icon:'/home/Public/img/delete.png',handler:function(){
					if(vender_id==father_vender){
						alert("该功能正在扩展");
					}
					else{Ext.Msg.alert("易通小提示","对不起，您没有权限。");}
				}}
		]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'浏览进货单',
		id:'viewPurchaseOrder',
		closable:true,
		tbar:getToolbar_viewPurchaseOrder(),
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
function getToolbar_viewPurchaseOrder(){
	var toolbar=new Ext.toolbar.Toolbar({
		padding:'5 5 5 5'
	});
	toolbar.add(
				{text:'导出为excel',
					handler:function(btn){
						var win=exportExcelWin('purchaseorders_vender'+father_vender);
						win.show();
					}
				},'-'
		);
	return toolbar;
}