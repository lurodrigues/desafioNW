

// --------------------------------------------------------------------------- //
// ----------------------   CREATE/EDIT CRONTROLLER    ----------------------- //
// --------------------------------------------------------------------------- //


challenge.controller('createCtrl', ['$scope','$http', '$location', '$routeParams','$rootScope', function ($scope, $http, $location, $routeParams,$rootScope ) {
                                        
    // URL
     var url = {
        local : $location.url(),                    // Pega a url da rota atual
        API   : "http://heroes.qanw.com.br:8674",   // url da API
        id    : $routeParams.id                     // Pega os parametros da rota
    }
    
    var classID  = 0;                               // Salva o id da classe que foi selecionada
    var create   = ( url.local == '/Create' );      // Verifica se o usuario quer editar ou criar um heroi
    
    
    /*  --------------------------------------------------------------------------------------------
        Para fazer a lista com as imagens já preexistente, eu precisaria que a API retornasse essa lista para mim, porém não exite função, por isso que salvei nesse array todos os IDs das imagens que foram salvas.
        (todas a imagens eu salvei pelo Postman)
        --------------------------------------------------------------------------------------------  */
    var photosID = [25,26,27,28,29,30,31,32,33,34];
    
  
    
//---------------------------------------------------------------------------
        
    /* -- ngBind -- */
    
    $scope.title        = create ? "Novo Herói": "Editar Herói"; // Titulo da tela 
    
    $scope.listImage    = photosID;                 // Array de IDs das imagens
    $scope.activeImage  = {};                       // Imagens selecionadas
    $scope.activeClass  = 'form__image_active';     // Classe correspondente as imagens selecioandas
    $scope.urlPhotos    = url.API + "/photos/";     // URL das imagens
    
    
    // Heroi: objeto padrão
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
    $scope.specialties  = [];       // Lista de especialidades
    $scope.classes      = [];       // Lista de classes
           
    
    $scope.titleSpecialties = "Selecione uma ou mais opções";   // Titulo do botão especialidade
    $scope.currClasses      = null;                             // Classe escolhida
    
                             
 //---------------------------------------------------------------------------   
    
    
    /* Inicia junto com a TELA */
    $scope.init = function  (){
        
        // Por definição, deixa todas a imagens sem a marcação de ativas
        for (var i=0; i< photosID.length; i++){
            $scope.activeImage[photosID[i]] = '';
        }
        
        //------------------------------------------------------------
        
        $scope.getHeroe();
        $scope.getSpecialties();
        $scope.getClasses();
    }
        
   
    /* Pega o heroi que o usuraio gostaria de editar */                                    
    $scope.getHeroe = function (_test){
        
        //caso seja ele queria criar, essa função deixa de ser executada
        if (create) return;
        
        //------------------------------------------------------------
        
        var i       = 0;    // contador usado no for
        var imageID = 0;    // referência o id das imagens que já foram selecionadas pelo usuario
        
        var _http   = { method : "GET", url : url.API+"/heroes/"+url.id };
        
        //------------------------------------------------------------
        
        
        // Requisição para pegar os dados do Heroi
        $http(_http).then(

            function mySuccess(response) {
                
                $scope.heroe = response.data;           // salva o resultado retornado
                classID      = $scope.heroe.class_id;   // salva o id da classe do heroi
                
                console.log($scope.heroe.photos);
                // varre a lista de fotos do heroi, para assim deixa-las como checkadas na dela 
                for ( i = 0; i< $scope.heroe.photos.length; i++){
                     
                     imageID = $scope.heroe.photos[i];                      // guarda os ids das fotos
                     $scope.activeImage[imageID] =  $scope.activeClass;     // deixa em destaque as fotos já selecionadas
                }
                
            }, 

            function myError(response) {
                alert("Não foi possivel carregar os dados desse heroi");
            }
        );
    }
    
    
    /* Pega todas as epecialidades */  
    $scope.getSpecialties = function (){
        
        var _http = { method : "GET", url : url.API+"/specialties" };
        
        // Requisição para pegas as Especialidades
        $http(_http).then(

            function mySuccess(response) {
                
                $scope.specialties = response.data; // salva o resultado retornado
                $scope.changeSpecialities(null);    // deixa checkado todas as especialidades que o heroi já possuia
            }, 

            function myError(response) {
                //Informa que os dados Não foram carregados
                alert("Não foi possivel carregar as Especialidades");
            }
        );
    }
    
    
    /* Pega todas as classes */  
    $scope.getClasses = function (){
        
        var _http = { method : "GET", url : url.API+"/classes" };

        // Requisição para pegas as classes
        $http(_http).then(

            function mySuccess(response) {
                
                $scope.classes = response.data;     // salva o resultado retornado
                
                // Varre toas as classes para verificar qual delas pertencem ao heroi
                for (var i=0; i< $scope.classes.length; i++){
                    
                    // Verifica qual é a classe atual
                    if ($scope.classes[i].id == classID)
                        $scope.currClasses = $scope.classes[i];  // Salva a referencia da classe atual 
                }
            },
            
            function myError(response) {
                
                //Informa que os dados NÂO foram carregados
                alert("Não foi possivel carregar as classes");
                
            }
        );
    }
    
    
     /* Impede que o box do dropdown (Especialidade) suma quando for escolhido açguma alternativa  */ 
    $scope.dropdownMenu = function (e){
        e.stopPropagation();
    }
    
    
    /* Ativa ou desativa a especialidade clicada  */ 
    $scope.changeSpecialities = function (obj, index, e){
        
        var _spc            = $scope.specialties;           // salva a referencia da lista de especialidades
        var _heroSpc        = $scope.heroe.specialties;     // salva a referencia da lista de especialidades do heroi
        
        var _spcLength      = $scope.specialties.length;            // tamanho da lista de especialidades
        var _heroSpcLength  = $scope.heroe.specialties.length;      // tamanho da lista de especialidades do heroi
        
                
        // Caso a função tenha sido chamada ao iniciar a tela
        if (obj == null) {
            
            // Varre as duas listas para poder adicionar o "check" nas especialidades que o heroi já possui 
            for (var i = 0; i < _heroSpcLength ; i++)
            for (var j = 0; j < _spcLength     ; j++) {

                // verifica se o heroi já apossui essa especialidade 
                if (_spc[j].id == _heroSpc[i].id){
                    _spc[i].check = true;
                }
            }
        }
        else {
            // apenas inverte o check da especialidade clicada
            _spc[index].check = !_spc[index].check;
        }
        
    }
    
    
    /* Ativa ou desativa a imagem clicada */ 
    $scope.selectedImage = function (_id, index){
        $scope.activeImage[_id] = ($scope.activeImage[_id] == "") ? $scope.activeClass : "";
    }
    
    
    /* CANCELAR */ 
    $scope.cancel = function (){
        
        var _confirm = confirm("Tem certeza que você quer sair sem salvar?");
        
        // Verifica se o usuario quer mesmo cancelar a criação/edição do heroi
        if (_confirm == false)  { 
            return;
        }
        
        // Zera as informações do heroi
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
        
        // Redirenciona para a pagina inicial
        $location.path('/');
    }
    
    
    /* SALVAR */
    $scope.save = function (){
        
        // Mensagens do alert
        var _alert = {
            success : create ? "O heroi foi criado com sucesso"    : "O heroi foi editado com sucesso",
            error   : create ? "Não foi possivel criar esse heroi" : "Não foi possivel editar esse heroi",
            blanck  : "Alguns campos não foram preenchidos. \nÉ necessario que todos campos estjam preenchidos para poder salvar"
        }
        
        // Retorna somente os IDs das Especialidades selecionadas
        var _specialties = $scope.specialties.filter(function(f){  return f.check })
                                             .map   (function(e){  return e.id;   });
        
        // Retorna somente os IDs das Classes selecionadas
        var _image = Object.keys   ( $scope.activeImage)
                           .filter ( function(f){  return $scope.activeImage[f] })
                           .map    ( function(e){  return parseInt(e);          });
        
        // Guarda as informações do heroi que serão salvas
        var _heroe = {
            id              : $scope.heroe.id,
            class_id        : ($scope.currClasses) ? $scope.currClasses.id : null,
            name            : $scope.heroe.name,
            health_points   : $scope.heroe.health_points,
            defense         : $scope.heroe.defense,
            damage          : $scope.heroe.damage,
            attack_speed    : $scope.heroe.attack_speed,
            movement_speed  : $scope.heroe.movement_speed,
            class_name      : ($scope.currClasses) ? $scope.currClasses.name : "",
            specialties     : _specialties,
            photos          : _image
        };
        
        // Valida se há algum campo vazio
        for (var item in _heroe) {
            
            if (item !== "id")
            if ( !_heroe[item] || ((item == "specialties" || item == "photos") && _heroe[item].length == 0) ) {
                alert(_alert.blanck);
                return;
            }
        }
        
        // Ativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
        $('.background-loading').css('display', 'block');
        
        
        // Se estiver na tela de criação, então será feito um POST, se não, será feito um PUT
        if (create) { http = { method : "POST", url : url.API + "/heroes"         , data:_heroe }; }
        else        { http = { method : "PUT" , url : url.API + "/heroes/"+url.id , data:_heroe };  }
        
        
        //Requisição para salvar os dados
        $http(http).then(

            function mySuccess(response) {
                
                //Informa que os dados foram salvos
                alert(_alert.success);
                
                // Desativa a div para impedir que o usuario clique em alguma coisa enquanto está sendo salvo as informações
                $('.background-loading').css('display', 'none');
                
                // Redirenciona para a pagina inicial
                $location.path('/');
            }, 

            function myError(response) {
                
                //Informa que os dados NÃO foram salvos
                alert(_alert.error);
                
            }
        );
    }
    
    
}]);