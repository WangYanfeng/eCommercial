function getMenuPanel(){
	var centerTabPanel=Ext.getCmp('centerTabPanel');
	var menuPanel=Ext.create('Ext.panel.Panel',{
		layout:'accordion',
		frame:true,
		width:150,
		items:[{
			title:'商品入库',
			iconCls:'mainMenuIcon_newPurchaseOrder',
			items:[{
					xtype:'button',
					text:'新建入库单',
					cls:'menuButton',
					iconCls:'newOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('newPurchaseOrder');
							if(form==null){
								form=newPurchaseOrderPanel();							
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'浏览入库单',
					cls:'menuButton',
					iconCls:'viewOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('viewPurchaseOrder');
							if(form==null){
								form=viewPurchaseOrderPanel();							
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},
			// {
			// 		xtype:'button',
			// 		text:'入库明细',
			// 		cls:'menuButton',
			// 		iconCls:'detailOrderButtonImg'
			// },
			{
					xtype:'button',
					text:'数据分析',
					cls:'menuButton',
					iconCls:'analyseOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('analysePurchaseOrder');
							if(form==null){
								form=analysePurchaseOrderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}],
			cls:'mainMenu'
		},{
			title:'商品出库',
			iconCls:'mainMenuIcon_newSaleOrder',
			items:[{
				xtype:'button',
				text:'新建出库单',
				cls:'menuButton',
				iconCls:'newOrderButtonImg',
				listeners:{
					click:function(){
						var form=Ext.getCmp('newSaleOrder');
						if(form==null){
							form=newSaleOrderPanel();
							centerTabPanel.add(form);
						}
						centerTabPanel.setActiveTab(form);
					}
				}
			},{
					xtype:'button',
					text:'浏览出库单',
					cls:'menuButton',
					iconCls:'viewOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('viewSaleOrder');
							if(form==null){
								form=viewSaleOrderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'数据分析',
					cls:'menuButton',
					iconCls:'analyseOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('analyseSaleOrder');
							if(form==null){
								form=analyseSaleOrderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}],
			cls:'mainMenu'
		},{
			title:'销售退货',
			iconCls:'mainMenuIcon_newCancelOrder',
			items:[{
					xtype:'button',
					text:'新建退货单',
					cls:'menuButton',
					iconCls:'newOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('newCancelOrder');
							if(form==null){
								form=newCancelOrderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'浏览退货单',
					cls:'menuButton',
					iconCls:'viewOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('viewCancelOrder');
							if(form==null){
								form=viewCancelOrderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}],
			cls:'mainMenu'
		},{
			title:'综合处理中心',
			iconCls:'mainMenuIcon_dataAnalyse',
			items:[{
					xtype:'button',
					text:'综合分析',
					cls:'menuButton',
					iconCls:'allAnalyseButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('totalOrderAnalyse');
							if(form==null){
								form=totalOrderAnalysePanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'利润分析',
					cls:'menuButton',
					iconCls:'incomeButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('totalIncomeAnalyse');
							if(form==null){
								form=totalIncomeAnalysePanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}
			// ,{
			// 		xtype:'button',
			// 		text:'类型分布',
			// 		cls:'menuButton',
			// 		iconCls:'saleGridButtonImg'
			// }
			],
			cls:'mainMenu'
		},{
			title:'商品仓库',
			iconCls:'mainMenuIcon_wareInfo',
			items:[{
					xtype:'button',
					text:'新建商品清单',
					cls:'menuButton',
					iconCls:'newOrderButtonImg',
					listeners:{
						click:function(){
							if(vender_id==father_vender){
								var form=Ext.getCmp('newWare');
								if(form==null){
									form=newWarePanel();
									centerTabPanel.add(form);
								}
								centerTabPanel.setActiveTab(form);
							}
							else{Ext.Msg.alert("易通小提示","对不起，您没有创建分店的权限。");}						
						}
					}
			},{
					xtype:'button',
					text:'浏览商品清单',
					cls:'menuButton',
					iconCls:'viewOrderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('viewWare');
							if (form==null) {
								form=viewWarePanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'商品库存信息',
					cls:'menuButton',
					iconCls:'allWareButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('allWare');
							if (form==null) {
								form=allWarePanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}],
			cls:'mainMenu'
		},{
			title:'分店管理',
			iconCls:'mainMenuIcon_venderInfo',
			items:[{
					xtype:'button',
					text:'创建分店',
					cls:'menuButton',
					iconCls:'newVenderButtonImg',
					listeners:{
						click:function(){
							if(vender_id==father_vender){
								var form=Ext.getCmp('newVender');
								if(form==null){
									form=newVenderPanel();
									centerTabPanel.add(form);
								}
								centerTabPanel.setActiveTab(form);
							}
							else{Ext.Msg.alert("易通小提示","对不起，您没有创建分店的权限。");}						
						}
					}
			},{
					xtype:'button',
					text:'浏览分店',
					cls:'menuButton',
					iconCls:'viewVenderButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('viewVender');
							if (form==null) {
								form=viewVenderPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'分店销售排行',
					cls:'menuButton',
					iconCls:'venderListButtonImg',
					listeners:{
						click:function(){
							var form=Ext.getCmp('venderRank');
							if (form==null) {
								form=venderRankPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}],
			cls:'mainMenu'
		},{
			title:'关于我们',
			items:[{
					xtype:'button',
					text:'系统简介',
					cls:'menuButton',
					listeners:{
						click:function(){
							var form=Ext.getCmp('systemIntroduction');
							if (form==null) {
								form=systemIntroductionPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'开发团队',
					cls:'menuButton',
					listeners:{
						click:function(){
							var form=Ext.getCmp('ourTeam');
							if (form==null){
								form=ourTeamPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			},{
					xtype:'button',
					text:'联系我们',
					cls:'menuButton',
					listeners:{
						click:function(){
							var form=Ext.getCmp('contactUs');
							if (form==null) {
								form=contactUsPanel();
								centerTabPanel.add(form);
							}
							centerTabPanel.setActiveTab(form);
						}
					}
			}
			// ,{
			// 		xtype:'button',
			// 		text:'捐赠我们',
			// 		cls:'menuButton',
			// 		listeners:{
			// 			click:function(){
			// 				var form=Ext.getCmp('donateUs');
			// 				if (form==null) {
			// 					form=donateUsPanel();
			// 					centerTabPanel.add(form);
			// 				}
			// 				centerTabPanel.setActiveTab(form);
			// 			}
			// 		}
			// }
			],
			cls:'mainMenu'
		}]
	});
	return menuPanel;
}