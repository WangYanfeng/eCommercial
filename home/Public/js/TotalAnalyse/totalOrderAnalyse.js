function totalOrderAnalysePanel(){
	var store=new Ext.data.JsonStore({		
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=TotalAnalyse&a=getTotalAnalyseData&father_vender='+father_vender
		},
		fields:['month','销售','入库','退货']//'saleOrder','cancelOrder'
	});
	var chart=Ext.create('Ext.chart.Chart',{
		animate:true,
		shadow:true,
		margin:'20 20 20 10',
		store:store,
		legend: {
            position: 'right'
        },
		axes:[{
			type:'Numeric',
			position:'left',
			fields:['销售','入库','退货'],
			label:{
				renderer:Ext.util.Format.numberRenderer('0,0')
			},
			title:'每月总金额',
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            },
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
					this.setTitle(item.value[0]+':'+item.value['1']+'元');
				}
			},
			label:{
				display:'insideEnd',
				'text-anchor':'middle',
				field:'销售',
				renderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#fff000'
			},
			xField:'month',
			yField:['销售','入库','退货']
		}]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'综合数据分析',
		id:'totalOrderAnalyse',		
		closable:true,		
		tbar:getToolbar_totalOrderAnalyse(store),
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
function getToolbar_totalOrderAnalyse(store){
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
			id:'totalOrderAnalyse_beginDate',
			name:'beginDate',
			fieldLabel:'起始时间',
			msgTarget:'side',
			dateRange:{begin:'totalOrderAnalyse_beginDate',end:'totalOrderAnalyse_endDate'},
			vtype:'dateRange'
		},{
			id:'totalOrderAnalyse_endDate',
			name:'endDate',
			fieldLabel:'结束时间',
			dateRange:{begin:'totalOrderAnalyse_beginDate',end:'totalOrderAnalyse_endDate'},
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
						url:'?m=TotalAnalyse&a=getTotalAnalyseData',
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