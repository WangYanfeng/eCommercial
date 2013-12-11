Ext.define('PurchaseOrders',{
	extend:'Ext.data.Model',
	fields:[
		{name:'order_id',type:'int'},
		{name:'vender_id',type:'int'},
		{name:'ware_id',type:'int'},
		{name:'ware_num',type:'int'},
		{name:'order_total_price',type:'int'},
		{name:'seller_discount',type:'int'},
		{name:'order_payment',type:'int'},
		{name:'order_time',type:'string'},
		{name:'supplier_name',type:'string'},
		{name:'supplier_phone',type:'int'},
		{name:'supplier_addr',type:'string'}
	]
});

//
Ext.apply(Ext.form.field.VTypes,{
	dateRange:function (val,field) {
		var beginDate=null,
			beginDateCmp=null,
			endDate=null,
			endDateCmp=null,
			validStatus=true;
		if(field.dateRange){
			//获取开始时间
			if(!Ext.isEmpty(field.dateRange.begin)){
				beginDateCmp=Ext.getCmp(field.dateRange.begin);
				beginDate=beginDateCmp.getValue();
			}
			//获取结束时间
			if(!Ext.isEmpty(field.dateRange.end)){
				endDateCmp=Ext.getCmp(field.dateRange.end);
				endDate=endDateCmp.getValue();
			}
		}
		//若开始或结束时间有一个为空则校验通过
		if(!Ext.isEmpty(beginDate)&&!Ext.isEmpty(endDate)){
			validStatus=beginDate<=endDate;
		}
		return validStatus;
	},
	dateRangeText:'开始日期不能大于结束日期'
});