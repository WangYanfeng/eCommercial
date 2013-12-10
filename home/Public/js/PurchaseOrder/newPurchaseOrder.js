function newPurchaseOrderPanel(){
	var panel=new Ext.panel.Panel({
		title:'新建进货单',
		id:'newPurchaseOrder',
		closable:true,
		tbar:getToolbar_newPurchaseOrder(),
		bodyStyle:'background-color:#ffffff;overflow-y:auto',
		listeners:{
			afterRender:function(){
					var formsPanel=getForm_newPurchaseOrder(1);
					this.add(formsPanel);
			}
		}
	});
	return panel;
}
function getToolbar_newPurchaseOrder(){
	var toolbar=new Ext.toolbar.Toolbar({});
	toolbar.add(
				{text:'从excel文件导入',
					handler:function(btn){
						alert();
					}
				},'-'
		);
	var fileMenu=new Ext.menu.Menu({
		shadow:'frame',
		plain:true,
		width:150,
		bodyStyle:'padding:10px;',
		items:[{
				xtype:'numberfield',
				id:'orderNum',
				fieldLabel:'输入个数',
				labelWidth:60,
				maxWidth:110,
				minValue:0,
				maxValue:10,
				value:2
			},{
				xtype:'button',
				fieldLabel:' a',
				labelWidth:20,
				text:'确定',
				handler:function(){
					var n=Ext.getCmp('orderNum').getValue();
					var formsPanel=getForm_newPurchaseOrder(n);
					var panel=Ext.getCmp('newPurchaseOrder');
					panel.removeAll();
					panel.add(formsPanel);
				}
			}]
	});
	toolbar.add({text:'新建多个单据',menu:fileMenu});
	return toolbar;
}
function getForm_newPurchaseOrder(n){
	var formsPanel=Ext.create('Ext.panel.Panel',{
		layout:'column',
		listeners:{
			afterRender:function(){
				for(var i=0;i<n;i++){
					var form=new Ext.form.Panel({
						title:'进货单'+(i+1),
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
								fieldLabel:'商品名称',
								allowBlank:false
							},{
								fieldLabel:'商品编号',
								name:'ware_id',
								xtype:'numberfield',
								hideTrigger:true,
								allowDecimals:false
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
								minValue:'1',
								xtype:'numberfield'
							},{
								fieldLabel:'支付金额',
								xtype:'numberfield',
								size:30,
								minValue:'1',
								name:'order_payment'
							},{
								fieldLabel:'供应商名称',
								allowBlank:true,							
								name:'supplier_name'
							},{
								fieldLabel:'供应商电话',
								name:'supplier_phone',
								regex:/^[0-9]*$/,
								invalidText:'请输入数字',
								allowBlank:true
							},{
								fieldLabel:'供应商地址',
								name:'supplier_addr',
								xtype:'textarea',
								height:60,
								width:320,
								grow:true,
								allowBlank:true
							},{
								xtype:'button',
								text:'提交单据',
								width:60,
								formBind: true, //only enabled once the form is valid
				        disabled: true,
								margin:'10 0 10 30',
				        handler: function() {
				          var form = this.up('form').getForm();
				          if (form.isValid()) {
				            form.submit({
				            		clientValidation:true,
				            		url:'__APP__/',
				            		method:'POST',
				                success: function(form, action) {
				                   Ext.Msg.alert('Success','单据提交成功！');
				                },
				                failure: function(form, action) {
				                    Ext.Msg.alert('Failed', '单据提交失败，请重试！');
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

