

// --------------------------------------------------------------------------- //
// -----------------------   DASHBOARD CRONTROLLER    ------------------------ //
// --------------------------------------------------------------------------- //


challenge.controller('dashboardCtrl', ['$scope','$http', '$location','$rootScope', function ($scope, $http, $location, $rootScope) {
    
    
    /* -- Variaveis -- */
    var contOrder = 0;      // auxilia a manipular o ordenação
    var lastOrder = "";     // salva a ultima ordenação utilizada
    
    var url       = "http://heroes.qanw.com.br:8674";  // url da API
    

//---------------------------------------------------------------------------
    
    /* -- ngBind -- */
    
    $scope.charList       = [];     // lista de herois cadastrada
    $scope.nameTitle      = "id";   // titulo de cada coluna da tabela
    $scope.activeOrder    = "";     // ordenação atual
    $scope.photo          = "";     // url da primeira foto da lista de fotos do heroi
    $scope.searchHeroe    = "";     // filtro da busca
        
    // Lista para popular os titulos da tabela
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

    /* Ordena a tabela */
    $scope.orderByFunc = function (order){
        
        // Se nenhum titulo foi selecionado
        if (order == "") return;
        
        
        // Se o titulo selecionado é diferento do ultimo selecionado
        if ( order != lastOrder ) {
            lastOrder          = order;
            $scope.nameTitle   = order;
            $scope.activeOrder = order;
            contOrder = 0;
        }
        
        // Se for igual
        else {
            
            // Coloca na ordem decrescente
            $scope.nameTitle = "-"+order;
            contOrder++;
            
            // Desabilita o filtro
            if ( contOrder == 2 ) {
                
                contOrder        = 0;
                lastOrder        = "";
                
                $scope.nameTitle = "id";
                $scope.activeOrder = "";
            }
        }
        
    };
    
    
    /* Pega a lista de herois cadastrados */ 
    $scope.getHeroes = function (  ) {
        
        var http        = {};
        var result      = [];
        var specialties = '';
        var i           = 0;     // contador usado no for
    
     //------------------------------------------------------------
        

        http = { method : "GET", url : url+"/heroes" };

        // Requisição para pegar a lista de herois cadastrados
        $http(http).then(

            function mySuccess(response) {
                
                // salva o resultado retornado
                result = response.data;

                //Leitura de cada item do objeto recebido
                for ( i; i < result.length; i++){
                    
                    //Zera a variavel
                    specialties = '';

                    //tranformando o objeto 'specialties' em string
                    specialties = result[i].specialties.map(function(item) {
                        return item['name'];
                    }).join (", ");
                    
                    
                    // Salva a url das imagens
                    result[i].photos = url + "/photos/" + result[i].photos[0];

                    // Salva as especialidade no objeto principal
                    result[i].specialties = specialties;
                };

                // salva result no charList
                $scope.charList = result;
                
            }, //FIM - função

            function myError(response) {
                alert("Não foi possivel carregar a lista de herois");
            }
        );

    };
    
   
    /* Deleta da lista, o heroi selecionado */ 
    $scope.deleteHereo = function ( _id, _index ){
        
        
        // Ativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
        $('.background-loading').css('display', 'block');
        
        var _confirm = confirm("Tem certeza que você quer excluir esse heroi?");
        
        // Mensagens dos alerts
        var _alert = {
            success : "O heroi foi excluido com sucesso",
            error   : "Não foi possivel excluir esse heroi"
        }
        
        // Verifica se o usuario quer mesmo excluir o heroi
        if (_confirm == false)  { 
            
             // Desativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
            $('.background-loading').css('display', 'none');
            
            return;
        }
        
            
        var _http = { method : "DELETE", url : url+"/heroes/"+_id };

        $http(_http).then(

            function mySuccess(response) {
                
                //Informa que o heroi foi excluido
                alert(_alert.success);

                //Exclui da lista atual
                $scope.charList.splice(_index, 1);
                
                // Desativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
                $('.background-loading').css('display', 'none');
            },

            function myError(response) {
                
                //Informa que NÃO foi possivel excluir o heroi
                alert(_alert.error);
                
                // Desativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
                $('.background-loading').css('display', 'none');
            }
        );
            
    }
    
    
    /* Redirenciona para a pagina de Edição */ 
    $scope.editHereo = function ( id ){
        $location.path('Edit/' + id);
    }
    
    /* Redirenciona para a pagina de Criação */ 
    $scope.createHereo = function ( ){
        $location.path('Create');
    }
    

}]);


