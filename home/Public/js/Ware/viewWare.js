function viewWarePanel () {
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		model:'Wares',
		proxy:{
			type:'ajax',
			url:'?m=Ware&a=getWare&father_vender='+father_vender,
			reader:{
				type:'json',
				root:'wares',
				idProperty:'ware_id'
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
		autoExpandColumn:'ware_id',
		columns:[
				Ext.create('Ext.grid.RowNumberer',{text:'行号',width:50}),
				{header: "商品编号", dataIndex: 'ware_id',sortable:true},
				{header: "商品名称", dataIndex: 'ware_name'},
				{header: "商品分类", dataIndex: 'category'},
				{header: "品牌名称", dataIndex: 'brand_name'},
				{header: "进价", dataIndex: 'cost_price'},
				{header: "额定售价", dataIndex: 'market_price'},
				{header: "生产商名称", dataIndex: 'productor'},
				{header: "入库时间", dataIndex: 'in_time',width:150},
				{header:"操作",xtype:'actioncolumn',icon:'/home/Public/img/delete.png',handler:function(){alert();}}
		]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'浏览商品',
		id:'viewWare',
		closable:true,
		tbar:getToolbar_viewWare(),
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
function getToolbar_viewWare(){
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