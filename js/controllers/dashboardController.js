challenge.controller('dashboardCtrl', ['$scope','$http', function ($scope, $http) {
    
    /* -- Variaveis -- */
    var contOrder = 0;
    var lastOrder = "";
    var url = "http://heroes.qanw.com.br:8674";
    
    
    /* -- ngBind -- */
    $scope.attributeList = [
        {title: "Nome"              , orderName: "name"           },
        {title: "Classe"            , orderName: "class_name"     },
        {title: "Especialidade"     , orderName: "specialties"    },
        {title: "Vida"              , orderName: "health_points"  },
        {title: "Defesa"            , orderName: "defense"        },
        {title: "Dano"              , orderName: "damage"         },
        {title: "Vel. de Ataque"    , orderName: "attack_speed"   },
        {title: "Vel. de Movimento" , orderName: "movement_speed" },
    ];
    
    $scope.charList  = [];
    $scope.nameTitle = "id";
    $scope.activeOrder = "";
    
    getHeroes(true);
    
    
    /* -- Funções -- */
    $scope.orderByFunc = function (order){
        
        if (order == "")
            return;
        
        if (order != lastOrder) {
            lastOrder          = order;
            $scope.nameTitle   = order;
            $scope.activeOrder = order;
            contOrder = 0;
        }
        else {
            $scope.nameTitle = "-"+order;
            contOrder++;
            
            if ( contOrder == 2){
                
                contOrder        = 0;
                lastOrder        = "";
                
                $scope.nameTitle = "id";
                $scope.activeOrder = "";
            }
        }
        
    }
    
    
    
    
    /**
     *  GET HEROES
     * */
    function getHeroes ( _test ) {
        
        var http        = {};
        var result      = [];
        var specialties = '';
        var photos      = '';
        var i           = 0;
        
                
        if (_test) { getItem_test( ); }
        else       { getItem_API ( ); }
        
        /**
         *  As vezes o API não carrega, então fiz essa versão teste, para poder continuar fazedo o desafio
         * */
        function getItem_test() {
        
            console.log('getItem_test');

            //Para não criar um ponteiro e alterar o arquivo original    
            result = JSON.parse(JSON.stringify(characters));

            //Leitura de cada item do objeto recebido
            for ( i=0; i < result.length; i++){
                //Zera a variavel
                specialties = '';
                
                //tranformando o objeto 'specialties' em string
                specialties = result[i].specialties.map(function(item) {
                  return item['name'];
                }).join (", ");
                
                result[i].specialties = specialties;
                
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
            )


           

        }
    }
    
    function getPhoto ( _id, _callback, _test ){
        
        
         http = { method : "GET", url : url+"/photos/"+_id[0] };

            $http(http).then(
                function mySuccess(response) {
                    
                    console.log(response.data);
                    _callback ( response.data );

                }, 

                function myError(response) {
                    return response.data;
                }
            )
        
    }
    
    
    
    


}]);


