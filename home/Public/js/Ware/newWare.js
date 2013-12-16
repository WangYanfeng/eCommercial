function newWarePanel() {
	var panel=new Ext.panel.Panel({
		title:'入库商品',
		id:'newWare',
		closable:true,
		tbar:getToolbar_newWare(),
		bodyStyle:'background-color:#ffffff;overflow-y:auto',
		listeners:{
			afterRender:function(){
					var formsPanel=getForm_newWare(1);
					this.add(formsPanel);
			}
		}
	});
	return panel;
}
function getToolbar_newWare(){
	var toolbar=new Ext.toolbar.Toolbar({
		padding:'5 5 5 5'});
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
		bodyStyle:'padding:10px;',
		items:[{
				xtype:'numberfield',
				id:'wareNum',
				fieldLabel:'输入个数',
				labelWidth:60,
				minValue:0,
				maxValue:10,
				value:2
			},{
				xtype:'button',
				text:'确定',
				handler:function(){
					var n=Ext.getCmp('wareNum').getValue();
					var formsPanel=getForm_newWare(n);
					var panel=Ext.getCmp('newWare');
					panel.removeAll();
					panel.add(formsPanel);
				}
			}]
	});
	toolbar.add({text:'入库多个商品',menu:fileMenu});
	return toolbar;
}
function getForm_newWare(n){
	var formsPanel=Ext.create('Ext.panel.Panel',{
		layout:'column',
		html:'<div id="newWaretips" class="errorTip"></div>',
		bodyStyle:'padding-top:24px;',
		listeners:{
			afterRender:function(){
				for(var i=0;i<n;i++){
					var form=new Ext.form.Panel({
						title:'商品清单'+(i+1),
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
								name:'ware_name'
							},{
								fieldLabel:'商品种类',
								name:'category'
							},{
								fieldLabel:'品牌名称',
								name:'brand_name'
							},{
								fieldLabel:'进价',
								name:'cost_price',
								size:30,
								minValue:'0',
								xtype:'numberfield'
							},{
								fieldLabel:'额定售价',
								name:'market_price',
								size:30,
								minValue:'0',
								xtype:'numberfield'
							},{
								fieldLabel:'生产商名称',
								allowBlank:true,							
								name:'productor'
							},{
								xtype:'button',
								text:'提交商品',
								width:60,
								formBind: true, //only enabled once the form is valid
				        disabled: true,
								margin:'10 0 10 30',
				        handler: function() {
				        	Ext.core.DomHelper.overwrite(Ext.get('newWaretips'),"请稍等！");
				          var form = this.up('form').getForm();
				          if (form.isValid()) {
				            form.submit({
				            		clientValidation:true,
				            		url:'?m=Ware&a=newWare',
				            		method:'POST',
				                success: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newWaretips'),"单据提交成功！");
				                	setTimeout(function(){Ext.core.DomHelper.overwrite(Ext.get('newWaretips')," ");form.reset();},3000);
				                },
				                failure: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newWaretips'),"单据提交失败，请重试！");
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
									Ext.core.DomHelper.overwrite(Ext.get('newWaretips')," ");
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