function analyseSaleOrderPanel(){
	var store=new Ext.data.JsonStore({		
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=SaleOrder&a=getAnalyseData&father_vender='+father_vender
		},
		fields:['month','data']
	});
	var chart=Ext.create('Ext.chart.Chart',{
		animate:true,
		shadow:true,
		margin:'20 20 20 10',
		store:store,
		axes:[{
			type:'Numeric',
			position:'left',
			fields:['data'],
			label:{
				renderer:Ext.util.Format.numberRenderer('0,0')
			},
			title:'每月进货金额',
			grid:true,
			minimum:0
		},{
			type:'Category',
			position:'bottom',
			fields:['month'],
			title:'月份'
		}],
		series:[{
			type:'column',
			axis:'left',
			highlight:true,
			tips:{
				trackMouse:true,
				width:140,
				height:28,
				renderer:function(storeItem,item){
					this.setTitle(storeItem.get('month')+':'+storeItem.get('data')+'元');
				}
			},
			label:{
				display:'insideEnd',
				'text-anchor':'middle',
				field:'data',
				renderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#333'
			},
			xField:'month',
			yField:'data'
		}]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'销售单数据分析',
		id:'analyseSaleOrder',
		closable:true,
		tbar:getToolbar_analyseSaleOrder(store),
		layout:'fit',
		bodyStyle:'background-color:#ffffff;overflow:auto',
		listeners:{
			afterRender:function(){
				this.add(chart);
			}
		}
	});
	return panel;
}
function getToolbar_analyseSaleOrder(store){
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
			id:'analyseSaleorder_beginDate',
			name:'beginDate',
			fieldLabel:'起始时间',
			msgTarget:'side',
			dateRange:{begin:'analyseSaleorder_beginDate',end:'analyseSaleorder_endDate'},
			vtype:'dateRange'
		},{
			id:'analyseSaleorder_endDate',
			name:'endDate',
			fieldLabel:'结束时间',
			dateRange:{begin:'analyseSaleorder_beginDate',end:'analyseSaleorder_endDate'},
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
					//Ext.
					form.submit({
						clientValidation:true,
						url:'?m=SaleOrder&a=getAnalyseData',
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