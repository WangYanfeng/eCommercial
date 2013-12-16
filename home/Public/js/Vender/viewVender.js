function viewVenderPanel() {
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		model:'Venders',
		proxy:{
			type:'ajax',
			url:'?m=Vender&a=getVender&father_vender='+father_vender,
			reader:{
				type:'json',
				root:'venders',
				idProperty:'vender_id'
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
				{header: "店铺编号", dataIndex: 'vender_id',sortable:true},
				{header: "店铺名称", dataIndex: 'vender_name'},
				{header: "店铺地址", dataIndex: 'vender_addr'},
				{header: "店铺联系电话", dataIndex: 'vender_phone'},
				{header: "创建时间", dataIndex: 'in_time',width:150},
				{header:"操作",xtype:'actioncolumn',icon:'/ecommercial/home/Public/img/delete.png',
				 handler:function(){
					if(vender_id==father_vender){
						alert("功能扩展");
					}
					else{Ext.Msg.alert("易通小提示","对不起，您没有创建分店的权限。");}
				 }
				}
		]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'浏览分店',
		id:'viewVender',
		closable:true,
		tbar:getToolbar_viewVender(),
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
function getToolbar_viewVender(){
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