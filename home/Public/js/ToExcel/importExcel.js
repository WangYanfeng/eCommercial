function importExcelWin(dbname){
	var form=new Ext.form.Panel({
			height: 120,
	    	width: 365,
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
				xtype:'filefield',
				size:30,
				name:'file',
				allowBlank:false,
				fieldLabel:'选择excel文件'
			},{
				xtype:'button',
				text:'导入',
				width:60,
				formBind: true, //only enabled once the form is valid
        		disabled: true,
				cls:'button',
		        handler: function() {
		          var form = this.up('form').getForm();
		          if (form.isValid()) {
		            form.submit({
		            		clientValidation:true,
		            		url:'?m=ToExcel&a=importExcel',
		            		method:'POST'
		            });
		          }
		        }
			}]
		});
	var importWin=Ext.create('Ext.window.Window',{
		title:'导入Excel',
		height: 180,
    	width: 380,
    	html:'<div>excel表的各个列和数据库需对应，如需帮助请联系管理员</div>',
    	listeners:{
    		afterRender:function(){
    			this.add(form);
    		}
    	}
    });
	return importWin;
}