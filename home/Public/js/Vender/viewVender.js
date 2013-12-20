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
				{header: "店铺名称", dataIndex: 'vender_name',width:150},
				{header: "店铺地址", dataIndex: 'vender_addr',width:200},
				{header: "店铺联系电话", dataIndex: 'vender_phone',width:150},
				{header: "创建时间", dataIndex: 'in_time',width:150},
				{header:"操作",xtype:'actioncolumn',icon:'/home/Public/img/delete.png',
				 handler:function(){
					if(vender_id==father_vender){
						alert("该功能正在扩展");
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