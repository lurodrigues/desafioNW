

// --------------------------------------------------------------------------- //
// ----------------------   CREATE/EDIT CRONTROLLER    ----------------------- //
// --------------------------------------------------------------------------- //


challenge.controller('createCtrl', ['$scope','$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams ) {
                                        
    /* -- Variaveis -- */   
                                        
    var url    = $location.url();
    var create = (url == '/Create');
    var id     = $routeParams.id;
    var classID  = 0;
                                        
  
    
//---------------------------------------------------------------------------
        
    /* -- ngBind -- */
    
    $scope.disabledScreen = false;
                                        
    $scope.title        = create ? "Novo Herói": "Editar Herói";

    $scope.activeImage  = {};
    $scope.activeClass  = 'form__image_active';
    $scope.listImage    = photosID;
    $scope.url          = "http://heroes.qanw.com.br:8674";
    $scope.urlPhotos    = $scope.url + "/photos/";
    
    $scope.heroe        = {
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
    $scope.specialties  = [];
    $scope.classes      = [];
                                        
    $scope.flagSpecialties  = [];
    $scope.titleSpecialties = "Selecione uma ou mais opções";
    $scope.currClasses      = null;
    
                             
 //---------------------------------------------------------------------------   
    
    
    $scope.init = function  (){
        
        
        for (var i=0; i< photosID.length; i++){
            $scope.activeImage[photosID[i]] = '';
        }
        
        $scope.getHeroe();
        $scope.getSpecialties();
        $scope.getClasses();
        
        
    }
        
   
                                        
    $scope.getHeroe = function (_test){
        
        if (create) return;
        
    //------------------------------------------------------------
        
        var http        = {};
        var result      = [];
        var i = 0;
        var idImage = 0;
        
        
    //------------------------------------------------------------
        
        
        http = { method : "GET", url : $scope.url+"/heroes/"+id };
        
        $http(http).then(

            function mySuccess(response) {
                $scope.heroe = response.data;
                classID      = $scope.heroe.class_id;
                
                
                 for ( i = 0; i< $scope.heroe.photos.length; i++){
                     
                     idImage = $scope.heroe.photos[i];
                    $scope.activeImage[idImage] =  $scope.activeClass;
                }
//                
            }, 

            function myError(response) {
                //$scope.charList = response.statusText;
            }
        );
    }
    
    
    $scope.getSpecialties = function (){
        http = { method : "GET", url : $scope.url+"/specialties" };
        
        var _scopeS  = [];
        var _scopeHS = $scope.heroe.specialties;
        

        $http(http).then(

            function mySuccess(response) {
                
                $scope.specialties = response.data;
                
                $scope.changeEspecialities(null);
                
                
            }, 

            function myError(response) {
                console.log(response.statusText);
            }
        );
    }
    
    
    $scope.getClasses = function (){
        http = { method : "GET", url : $scope.url+"/classes" };

        $http(http).then(

            function mySuccess(response) {
                
                $scope.classes = response.data;
                
                for (var i=0; i< $scope.classes.length; i++){
                    
                    if ($scope.classes[i].id == classID)
                        $scope.currClasses = $scope.classes[i];
                }

            },
            
            function myError(response) {
                console.log(response.statusText);
            }
        );
    }
    
    
    
    $scope.dropdownMenu = function (e){
        e.stopPropagation();
    }
    
    
    $scope.changeEspecialities = function (obj, index, e){
        
        var virgula = ", ";
        var count = 0;
        var flag = true;
        var teste = "";
        
        var specialties  = $scope.specialties;
        var specialtiesH = $scope.heroe.specialties;
        
        var lengthI = $scope.heroe.specialties.length;
        var lengthJ = $scope.specialties.length;
        
        
        if (obj == null) {
            
            for (var i = 0; i < lengthI ; i++)
            for (var j = 0; j < lengthJ ; j++) {

                if (specialties[j].id == specialtiesH[i].id){
                    specialties[i].check = true;
                }
            }
        }
        else {
            specialties[index].check = !specialties[index].check;
            console.log(specialties[index]);
        }
    }
    
    
    $scope.selectedImage = function (_id, index){
        $scope.activeImage[_id] = ($scope.activeImage[_id] == "") ? $scope.activeClass : "";
    }
    
    
    $scope.cancel = function (){
        $scope.heroe        = {
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
        
        $location.path('/');
    }
    
    
    $scope.save = function (){
        
        $scope.disabledScreen = true;
        
        var _specialties = $scope.specialties.filter(function(f){  return f.check })
                                             .map   (function(e){  return e.id;   });
        
        var _image       = Object.keys   ($scope.activeImage)
                                 .filter (function(f){  return $scope.activeImage[f] })
                                 .map    (function(e){  return parseInt(e);   });
        
        var _heroe        = {
            id              : $scope.heroe.id,
            class_id        : $scope.currClasses.id,
            name            : $scope.heroe.name,
            health_points   : $scope.heroe.health_points,
            defense         : $scope.heroe.defense,
            damage          : $scope.heroe.damage,
            attack_speed    : $scope.heroe.attack_speed,
            movement_speed  : $scope.heroe.movement_speed,
            class_name      : $scope.currClasses.name,
            specialties     : _specialties,
            photos          : _image
        };
        
        
        
        if (create) {
             http = { method : "POST", url : $scope.url+"/heroes", data:_heroe };
        }
        else {
            http = { method : "PUT", url : $scope.url+"/heroes/"+id, data:_heroe };
        }
        
        
        $http(http).then(

            function mySuccess(response) {
                console.log('mySucces ', response.statusText);
                $location.path('/');

                $scope.disabledScreen = false;
            }, 

            function myError(response) {
                console.log('myError', response.statusText);
                $scope.disabledScreen = false;
            }
        );
        
//        $location.path('/');
    }
    
    
    
    
}]);