function newVenderPanel(){
	var panel=new Ext.panel.Panel({
		title:'创建分店',
		id:'newVender',
		closable:true,
		tbar:getToolbar_newVender(),
		bodyStyle:'background-color:#ffffff;overflow-y:auto',
		listeners:{
			afterRender:function(){
					var formsPanel=getForm_newVender(1);
					this.add(formsPanel);
			}
		}
	});
	return panel;
}
function getToolbar_newVender(){
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
				id:'venderNum',
				fieldLabel:'输入个数',
				labelWidth:60,
				minValue:0,
				maxValue:10,
				value:2
			},{
				xtype:'button',
				text:'确定',
				handler:function(){
					var n=Ext.getCmp('venderNum').getValue();
					var formsPanel=getForm_newVender(n);
					var panel=Ext.getCmp('newVender');
					panel.removeAll();
					panel.add(formsPanel);
				}
			}]
	});
	toolbar.add({text:'创建多个分店',menu:fileMenu});
	return toolbar;
}
function getForm_newVender(n){
	var formsPanel=Ext.create('Ext.panel.Panel',{
		layout:'column',
		html:'<div id="newVendertips" style="height:20px;color:red;"></div>',
		listeners:{
			afterRender:function(){
				for(var i=0;i<n;i++){
					var form=new Ext.form.Panel({
						title:'创建分店'+(i+1),
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
								fieldLabel:'总店id号',
								name:'father_vender',
								readOnly:'true',
								value:father_vender,
								allowBlank:false
							},{
								fieldLabel:'分店名称',
								name:'vender_name'
							},{
								fieldLabel:'分店密码',
								name:'vender_pwd',
								inputType:'password',
								fieldLabel:'密码',
								minLength:6,
								minLengthText:'密码长度至少6位',
								id:'branch_password1'
							},{
								fieldLabel:'确认密码',
								inputType:'password',
								vtype:"password",//自定义的验证类型
				        vtypeText:"两次密码不一致！",
				        confirmTo:'branch_password1'		
							},{
								fieldLabel:'分店地址',
								allowBlank:true,							
								name:'vender_addr'
							},{
								fieldLabel:'分店电话',
								name:'vender_phone',
								minValue:'0',
								hideTrigger:true,
								xtype:'numberfield'
							},{
								xtype:'button',
								text:'创建分店',
								width:60,
								formBind: true,
				        disabled: true,
								margin:'10 0 10 30',
				        handler: function() {
				        	Ext.core.DomHelper.overwrite(Ext.get('newVendertips'),"请稍等！");
				          var form = this.up('form').getForm();
				          if (form.isValid()) {
				            form.submit({
				            		clientValidation:true,
				            		url:'?m=Vender&a=newVender',
				            		method:'POST',
				                success: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newVendertips'),"创建成功！");
				                	setTimeout(function(){Ext.core.DomHelper.overwrite(Ext.get('newVendertips')," ");form.reset();},3000);
				                },
				                failure: function(form, action) {
				                	Ext.core.DomHelper.overwrite(Ext.get('newVendertips'),"分店名称已存在，创建失败！");
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
									Ext.core.DomHelper.overwrite(Ext.get('newVendertips')," ");
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