function exportExcelWin(dbname){
	var form=new Ext.form.Panel({
			standardSubmit:true,
			bodyStyle:'padding-top:30px;padding-left:15px;',
			items:[{
				xtype:'textfield',
				size:30,
				value:dbname,
				name:'dbname',
				hidden:true,
				fieldLabel:'数据库'
			},{
				xtype:'button',
				text:'导出',
				width:60,
				formBind: true, //only enabled once the form is valid
        		disabled: true,
				cls:'button',
		        handler: function() {
		          var form = this.up('form').getForm();
		          if (form.isValid()) {
		            form.submit({
		            		clientValidation:true,
		            		url:'?m=ToExcel&a=exportExcel',
		            		method:'POST'
		            });
		          }
		        }
			}]
		});
	var exportWin=Ext.create('Ext.window.Window',{
		title:'导出Excel',
		height: 180,
    	width: 380,
    	layout:'fit',
    	listeners:{
    		afterRender:function(){
    			this.add(form);
    		}
    	}
    });
	return exportWin;
}