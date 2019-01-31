

// --------------------------------------------------------------------------- //
// -----------------------   DASHBOARD CRONTROLLER    ------------------------ //
// --------------------------------------------------------------------------- //


challenge.controller('dashboardCtrl', ['$scope','$http', '$location', function ($scope, $http, $location) {
    
    
    /* -- Variaveis -- */
    var contOrder = 0;
    var lastOrder = "";
    var url       = "http://heroes.qanw.com.br:8674";
    

//---------------------------------------------------------------------------
    
    /* -- ngBind -- */
    
    $scope.charList       = [];
    $scope.nameTitle      = "id";
    $scope.activeOrder    = "";
    $scope.photo          = "";
    
    $scope.seachType      = "";
    $scope.searchHeroe    = "";
        
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
                    
                    result[i].photos = url + "/photos/" + result[i].photos[0];

                    result[i].specialties = specialties;
                };

                $scope.charList = result;
                
                console.log(result)
                
            }, //FIM - função

            function myError(response) {
                $scope.charList = response.statusText;
            }
        );

        
    };
   
    
    $scope.deleteHereo = function ( _id, _index ){
        
        
        http = { method : "DELETE", url : url+"/heroes/"+_id };

        $http(http).then(

            function mySuccess(response) {
                console.log('mySucces ', response.statusText);
                
                $scope.charList.splice(_index, 1);

                //mesagem de sucesso - response.statusText;
            }, 

            function myError(response) {
                console.log('myError ', response.statusText);
                // mesagem de erro - response.statusText;
            }
        );
        
    }
    
    
    $scope.editHereo = function ( id ){
        $location.path('Edit/' + id);
    }
    
    
    $scope.createHereo = function ( ){
        $location.path('Create');
    }
    

}]);


