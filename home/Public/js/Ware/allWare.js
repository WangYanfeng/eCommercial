function allWarePanel() {
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		model:'WaresStock',
		//sorters: ['ware_id','name'],
        groupField: 'ware_id',
		proxy:{
			type:'ajax',
			url:'?m=Ware&a=getAllWare&father_vender='+father_vender,
			reader:{
				type:'json',
				root:'wares'
			}
		}
	});
	store.load();

	var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: '商品: {ware_id} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
    });

	var grid=new Ext.grid.Panel({
		frame:true,
		store:store,
        collapsible: true,
        features: [groupingFeature],
		viewConfig:{
				stripeRows:true
			},
		autoExpandColumn:'ware_id',
		columns:[
				Ext.create('Ext.grid.RowNumberer',{text:'行号',width:50}),
				{header: "商品编号", dataIndex: 'ware_id',sortable:true},
				{header: "商品名称", dataIndex: 'ware_name',width:150},
				{header: "品牌名称", dataIndex: 'brand_name',width:150},
				{header: "库存量", dataIndex: 'ware_num',width:150},
				{header: "所属店铺", dataIndex: 'vender_name',width:150},
				{header: "店铺地址", dataIndex: 'vender_addr',width:200},
				{header: "联系电话", dataIndex: 'vender_phone',width:150}
		],
		fbar  : ['->', {
            text:'Clear Grouping',
            iconCls: 'icon-clear-group',
            handler : function(){
                groupingFeature.disable();
            }
        }]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'库存商品',
		id:'allWare',
		closable:true,
		tbar:getToolbar_allWare(),
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
function getToolbar_allWare(){
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