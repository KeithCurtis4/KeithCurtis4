import Config from '../common/config'

const Service = {
   buildSmartObjectURL: function (url, query, format) {
      const endPointURL = Config.apiSmartObject.concat(url, '?', query, '&$format=', format);
      return endPointURL
   },
   buildSmartObjectExecuteURL: function (url, query) {
      const endPointURL = Config.apiSmartObject.concat(url, '?', query);
      return endPointURL
   },
   buildK2IntegrationURL: function (url, query) {
      const endPointURL = Config.apiK2Integration.concat(url, '?', query);
      return endPointURL
   },
   decodeDataCustom: function(data)
   {
      return data.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent);
   },
   
   encodeData: function(data)
   {
      return encodeURIComponent(data)   
   },

   encodeURL: function(url)
   {
      return encodeURIComponent(url)   
   },

   decodeData: function(url)
   {
      return decodeURIComponent(url)   
   },

   GetEmailsByApplicationCode: function (applicationCode) {
      const appCode = 'ApplicationCode_1'.concat('=', Service.encodeData(applicationCode));
      const smartObjectURL = Service.buildSmartObjectURL('SmartObjectServices/rest/Common/SmartObjects/Common%20GetApplicationEmails/List', appCode, 'json');

      const param = 'url='.concat(Service.encodeURL(smartObjectURL));
      const k2IntegrationURL = Service.buildK2IntegrationURL('api/K2Common/JsonpCall', param);

      return k2IntegrationURL;
   },

   GetApplicationEmailContent: function (workflowEmailID) {
      const appCode = 'WorkflowEmailID_1'.concat('=', Service.encodeData(workflowEmailID));
      const smartObjectURL = Service.buildSmartObjectURL('SmartObjectServices/rest/Common/SmartObjects/Common%20GetApplicationEmailContent/List', appCode, 'json');
      
      const param = 'url='.concat(Service.encodeURL(smartObjectURL));
      const k2IntegrationURL = Service.buildK2IntegrationURL('api/K2Common/JsonpCall', param);

      return k2IntegrationURL;
   },
   UpdateWorkflowEmailContent: function (workflowEmailContentID, uploadID, maxBlock, block, content) {
      var query = '';

      query = query.concat('workflowEmailContentID', '=', Service.encodeData(workflowEmailContentID));
      query = query.concat('&uploadID', '=', Service.encodeData(uploadID));
      query = query.concat('&max','=', Service.encodeData(maxBlock));
      query = query.concat('&count','=', Service.encodeData(block));
      query = query.concat('&content','=', Service.encodeData(content));

      //console.log('UpdateWorkflowEmailContent content :'+block, content);
      //console.log('UpdateWorkflowEmailContent coded:'+block, Service.encodeData(content));
      
      const k2IntegrationURL = Service.buildK2IntegrationURL('api/K2Common/SaveEmailContent', query);
               
      return k2IntegrationURL;

   },

   GetGUID: function () {
      const smartObjectURL = Service.buildSmartObjectURL('SmartObjectServices/rest/Common/SmartObjects/Common%20GUID/List', '', 'json');
      
      const param = 'url='.concat(Service.encodeURL(smartObjectURL));
      const k2IntegrationURL = Service.buildK2IntegrationURL('api/K2Common/JsonpCall', param);
      return k2IntegrationURL;
   }

}

export default Service;