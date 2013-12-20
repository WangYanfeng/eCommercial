function newSaleOrderPanel(){
	var panel=Ext.create('Ext.panel.Panel',{
		title:'新建出库单',
		id:'newSaleOrder',
		closable:true,
		tbar:getToolbar_newSaleOrder(),
		bodyStyle:'background-color:#ffffff;overflow-y:auto',
		listeners:{
			afterRender:function(){
					var formsPanel=getForm_newSaleOrder(1);
					this.add(formsPanel);
			}
		}
	});
	return panel;
}
function getToolbar_newSaleOrder(){
	var toolbar=new Ext.toolbar.Toolbar({	padding:'5 5 5 5'});
	toolbar.add(
				{text:'从excel文件导入',
					handler:function(btn){
						var importWin=importExcelWin('saleorders_vender'+father_vender);
						importWin.show();
					}
				},'-'
		);
	var fileMenu=new Ext.menu.Menu({
		shadow:'frame',
		plain:true,
		bodyStyle:'padding:10px;',
		items:[{
				xtype:'numberfield',
				id:'saleorderNum',
				fieldLabel:'输入个数',
				labelWidth:60,
				minValue:0,
				maxValue:10,
				value:2
			},{
				xtype:'button',
				text:'确定',
				handler:function(){
					var n=Ext.getCmp('saleorderNum').getValue();
					var formsPanel=getForm_newSaleOrder(n);
					var panel=Ext.getCmp('newSaleOrder');
					panel.removeAll();
					panel.add(formsPanel);
				}
			}]
	});
	toolbar.add({text:'新建多个单据',menu:fileMenu});
	return toolbar;
}
function getForm_newSaleOrder(n){
	var formsPanel=Ext.create('Ext.panel.Panel',{
		layout:'column',
		html:'<div id="newSaleOrdertips" class="errorTip"></div>',
		bodyStyle:'padding-top:24px;',
		listeners:{
			afterRender:function(){
				for(var i=0;i<n;i++){
					var form=new Ext.form.Panel({
						title:'出库单'+(i+1),
						columnWidth:.5,
						minWidth:350,
						bodyStyle:'padding-top:10px;padding-left:40px;',
						defaults:{
							labelSeparator:':',
							msgTarget:'qtip',
							labelAlign:'left',
							labelWidth:80,
							height:25,
							allowBlank:false,
							size:33,
							margin:'10 0 0 0',
							blankText:'不允许为空'
						},
						defaultType:'textfield',
						items:[{
								fieldLabel:'店铺id号',
								name:'vender_id',
								readOnly:'true',
								value:vender_id,
								allowBlank:false
							},{
								fieldLabel:'总店id号',
								name:'father_vender',
								readOnly:'true',
								value:father_vender,
								allowBlank:false
							},{
								fieldLabel:'商品名称',
								allowBlank:false,
								name:''+i,//通过id传参数i。以得到saleorderware_id_fileld i
								listeners:{
									blur:function(){
										//失去激活事件触发向后台异步式取商品的id号
										var ware_name=this.getValue();
										var i=this.getName();//获取外部的循环参数i
										Ext.Ajax.request({
											url:'?m=PurchaseOrder&a=getWareId',
											method:'POST',
											params:{
												vender_id:father_vender,
												ware_name:ware_name
											},
											success:function(response){
												var ware_id_field=Ext.getCmp('saleorder_ware_id_field'+i);
												ware_id_field.setValue(response.responseText);
											}
										});
									}
								}
							},{
								fieldLabel:'商品编号',
								name:'ware_id',
								id:'saleorder_ware_id_field'+i,							
								readOnly:'true',
								xtype:'numberfield',
								hideTrigger:true,
								allowDecimals:false,
								blankText:'请重新输入商品名称，或者在商品档案中入库新商品'
							},{
								fieldLabel:'商品个数',
								xtype:'numberfield',
								minValue:'1',
								size:30,
								name:'ware_num',
								allowDecimals:false
							},{
								fieldLabel:'订单总价',
								xtype:'numberfield',
								minValue:'1',
								size:30,
								name:'order_total_price'
							},{
								fieldLabel:'折扣',
								name:'seller_discount',
								size:30,
								minValue:'0',
								xtype:'numberfield'
							},{
								fieldLabel:'支付金额',
								xtype:'numberfield',
								size:30,
								minValue:'1',
								name:'order_payment'
							},{
								fieldLabel:'顾客名称',
								allowBlank:true,							
								name:'customer_name'
							},{
								fieldLabel:'顾客电话',
								name:'customer_phone',
								regex:/^[0-9]*$/,
								invalidText:'请输入数字',
								allowBlank:true
							},{
								fieldLabel:'顾客联系地址',
								name:'customer_addr',
								xtype:'textarea',
								height:60,
								width:320,
								grow:true,
								allowBlank:true
							},{
								fieldLabel:'销售员',
								name:'saleperson',
								allowBlank:true
							},{
								xtype:'button',
								text:'提交单据',
								width:60,
								formBind: true, //only enabled once the form is valid
				        disabled: true,
								margin:'10 0 10 30',
				        handler: function() {
				        	Ext.core.DomHelper.overwrite(Ext.get('newSaleOrdertips'),"请稍等！");
				          var form = this.up('form').getForm();
				          if (form.isValid()) {
				            form.submit({
				            		clientValidation:true,
				            		url:'?m=SaleOrder&a=newOrder',
				            		method:'POST',
				                success: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newSaleOrdertips'),"单据提交成功！");
				                	setTimeout(function(){Ext.core.DomHelper.overwrite(Ext.get('newSaleOrdertips')," ");form.reset();},3000);
				                },
				                failure: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newSaleOrdertips'),"单据提交失败，请重试！");
				                }
				            });
				          }
				        }
							},{
								xtype:'button',
								text:'重置',
								width:60,
								margin:'10 0 10 30',
								handler:function(){
									Ext.core.DomHelper.overwrite(Ext.get('newPurchaseOrdertips')," ");
									this.up('form').getForm().reset();
								}
							}]
					});
					this.add(form);
				}
			}
		}
	});
	return formsPanel;
}