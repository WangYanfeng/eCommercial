function analysePurchaseOrderPanel(){
	var store=new Ext.data.JsonStore({		
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=PurchaseOrder&a=getAnalyseData'
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
				rnderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#333'
			},
			xField:'month',
			yField:'data'
		}]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'数据分析',
		id:'analysePurchaseOrder',
		closable:true,
		tbar:getToolbar_analysePurchaseOrder(),
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
function getToolbar_analysePurchaseOrder(){
	var form=new Ext.form.Panel({
		layout:'column',
		defaults:{
			labelWidth:80,
			margin:'5 0 5 10',
			autoFitError:false,
			format:'Y年m月j日'
		},
		defaultType:'datefield',
		items:[{
			id:'beginDate',
			fieldLabel:'起始时间',
			ediable:false,
			msgTarget:'side',
			dateRange:{begin:'beginDate',end:'endDate'},
			vtype:'dateRange'
		},{
			id:'endDate',
			fieldLabel:'结束时间',
			dateRange:{begin:'beginDate',end:'endDate'},
			vtype:'dateRange',
			maxValue:new Date(),
			value:new Date()
		}]
	});
	var toolbar=new Ext.toolbar.Toolbar({
		frame:false,
		items:[form,{
			xtype:'button',
			margin:'0 0 0 10',
			text:'确定',
			handler:function(){
				alert();
			}
		}]
	});
	return toolbar;
}