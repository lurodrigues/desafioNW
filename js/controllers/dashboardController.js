

// --------------------------------------------------------------------------- //
// -----------------------   DASHBOARD CRONTROLLER    ------------------------ //
// --------------------------------------------------------------------------- //


challenge.controller('dashboardCtrl', ['$scope','$http', '$location', function ($scope, $http, $location) {
    
    
    /* -- Variaveis -- */
    var contOrder = 0;
    var lastOrder = "";
    var url = "http://heroes.qanw.com.br:8674";
    

//---------------------------------------------------------------------------
    
    /* -- ngBind -- */
    
    $scope.charList     = [];
    $scope.nameTitle    = "id";
    $scope.activeOrder  = "";
    $scope.photo        = "";
    
    $scope.attributeList = [
        {title: "Nome"              , orderName: "name"           },
        {title: "Classe"            , orderName: "class_name"     },
        {title: "Especialidade"     , orderName: "specialties"    },
        {title: "Vida"              , orderName: "health_points"  },
        {title: "Defesa"            , orderName: "defense"        },
        {title: "Dano"              , orderName: "damage"         },
        {title: "Vel. de Ataque"    , orderName: "attack_speed"   },
        {title: "Vel. de Movimento" , orderName: "movement_speed" }
    ];
    
    
//---------------------------------------------------------------------------

   
    $scope.orderByFunc = function (order){
        
        if (order == "") return;
        
    //------------------------------------------------------------
        
        if ( order != lastOrder ) {
            lastOrder          = order;
            $scope.nameTitle   = order;
            $scope.activeOrder = order;
            contOrder = 0;
        }
        else {
            $scope.nameTitle = "-"+order;
            contOrder++;
            
            if ( contOrder == 2 ) {
                
                contOrder        = 0;
                lastOrder        = "";
                
                $scope.nameTitle = "id";
                $scope.activeOrder = "";
            }
        }
        
    };
    
    
    /**
     *  GET HEROES
     * */
    $scope.getHeroes = function ( _test ) {
        
        var http        = {};
        var result      = [];
        var specialties = '';
        var photos      = '';
        var i           = 0;
    
     //------------------------------------------------------------
                
        if (_test) { getItem_test( ); }
        else       { getItem_API ( ); }
        
     //------------------------------------------------------------
        
        /**
         *  As vezes o API não carrega, então fiz essa versão teste, para poder continuar fazedo o desafio
         * */
        function getItem_test() {
        
            //Para não criar um ponteiro e alterar o arquivo original    
            result = JSON.parse(JSON.stringify(characters));

            //Leitura de cada item do objeto recebido
            for ( i=0; i < result.length; i++){
                photos = url+"/photos/"+result[i].photos[0];
                
                //Zera a variavel
                specialties = '';
                
                //tranformando o objeto 'specialties' em string
                specialties = result[i].specialties.map(function(item) {
                  return item['name'];
                }).join (", ");
                
                result[i].specialties = specialties;
                result[i].photos = photos;
                
            }; //FIM --- for
            
            $scope.charList = result;

        }
    
        /**
         *  Caso a API esteja carregando
         * */
        function getItem_API () {

            http = { method : "GET", url : url+"/heroes" };

            $http(http).then(
                
                function mySuccess(response) {

                    result = response.data;

                    //Leitura de cada item do objeto recebido
                    for ( i; i < result.length; i++){
                        //Zera a variavel
                        specialties = '';
                        
                        //tranformando o objeto 'specialties' em string
                        specialties = result[i].specialties.map(function(item) {
                            return item['name'];
                        }).join (", ");

                        result[i].specialties = specialties;
                    };

                    $scope.charList = result;
                }, 

                function myError(response) {
                    $scope.charList = response.statusText;
                }
            );
        }
        
    };
   
    
    $scope.deleteHereo = function ( _item, _test ){
        
        var indexOf = $scope.charList.indexOf(_item );
        
    //------------------------------------------------------------
        
        $scope.charList.splice( indexOf, 1 );
        
        
        if (_test ) { deleteItem_test( ); }
        else         { deleteItem_API ( ); }
        
       
    //------------------------------------------------------------
        
        
        function deleteItem_test (){
            characters.splice( indexOf, 1 );
        }
        
        function deleteItem_API (){
            http = { method : "DELETE", url : url+"/heroes/"+_id };
            
            $http(http).then(
                
                function mySuccess(response) {
                    //mesagem de sucesso - response.statusText;
                }, 

                function myError(response) {
                    // mesagem de erro - response.statusText;
                }
            );
        }
        
    }
    
    
    $scope.editHereo = function ( _item, _index ){
        
        var indexOf = $scope.charList.indexOf(_item );
        
     //------------------------------------------------------------
        
        $location.path('Edit/'+indexOf);
    }
    
    
    $scope.createHereo = function ( ){
        $location.path('Create');
    }
    

}]);


