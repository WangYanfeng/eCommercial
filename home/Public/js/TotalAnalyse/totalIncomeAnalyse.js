function totalIncomeAnalysePanel(){
	var pieModel = [
        {
            name: '入库',
            data: 10
        },
        {
            name: '销售',
            data: 10
        },
        {
            name: '退货',
            data: 10
        }
    ];
    var pieStore = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data'],
        data: pieModel
    });
	var gridStore = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data'],
        data: pieModel
    });
	var grid=Ext.create('Ext.grid.Panel', {
        store: gridStore,
        height: 100,
        width: 250,
        columns: [
            {
                text   : '类型',
                dataIndex: 'name'
            },
            {
                text   : '金额',
                dataIndex: 'data'
            }
        ]
    });
	var pieChart=Ext.create('Ext.chart.Chart', {
        width: 100,
        height: 100,
        animate: false,
        store: pieStore,
        shadow: false,
        insetPadding: 0,
        series: [{
            type: 'pie',
            field: 'data',
            showInLegend: false,
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true
            }
        }]
    });
	var chartStore=new Ext.data.JsonStore({		
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=TotalAnalyse&a=getIncomeAnalyseData&father_vender='+father_vender
		},
		fields:['month','data']
	});
	var chart=Ext.create('Ext.chart.Chart',{
		animate:true,
		shadow:true,
		margin:'20 60 20 10',
		store:chartStore,
		axes:[{
			type:'Numeric',
			position:'left',
			fields:['data'],
			label:{
				renderer:Ext.util.Format.numberRenderer('0,0')
			},
			title:'每月利润额',
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            },
			//minimum:0
		},{
			type:'Category',
			position:'bottom',
			fields:['month'],
			title:'月份'
		}],
		series:[{
			type:'line',
			axis:'left',
			highlight:true,
			//gutter:80,
			tips:{
				trackMouse:true,
				width:350,
				height:140,
				layout:'fit',
				items:{
					xtype:'container',
					layout:'hbox',
					items:[pieChart,grid]
				},
				renderer:function(storeItem,item){
					this.setTitle(storeItem.get('month')+'份收益:'+storeItem.get('data')+'元');
					var month=item.value[0];
					Ext.Ajax.request({
		                url:'?m=TotalAnalyse&a=getIncomeTipData',
		                method: 'post',
		                params:{
		                	month:month,
		                	father_vender:father_vender,
		                	beginDate:Ext.getCmp('totalIncomeAnalyse_beginDate').getValue(),
		                	endDate:Ext.getCmp('totalIncomeAnalyse_endDate').getValue()
		                },
		                success: function (response, options) {
		                	var data=response.responseText;
		                	var data=Ext.JSON.decode(data);
		                	data = [{
                                name: '销售',
                                data: data["销售"]
                            }, {
                                name: '入库',
                                data:data["入库"]
                            }, {
                                name: '退货',
                                data:data["退货"]
                            }];
                            pieStore.loadData(data);
                        	gridStore.loadData(data);
		                },
		                failure: function () {
		                    alert('数据加载失败！');
		                }
		            });
				}
			},
			xField:'month',
			yField:['data']
		}]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'月收益分析',
		id:'totalIncomeAnalyse',		
		closable:true,		
		tbar:getToolbar_totalIncomeAnalyse(chartStore),
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
function getToolbar_totalIncomeAnalyse(store){
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
			id:'totalIncomeAnalyse_beginDate',
			name:'beginDate',
			fieldLabel:'起始时间',
			msgTarget:'side',
			dateRange:{begin:'totalIncomeAnalyse_beginDate',end:'totalIncomeAnalyse_endDate'},
			vtype:'dateRange'
		},{
			id:'totalIncomeAnalyse_endDate',
			name:'endDate',
			fieldLabel:'结束时间',
			dateRange:{begin:'totalIncomeAnalyse_beginDate',end:'totalIncomeAnalyse_endDate'},
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
						url:'?m=TotalAnalyse&a=getIncomeAnalyseData',
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