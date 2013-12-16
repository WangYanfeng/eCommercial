function totalOrderAnalysePanel(){
	var store=new Ext.data.JsonStore({		
		autoDestroy:true,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'?m=TotalAnalyse&a=getTotalOrder&father_vender='+father_vender
		},
		fields:['month','purchaseOrder','saleOrder','cancelOrder']
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
			fields:['saleOrder','purchaseOrder','cancelOrder'],
			title:'每月进货金额',
			minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
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
					this.setTitle(storeItem.get('month')+':'+storeItem.get('saleOrder')+'元');
				}
			},
			label:{
				display:'insideEnd',
				'text-anchor':'middle',
				field:'saleOrder',
				renderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#333'
			},
			xField:'month',
			yField:'saleOrder'
		},{
			type:'column',
			axis:'left',
			highlight:true,
			tips:{
				trackMouse:true,
				width:140,
				height:28,
				renderer:function(storeItem,item){
					this.setTitle(storeItem.get('month')+':'+storeItem.get('purchaseOrder')+'元');
				}
			},
			label:{
				display:'insideEnd',
				'text-anchor':'middle',
				field:'purchaseOrder',
				renderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#c20024'
			},
			xField:'month',
			yField:'purchaseOrder'
		},{
			type:'column',
			axis:'left',
			highlight:true,
			tips:{
				trackMouse:true,
				width:140,
				height:28,
				renderer:function(storeItem,item){
					this.setTitle(storeItem.get('month')+':'+storeItem.get('cancelOrder')+'元');
				}
			},
			label:{
				display:'insideEnd',
				'text-anchor':'middle',
				field:'cancelOrder',
				renderer:Ext.util.Format.numberRenderer('0'),
				orientation:'vertical',
				color:'#c20024'
			},
			xField:'month',
			yField:'cancelOrder'
		}]
	});
	var panel=Ext.create('Ext.panel.Panel',{
		title:'综合数据分析',
		id:'totalOrderAnalyse',		
		closable:true,
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