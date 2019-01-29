
var CRUD = function ( $http, _type, _id, _test, callback ){
    
    var url = "http://heroes.qanw.com.br:8674";
    var http = {};
    var result = [];
    var specialties = '';
    var i = 0;
    
    console.log('CRUD');
    
  
    if (_type == 'get' )
        function getItem ();
        
    if (_type == 'post' )
        function postItem ();
        
    if (_type == 'put' )
        function putItem ();
        
    if (_type == 'delete' )
        function deleteItem ();
        
        
        
    
    function getItem (){
        
        console.log('getItem');
        
        specialties = '';
        i = 0;
        
        
        if (_test) 
            getItem_test( callback );
        else 
            getItem_API( callback );
    }
    
    function getItem_test ( _callback ){
        
        console.log('getItem_test');
        
        //Para não criar um ponteiro e alterar o arquivo original    
        result = JSON.parse(JSON.stringify(characters));
        
        
        for ( i=0; i < result.length; i++){
            
            specialties = result[i].specialties.map(function(item) {
              return item['name'];
            }).join (", ");

            result[i].specialties = specialties;
            
            
        };
        
        _callback (result);
        
    }
    
    function getItem_API(_callback) {
        if (_id) {
            
            
        }
        else {
            
            http = { method : "GET", url : url+"/heroes" };
        
            $http(http).then(
                function mySuccess(response) {

                    result = response.data;

                    for ( i; i < result.length; i++){
                        specialties = '';

                        specialties = result[i].specialties.map(function(item) {
                          return item['name'];
                        }).join (", ");

                        result[i].specialties = specialties;
                    };

                    
                }, 

                function myError(response) {
                    result = response.statusText;
                }
            )
         }
        
        
        _callback (result);
        
    }
    

    
    
    
    
    
    
};