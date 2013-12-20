function venderRankPanel() {
	var store=new Ext.data.JsonStore({
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=Vender&a=getVenderRank&father_vender='+father_vender
		},
		fields:['vender_name','sale_total','vender_phone','vender_addr']
	});
	store.load();
	var grid=new Ext.grid.Panel({
		frame:true,
		store:store,
		viewConfig:{
				stripeRows:true
			},
		autoExpandColumn:'vende_name',
		columns:[
				Ext.create('Ext.grid.RowNumberer',{text:'店铺排行',width:80}),
				{header: "店铺名称", dataIndex: 'vender_name',width:200},
				{header: "销售量", dataIndex: 'sale_total',width:200},
				{header: "店铺地址", dataIndex: 'vender_addr',width:200},
				{header: "联系电话", dataIndex: 'vender_phone',width:150}
		]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'销售排行榜',
		id:'venderRank',
		closable:true,
		tbar:getToolbar_venderList(store),
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
function getToolbar_venderList(store){
	var form=new Ext.form.Panel({
		layout:'column',
		defaults:{
			labelWidth:80,
			margin:'5 0 5 10',
			autoFitError:false,
			allowBlank:false,
			blankText:'不允许为空',
			format:'Y-m-j'
		},
		defaultType:'datefield',
		items:[{
			xtype:'textfield',
			fieldLabel:'总店id号',
			name:'father_vender',
			readOnly:'true',
			value:father_vender,
			hidden:true
		},{
			id:'venderRank_beginDate',
			name:'beginDate',
			fieldLabel:'起始时间',
			msgTarget:'side',
			dateRange:{begin:'venderRank_beginDate',end:'venderRank_endDate'},
			vtype:'dateRange',
			value:'2013-01-01'
		},{
			id:'venderRank_endDate',
			name:'endDate',
			fieldLabel:'结束时间',
			dateRange:{begin:'venderRank_beginDate',end:'venderRank_endDate'},
			vtype:'dateRange',
			maxValue:new Date(),
			value:new Date()
		},{
			xtype:'button',
			text:'确定',
			formBind:true,
			display:true,			
			margin:'5 20 0 30',
			handler:function(){
				var form = this.up('form').getForm();
				if(form.isValid()){
					form.submit({
						clientValidation:true,
						url:'?m=Vender&a=getVenderRank',
						method:'POST',
						success:function(form, action) {
							store.loadData(action.result.datas);
						},
						failure:function(form, action) {
							alert('数据加载失败');
						}
					});
				}				
			}
		}]
	});
	var toolbar=new Ext.toolbar.Toolbar({
		frame:false,
		items:[form]
	});
	return toolbar;
}