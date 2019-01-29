

// --------------------------------------------------------------------------- //
// ----------------------   CREATE/EDIT CRONTROLLER    ----------------------- //
// --------------------------------------------------------------------------- //


challenge.controller('createCtrl', ['$scope','$http', '$location', '$routeParams', 
                                    function ($scope, $http, $location, $routeParams) {
                                        
                                        
    /* -- Variaveis -- */   
                                        
    var url    = $location.url();
    var create = (url == '/Create');
    var id     = $routeParams.id;
    
    
//---------------------------------------------------------------------------
        
    /* -- ngBind -- */
                                        
    $scope.title        = create ? "Novo Herói": "Editar Herói";

    $scope.activeImage  = 'undefined';
    $scope.activeClass  = 'form__image_active';
    $scope.listImage    = photosID;
    $scope.url          = "http://heroes.qanw.com.br:8674/photos/";
    
    $scope.heroe = {
        id              : null,
        class_id        : null,
        name            : '',
        health_points   : null,
        defense         : null,
        damage          : null,
        attack_speed    : null,
        movement_speed  : null,
        class_name      : "",
        specialties     : [],
        photos          : []
    };
    
    
 //---------------------------------------------------------------------------   
    
    
    $scope.getHeroe = function (_test){
        
        if (create) return;
        
    //------------------------------------------------------------
        
        var http        = {};
        var result      = [];
        
                
        if (_test) { getItem_test( ); }
        else       { getItem_API ( ); }
        
        
    //------------------------------------------------------------
        
        /**
         *  As vezes o API não carrega, então fiz essa versão teste, para poder continuar fazedo o desafio
         * */
        function getItem_test() {
        
            //Para não criar um ponteiro e alterar o arquivo original    
            result = JSON.parse(JSON.stringify(characters[id]));
            
            $scope.activeImage = $scope.listImage.indexOf(result.photos[0]);
            $scope.heroe       = result;
            
            console.log(result.photos[0]);

            /*
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
            */
            
//            $scope.charList = result;

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
        
        
    }
    
    
    $scope.selectedImage = function (_id, index){
        
        if ( $scope.activeImage != index){
             $scope.activeImage  = index;
        }
    }
    
    
    $scope.cancel = function (){
        $location.path('/');
    }
    
    
    $scope.save = function (){
        $location.path('/');
    }
    
    
}]);