var challenge = angular.module('challenge', []);


// --------------------------------------------------------------- 



challenge.controller('challengeCtrl', function($scope) {

    /* -- Variaveis -- */
    var contOrder = 0;
    var lastOrder = "";
    
    
    /* -- ngBind -- */
    $scope.attributeList = [
        {title: "Nome"              , orderName: "name"          },
        {title: "Classe"            , orderName: "className"     },
        {title: "Especialidade"     , orderName: "specialty"     },
        {title: "Vida"              , orderName: "life"          },
        {title: "Defesa"            , orderName: "defense"       },
        {title: "Dano"              , orderName: "damage"        },
        {title: "Vel. de Ataque"    , orderName: "attackSpeed"   },
        {title: "Vel. de Movimento" , orderName: "moveSpeed"     },
    ];
    
    $scope.charList  = characters;
    $scope.nameTitle = "id";
    $scope.activeOrder = "";
    
    
    
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


});