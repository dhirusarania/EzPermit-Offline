


var mainCalendar=""

console.log(mainCalendar)

var selectedCalendar =""

var originalTaskData = ""

var counter = 0


var prevSpace = 1, nextSpace = 0


var defaultCount = 10000

var calendar_firstLoad = 0

var notification_array = []



        // function calendar1(a){

        //                 console.log("JAVA")
        //                 console.log(a)


        //         }


Kakao.init('e72ad82dc69b6d795e31cb47c1579893');
function sendLink() {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '제목',
      description: '설명',
      imageUrl: '이미지 URL',
      link: {
        mobileWebUrl: '공유할 URL',
        webUrl: '공유할 URL'
      }
    },
    buttons: [
    {
      title: '웹으로 보기',
      link: {
        mobileWebUrl: '공유할 URL',
        webUrl: '공유할 URL'
      }
    },
    {
      title: '앱으로 보기',
      link: {
        mobileWebUrl: '공유할 URL',
        webUrl: '공유할 URL'
      }
    }
    ]
  });
}


var prevData;



function thisOne(){



if(window.location.href.search( '/#/drawing' ) != -1){



    prevStart = $("#start").val()
    prevEnd = $("#end").val()
    prevDuration = $("#duration").val()

    setTimeout(function(){ 



 if(new Date($("#end").val()).getTime() < new Date($("#start").val()).getTime()){

alert("less")

$("#end").val(prevEnd)
$("#duration").val(Math.floor(( Date.parse($("#end").val()) - Date.parse($("#start").val()) ) / 86400000) + 1)


}else{


$("#duration").val( Math.floor(( Date.parse($("#end").val()) - Date.parse($("#start").val()) ) / 86400000) + 1)


}

console.log("Thjissss")


}, 100);



}else{





prevData = $("#end").val()
prevDuration = $("#duration").val()

setTimeout(function(){ 



 if(new Date($("#end").val()).getTime() < new Date($("#start").val()).getTime()){

alert("less")

$("#end").val(prevData)
$("#duration").val(prevDuration)


}





}, 100);






}

}




// var scroll = $(document).scrollTop();
// var headerHeight = $('.navbar-collapse').outerHeight();

// $(window).scroll(function() {

//   var scrolled = $(document).scrollTop();
//   if (scrolled > headerHeight){
//     $('.navbar-collapse, .navbar').addClass('nav-up');
//   } else {
//     $('.navbar-collapse, .navbar').removeClass('nav-up');
//   }

//   if (scrolled > scroll){
//    $('.navbar-collapse, .navbar').removeClass('nav-down');
//  } else {
//   $('.navbar-collapse, .navbar').addClass('nav-down');
// }            
// scroll = $(document).scrollTop(); 
// });




function pwacheck(fileurl){

  fileurl1 = $(fileurl).attr("data-link")


  console.log(fileurl1)
  console.log(fileurl1.substring(fileurl1.lastIndexOf('/')+1))




  localStorage.setItem('drwFileName', fileurl1.substring(fileurl1.lastIndexOf('/')+1));
  localStorage.setItem('drwFileURL', fileurl1.substring(fileurl1.lastIndexOf('/')+1));

  console.log($(fileurl).closest('tr').attr('taskid'))
  taskid = $(fileurl).closest('tr').attr('taskid')



  // $.get('assets/views/phppages/allProjectController.php?deleteTaskNoti1=deleteTaskNoti1&taskid=' + taskid, function(data, status){


  //   console.log(data)

  //   $("#taskLabelSVG_red-"+taskid).remove()


  // })


// var standalone = false

// var baseRegex = new RegExp( `${ window.location.hostname}` );

// if ( window.matchMedia( '(display-mode: standalone)' ).matches ) {
//     standalone = true

// }

// console.log(standalone)
// console.log("/#/drawing?filelocation=" + fileurl)


//     if(standalone == true) window.location.href = "/#/drawing?filelocation=" + fileurl
//       else window.open("/#/drawing?filelocation=" + fileurl, '_blank');


window.open("offline.html", '_blank');

}



function getEventCount(){

  return originalTaskData.tasks.length

}

function getEventCountCurrent(){

  var start = counter * defaultCount

  var count = 0

  if(selectedCalendar == "third"){

  }

  var max = Math.floor(originalTaskData.tasks.length / defaultCount)

  if(counter == max){


    count = originalTaskData.tasks.length % defaultCount


  }else{


    count = defaultCount


  }

  return count

}




function newEventAdded(){



 //  var currentPageData = ge.saveProject()

 //  console.log(currentPageData.tasks)

 //  if(counter == 0){

 //    if(getEventCountCurrent() > defaultCount){

 //      // originalTaskData.tasks.splice(0, 0, -37);


 //    }
 //      originalTaskData.tasks.splice(counter * defaultCount + 1, 0, -37);

 //    for(i = 0; i < currentPageData.tasks.length; i++){

 //       var a = originalTaskData.tasks[i].layerdet

 //      originalTaskData.tasks[i] = currentPageData.tasks[i]

 //      originalTaskData.tasks[i].layerdet = a

 //    }

 //  }else{



 //    if(getEventCountCurrent() > defaultCount){

 //      // originalTaskData.tasks.splice(0, 0, -37);

 //    }

 //      originalTaskData.tasks.splice(counter * defaultCount + 1, 0, -37);
 //    for(i = 0; i < currentPageData.tasks.length; i++){


 //       var a = originalTaskData.tasks[i + (counter * defaultCount)].layerdet

 //      originalTaskData.tasks[i + (counter * defaultCount)] = currentPageData.tasks[i]

 //       originalTaskData.tasks[i + (counter * defaultCount)].layerdet = a

 //    }


 //  }

 //            $('.taskEditRow .taskRowIndex').hide()

 //             $(".taskEditRow th .taskRowIndex").remove()


 //  setTimeout(function(){

 //    var counterValue = counter * defaultCount


 //          for(i = 0; i < getEventCountCurrent(); i++){

 //            counterValue++

 //                 $(".taskEditRow th").eq(i).prepend('<span class="taskRowIndex">' + counterValue +'</span>')
 //            // $('.taskEditRow .taskRowIndex').eq(i).text(counterValue)

 //            $('input').attr('autocomplete', 'off');
 //            $('.taskEditRow .taskRowIndex').show()

 //          }


 // }, 200); 




 //  console.log(originalTaskData)


}

// function deleteData(){



// var currentPageData = ge.saveProject()

// if(counter == 0){


// for(i = 0; i < currentPageData.tasks.length; i++){

//   originalTaskData.tasks[i] = currentPageData.tasks[i]

//   }

// }


// console.log(originalTaskData)


// }


function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
     }

    // other browser
    return false;
  }


  String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

  // alert(detectIE())

  if(detectIE() != false || detectIE() > 0 ){

    if(window.location.href.indexOf('/#/login/verification?passkey=') == -1){

      console.log('its here')
      console.log(window.location.href.indexOf('/#/login/verification?passkey='))

      window.location.href = "/index/browserNotSupported.html"

    }
  }



  var totalfolderSize
  var totalfolderinit 
  var totalgetFileCount
  var filecount = 0 
  var gm_value = 0
  var isEditing = 0

  var selectedTaskID = 0

//test




function loadGanttFromServer(taskId, callback) {

  //this is a simulation: load data from the local storage if you have already played with the demo or a textarea with starting demo data
  loadFromLocalStorage();

  //this is the real implementation
  /*
  //var taskId = $("#taskSelector").val();
  var prof = new Profiler("loadServerSide");
  prof.reset();

  $.getJSON("ganttAjaxController.jsp", {CM:"LOADPROJECT",taskId:taskId}, function(response) {
    //console.debug(response);
    if (response.ok) {
      prof.stop();

      ge.loadProject(response.project);
      ge.checkpoint(); //empty the undo stack

      if (typeof(callback)=="function") {
        callback(response);
      }
    } else {
      jsonErrorHandling(response);
    }
  });
  */
}

function UniqueValue(d){
  var dat_e = new Date();
  var uniqu_e = ((Math.random() *1000) +"").slice(-4)

  dat_e = dat_e.toISOString().replace(/[^0-9]/g, "").replace(dat_e.getFullYear(),uniqu_e);
  if(d==dat_e)
    dat_e = UniqueValue(dat_e);
  return dat_e;
}


function saveGanttOnServer(stopediting) {




  //this is a simulation: save data to the local storage or to the textarea
  // saveInLocalStorage();


  console.log("saved")
  console.log(selectedCalendar)
  console.log(originalTaskData)
  console.log(originalTaskData.tasks)
  console.log(ge.saveProject())


  if(selectedCalendar  == "resourceCalendar"){

   var person = {
    data :  JSON.stringify(ge.saveProject())
  }

  console.log(person)

  $.ajax({
    url: '/assets/views/phppages/allProjectController.php?saveganttResource=saveganttResource',
    type: 'post',
    dataType: 'json',
    data: person,
    success: function (data) {


      console.log(data)

      mainCalendar = ge.saveProject()

      ge.loadProject(mainCalendar)


  $('#workSpaceM').trigger('resize')

      $(".addbuttonhere").show()


      if(stopediting == 1){
        stopedit("undefined", 0)
        
      }

      $('.loader').hide()



    }
  });

}else if(selectedCalendar  == "mainCalendar"){


 var person = {
  data :  JSON.stringify(ge.saveProject())
}

console.log(person)

$.ajax({
  url: '/assets/views/phppages/allProjectController.php?savegantt=savegantt',
  type: 'post',
  dataType: 'json',
  data: person,
  success: function (data) {


    console.log(data)

    mainCalendar = ge.saveProject()

    ge.loadProject(mainCalendar)


  $('#workSpaceM').trigger('resize')

    $(".addbuttonhere").show()

    if(stopediting == 1){
      stopedit("undefined", 0)

    }

    $('.loader').hide()

  }
});



}else if(selectedCalendar  == "ProjectCalendarMain"){


 var person = {
  data :  JSON.stringify(ge.saveProject())
}

console.log(person)

$.ajax({
  url: '/assets/views/phppages/allProjectController.php?saveganttCalendarMain=saveganttCalendarMain',
  type: 'post',
  dataType: 'json',
  data: person,
  success: function (data) {


    console.log(data)

    mainCalendar = ge.saveProject()

    ge.loadProject(mainCalendar)

    $(".addbuttonhere").show()


  $('#workSpaceM').trigger('resize')


    if(stopediting == 1){
      stopedit("undefined", 0)

    }

    $('.loader').hide()

  }
});



}else if(selectedCalendar  == "ProjectCalendarResource"){


 var person = {
  data :  JSON.stringify(ge.saveProject())
}

console.log(person)

$.ajax({
  url: '/assets/views/phppages/allProjectController.php?saveganttCalendarResource=saveganttCalendarResource',
  type: 'post',
  dataType: 'json',
  data: person,
  success: function (data) {


    console.log(data)

    mainCalendar = ge.saveProject()

    ge.loadProject(mainCalendar)

    $(".addbuttonhere").show()


  $('#workSpaceM').trigger('resize')


    if(stopediting == 1){
      stopedit("undefined", 0)

    }

    $('.loader').hide()

  }
});



}else if(selectedCalendar  == "third"){

  console.log("zzzzz")

  console.log(filenameArray)

  var saveProject = ge.saveProject()

  console.log(ge.saveProject())

  var a = saveProject.tasks.map(function(a,index) { 
    filenameArray.map(function(b) { 
      console.log(a.id)
      console.log(b.taskid)

      if(a.id == b.taskid){
        console.log("aaaaaa")
        console.log(b.path)
        console.log(b.uploadedfilename)
        a.filelocation = b.filelocation
        a.filename = b.filename
        a.layerdet = a.layerdet
        a.folderlocation = b.folderlocation
      }
      
    })
  })

  prevTask = saveProject.tasks

  console.log(a)
  console.log(saveProject)

  mainCalendar.tasks = saveProject.tasks
  originalTaskData.tasks = saveProject.tasks

  console.log(mainCalendar)
  console.log(originalTaskData)


  for(i = 0; i < saveProject.tasks.length; i++){



    if(saveProject.tasks[i].id == undefined){

      saveProject.tasks[i].id = UniqueValue(10)
      
    }

    if(saveProject.tasks[i].name == "" || saveProject.tasks[i].name == undefined){

      saveProject.tasks[i].name = "새로운 일정"
      
    }

  }




  var person = {
    data :  JSON.stringify(saveProject)
  }


  $.ajax({
    url: '/assets/views/phppages/allProjectController.php?saveganttCalendarThird=saveganttCalendarThird',
    type: 'post',
    dataType: 'json',
    data: person,
    success: function (data) {



      console.log(data)

      if(data.length != 0){

        if(data['datahere'].value != ""){

          console.log(data["datahere"].value)


          mainCalendar = JSON.parse(data["datahere"].value)


          if(stopediting == 1){
            stopedit("undefined", 0)

          }


          ret = mainCalendar

        }else{



          ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":true,"canAdd":true,"canDelete":true,"canAddIssue":true,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"시공인력"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":true,"canWriteOnParent":true,"zoom":"1M"}
          mainCalendar = ret

        }

      }else{

        ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":true,"canAdd":true,"canDelete":true,"canAddIssue":true,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":true,"canWriteOnParent":true,"zoom":"1M"}
        mainCalendar = ret
      }

      this_data = ret



      $('#saveGanttsuccess-modal').removeClass("close");
      setTimeout(function(){ $('#saveGanttsuccess-modal').addClass("close");}, 1000);

    }
  });


}


console.log('zzzzzzzzzzzzzzzzzzzzzzzzz')
$(".addbuttonhere").show()

}

function newProject(){
  clearGantt();
  ret = {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":true,"canAdd":true,"canDelete":true,"canAddIssue":true,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":true,"canWriteOnParent":true,"zoom":"1M"}

  ge.loadProject(ret)


  $('#workSpaceM').trigger('resize')

}


//-------------------------------------------  Create some demo data ------------------------------------------------------
function setRoles() {


  if(selectedCalendar  == "ProjectCalendarResource"){

    ge.roles = [
    {
      id:"tmp_1",
      name:"시공인력"
    },
    {
      id:"tmp_2",
      name:"장비"
    },
    {
      id:"tmp_3",
      name:"엔지니어"
    },
    {
      id:"tmp_4",
      name:"기타"
    }
    ];


  }else{

    ge.roles = [
    {
      id:"tmp_1",
      name:"시공인력"
    },
    {
      id:"tmp_2",
      name:"장비"
    },
    {
      id:"tmp_3",
      name:"엔지니어"
    },
    {
      id:"tmp_4",
      name:"기타"
    }
    ];



  }



}

function setResource() {
  var res = [];
  for (var i = 1; i <= 10; i++) {
    res.push({id:"tmp_" + i,name:"Resource " + i});
  }

  if(selectedCalendar  == "ProjectCalendarResource"){
    ge.resources = res;
    
  }
  else{
    ge.resources = res;

  }
}




function clearGantt() {
  ge.reset();
}

function loadI18n() {
  GanttMaster.messages = {
    "CANNOT_WRITE":                  "CANNOT_WRITE",
    "CHANGE_OUT_OF_SCOPE":"NO_RIGHTS_FOR_UPDATE_PARENTS_OUT_OF_EDITOR_SCOPE",
    "START_IS_MILESTONE":"START_IS_MILESTONE",
    "END_IS_MILESTONE":"END_IS_MILESTONE",
    "TASK_HAS_CONSTRAINTS":"TASK_HAS_CONSTRAINTS",
    "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"GANTT_ERROR_DEPENDS_ON_OPEN_TASK",
    "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK",
    "TASK_HAS_EXTERNAL_DEPS":"TASK_HAS_EXTERNAL_DEPS",
    "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"GANTT_ERROR_LOADING_DATA_TASK_REMOVED",
    "ERROR_SETTING_DATES":"ERROR_SETTING_DATES",
    "CIRCULAR_REFERENCE":"CIRCULAR_REFERENCE",
    "CANNOT_DEPENDS_ON_ANCESTORS":"CANNOT_DEPENDS_ON_ANCESTORS",
    "CANNOT_DEPENDS_ON_DESCENDANTS":"CANNOT_DEPENDS_ON_DESCENDANTS",
    "INVALID_DATE_FORMAT":"INVALID_DATE_FORMAT",
    "TASK_MOVE_INCONSISTENT_LEVEL":"TASK_MOVE_INCONSISTENT_LEVEL",

    "GANTT_QUARTER_SHORT":"trim.",
    "GANTT_SEMESTER_SHORT":"sem."
  };
}



//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
function getFile() {

  if(selectedCalendar  == "ProjectCalendarResource"){

    $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
  }else{

    $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
    
  }


  $("#gimmeBack").submit();
  $("#gimBaPrj").val("");

  /*  var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(prj));
  neww=window.open(uriContent,"dl");*/
}


var inc = 0


function pollMainCalendar(){  


  poll_xhr = $.ajax({ 
    url: '/assets/views/phppages/allProjectController.php?mainCalendarLongPoll=mainCalendarLongPoll&inc=' + inc,
    type: 'get',

    success: function(data){

      console.log(data)


      if(isEditing == 1 && data.array == 1){

        inc = inc + 1

        setTimeout(pollMainCalendar, 20000);

      }
    }, 
    dataType: "json",
    timeout: 30000 
  });
}

function pollResourceCalendar(){  


  poll_xhr = $.ajax({ 
    url: '/assets/views/phppages/allProjectController.php?resourceCalendarLongPoll=resourceCalendarLongPoll&inc=' + inc,
    type: 'get',

    success: function(data){

      console.log(data)


      if(isEditing == 1 && data.array == 1){

        inc = inc + 1

        setTimeout(pollResourceCalendar, 20000);

      }
    }, 
    dataType: "json",
    timeout: 30000 
  });
}

function pollcheckProjectCalendarMainStatus(){  


  poll_xhr = $.ajax({ 
    url: '/assets/views/phppages/allProjectController.php?ProjectCalendarMainLongPoll=ProjectCalendarMainLongPoll&inc=' + inc,
    type: 'get',

    success: function(data){

      console.log(data)


      if(isEditing == 1 && data.array == 1){

        inc = inc + 1

        setTimeout(pollcheckProjectCalendarMainStatus, 20000);

      }
    }, 
    dataType: "json",
    timeout: 30000 
  });
}

function pollcheckProjectCalendarResourceStatus(){  


  poll_xhr = $.ajax({ 
    url: '/assets/views/phppages/allProjectController.php?ProjectCalendarMainLongPoll=ProjectCalendarMainLongPoll&inc=' + inc,
    type: 'get',

    success: function(data){

      console.log(data)


      if(isEditing == 1 && data.array == 1){

        inc = inc + 1

        setTimeout(pollcheckProjectCalendarResourceStatus, 20000);

      }
    }, 
    dataType: "json",
    timeout: 30000 
  });
}

function pollcheckthirdStatus(){  



  console.log('this is here')



  poll_xhr = $.ajax({ 
    url: '/assets/views/phppages/allProjectController.php?thirdLongPoll=thirdLongPoll&inc=' + inc,
    type: 'get',

    success: function(data){

      console.log("dat11111a")
      console.log(data)


      if(isEditing == 1 && data.array == 1){

        inc = inc + 1

        setTimeout(pollcheckthirdStatus, 20000);

      }
    }, 
    dataType: "json",
    timeout: 30000 
  });
}

var isAllowed = 1

$(document).on('click', '.cancel-modal', function(event){
  $(this).parents(".modal-card").addClass('close')

  console.log('clickingggggggggggggggggggggggg')

})

function allowedit(a){

  if(selectedCalendar == "mainCalendar"){

    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?checkMainCalendarStatus=checkMainCalendarStatus&inc=' + inc,
      type : "get",
      success : function(data) {


        inc = inc + 1

        console.log(data)

        var obj = JSON.parse(data)
        console.log(obj)

        if(obj.status == "success"){

          pollMainCalendar()

          isAllowed = 1

          allowedit_sub(a)

        }else{

          $("#editBlocked-modal").removeClass('close')

           $('.loader').hide()

          isAllowed = 0

        }



      },
      error: function() {
      }
    });

  }


  if(selectedCalendar == "resourceCalendar"){

    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?checkResourceCalendarStatus=checkResourceCalendarStatus&inc=' + inc,
      type : "get",
      success : function(data) {


        inc = inc + 1

        console.log(data)

        var obj = JSON.parse(data)
        console.log(obj)

        if(obj.status == "success"){

          pollResourceCalendar()

          isAllowed = 1

          allowedit_sub(a)

        }else{

          $("#editBlocked-modal").removeClass('close')

           $('.loader').hide()

          isAllowed = 0

        }



      },
      error: function() {
      }
    });

  }


  if(selectedCalendar == "ProjectCalendarMain"){

    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?checkProjectCalendarMainStatus=checkProjectCalendarMainStatus&inc=' + inc,
      type : "get",
      success : function(data) {


        inc = inc + 1

        console.log(data)

        var obj = JSON.parse(data)
        console.log(obj)

        if(obj.status == "success"){

          pollcheckProjectCalendarMainStatus()

          isAllowed = 1

          allowedit_sub(a)

        }else{

          $("#editBlocked-modal").removeClass('close')

           $('.loader').hide()

          isAllowed = 0

        }



      },
      error: function() {
      }
    });

  }

  if(selectedCalendar == "ProjectCalendarResource"){

    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?checkProjectCalendarResourceStatus=checkProjectCalendarResourceStatus&inc=' + inc,
      type : "get",
      success : function(data) {


        inc = inc + 1

        console.log(data)

        var obj = JSON.parse(data)
        console.log(obj)

        if(obj.status == "success"){

          pollcheckProjectCalendarResourceStatus()

          isAllowed = 1

          allowedit_sub(a)

        }else{

          $("#editBlocked-modal").removeClass('close')

           $('.loader').hide()

          isAllowed = 0

        }



      },
      error: function() {
      }
    });

  }

  if(selectedCalendar == "third"){

    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?checkthirdStatus=checkthirdStatus&inc=' + inc,
      type : "get",
      success : function(data) {


        inc = inc + 1

        console.log(data)

        var obj = JSON.parse(data)
        console.log(obj)

        if(obj.status == "success"){



          console.log('this is also')

          pollcheckthirdStatus()

          allowedit_sub(a)

          isAllowed = 1

        }else{

          $("#editBlocked-modal").removeClass('close')

          $('.loader').hide()

          isAllowed = 0

        }



      },
      error: function() {
      }
    });

  }




  console.log("isAllowed")
  console.log(isAllowed)





}


function allowedit_sub(a){


  if(isAllowed == 1){


    var scrollTop = $('.splitBox1').scrollTop()
    console.log(scrollTop)

 // $(".loader").show().fadeIn('slow');
 var taskid = $(".rowSelected").attr('taskid')



 mainCalendar.canWrite = true

 mainCalendar.canWriteOnParent = true


 console.log(mainCalendar)


 for(i = 0; i < mainCalendar.tasks.length; i++){

   if(mainCalendar.tasks[i].id == undefined){

     mainCalendar.tasks[i].id = UniqueValue(10)
     
   }

   if(mainCalendar.tasks[i].level == undefined ){
     mainCalendar.tasks[i].level = 1
     
   }


   mainCalendar.tasks[i].canWrite = true
   mainCalendar.tasks[i].canAdd = true
   mainCalendar.tasks[i].canDelete = true

   if(mainCalendar.tasks[i].id == "tmp_fk1530990157598_1"){
     mainCalendar.tasks[i].canDelete = false
   }





 }


 // mainCalendar.tasks.map(function(a,index) { 


 // })

 

 console.log(mainCalendar)


 var tasks = []

 var project = mainCalendar


 if(selectedCalendar == "third"){


   ge.loadProject(mainCalendar)


  $('#workSpaceM').trigger('resize')

 }else{


   ge.loadProject(mainCalendar)


  $('#workSpaceM').trigger('resize')


 }
 


 $(".ganttButtonBar button:lt(11) span").parent().show()
 $(".ganttButtonBar .ganttButtonSeparator:lt(6)").show()
 $(".ganttButtonBar button:lt(11) span").removeClass('hide')
 $(".calendarresource").removeClass('hide')
 $(".ganttButtonBar .ganttButtonSeparator:lt(6)").removeClass('hide')
 
 $(".deleteTrash").removeClass('hide')


 $(a).addClass('hide')
 $(a).siblings(".calendarcancel").removeClass('hide')
 $(a).siblings(".calendarsave").removeClass('hide')

 
 if(selectedCalendar  == "third"){


// this_data = JSON.parse(this_data)

$(".gdfTable tbody tr:not(.emptyRow) td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"><div style="display:flex;justify-content:space-around;align-items: center;"><img class="arrowIcon initArrow" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="chooseFile(this);">Local Upload</p><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></td>')

console.log(mainCalendar)

var countering = 0

var a = mainCalendar.tasks.map(function(a,index) { 


 countering = 1


 if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 0){



   $("tr[taskid='"+ a.id +"'] td.newth").remove()
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=pwacheck(this)>' + a.filename +'</a></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell">'+ a.layerdet.foldersinit +'</td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell">' + a.layerdet.getFileCount +'</td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell">'+ a.layerdet.folderSize +' MB</td>')


 }else if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 1){



   $("tr[taskid='"+ a.id +"'] td.newth").remove()
   $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell new_columns"><div style="display:flex;justify-content:space-around;align-items: center;"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=goToDoc(this)>' + a.filename +'</a><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><img class="arrowIcon" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file"  onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openImageEditor1(this);">Local Upload</p><p class="sss12 reupload" style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></div></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns">'+ a.layerdet.foldersinit +'</td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns">' + a.layerdet.getFileCount +'</td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns">'+ a.layerdet.folderSize +' MB</td>')

 }else if(a.id == 'tmp_fk1530990157598_1'){

   $("tr[taskid='tmp_fk1530990157598_1'] td.newth").empty()
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell 5"></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell 6"></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell 7"></td>')

 }else if(!a.filelocation){

   console.log(a.id)
   $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns"></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns"></td>')
   $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns"></td>')


 }


})



$('.insertUp , .insertDown').unbind().click(function(event) {
 /* Act on the event */
 console.log("ksssszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")

 if(selectedCalendar == 'third'){
   $("tbody .rowSelected").first().children("td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"><div style="display:flex;justify-content:space-around;align-items: center;"><img class="arrowIcon initArrow" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file"  onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="chooseFile(this);">Local Upload</p><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></td>')
   $("tbody .rowSelected").first().children("td:nth-child(5)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')
   $("tbody .rowSelected").first().children("td:nth-child(6)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')
   $("tbody .rowSelected").first().children("td:nth-child(7)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')

 }

//  setTimeout(function(){
//   $("tbody .rowSelected").first().children("td:nth-child(4)").children('input').val('새로운 일정')
// }, 500); 
});


$('.filearea > input').prop("disabled", false);


            // $(".taskEditRow th .taskRowIndex").remove()

            setTimeout(function(){
             $('.splitBox1').scrollTop(scrollTop)









           }, 10); 

          }



          $('.calendarcancel').removeClass('hide')
          $('.calendarsave').removeClass('hide')
          $('.calendaredit').addClass('hide')




 // $.ajax({
 //   url : '/assets/views/phppages/allProjectController.php?getLayerCount=getLayerCount',
 //   type : "get",
 //   async: false,
 //   success : function(data) {
 //     data = JSON.parse(data)
 //     console.log(data)

 //   },
 //   error: function() {
 //   }
 // });


 isEditing = 1

 // $(".loader").hide().fadeOut('slow');

 $(".formElements").removeClass('notedit')

 $(".formElements ").prop('disabled', false)

 $(".deleteTrash").removeClass('hide')

 $('.taskEditRow[taskid="'+ taskid +'"]').click()

 $('input').attr('autocomplete', 'off');


}





$('.loader').hide()



}


function stopedit(_global_usertype, initial){

 $(".formElements").addClass('notedit')
 $("#addResource").addClass('hide')
 $(".deleteTrash").addClass('hide')

      // $(".formElements ").prop('disabled', true)

      $('#resSaveButton').addClass('hide')



      if(selectedCalendar == "mainCalendar" && initial == 0){

        $.get("/assets/views/phppages/allProjectController.php?checkMainCalendarStatusOff=checkMainCalendarStatusOff" , function(data, status){



          inc = 0

          var obj = JSON.parse(data)



        })


      }

      if(selectedCalendar == "resourceCalendar" && initial == 0){

        $.get("/assets/views/phppages/allProjectController.php?checkResourceCalendarStatusOff=checkResourceCalendarStatusOff" , function(data, status){



          inc = 0

          var obj = JSON.parse(data)




        })


      }

      if(selectedCalendar == "ProjectCalendarMain" && initial == 0){

        $.get("/assets/views/phppages/allProjectController.php?checkProjectCalendarMainStatusOff=checkProjectCalendarMainStatusOff" , function(data, status){


          console.log(data)

          inc = 0

          var obj = JSON.parse(data)
          console.log(obj)



        })


      }

      if(selectedCalendar == "ProjectCalendarResource" && initial == 0){

        $.get("/assets/views/phppages/allProjectController.php?checkProjectCalendarResourceStatusOff=checkProjectCalendarResourceStatusOff" , function(data, status){


          console.log(data)

          inc = 0

          var obj = JSON.parse(data)
          console.log(obj)



        })


      }

      if(selectedCalendar == "third" && initial == 0){

        $.get("/assets/views/phppages/allProjectController.php?checkthirdStatusOff=checkthirdStatusOff" , function(data, status){




          inc = 0


        })


      }


      if(selectedCalendar == "third"){


       var taskid = $(".taskEditRow.rowSelected").attr('taskid')


       var scrollTop = $('.splitBox1').scrollTop()


  // console.trace();

  // $(".loader").show().fadeIn('slow');




  if(mainCalendar.tasks != null){

    mainCalendar.canWrite = false

    mainCalendar.canWriteOnParent = false


    mainCalendar.tasks.map(function(a,index) { 


      var fileName = a.filelocation;



      if(a.filelocation != undefined){

        var extension = fileName.split('.').pop(); 



        switch (extension) {
          case "docx":
          case "pptx":
          case "ppt":
          case "xls":
          case "xlsx":
          case "xlsm":
          case "odt":
          case "ods":
          case "odp":
          a.layerdet.isDoc = 1;
          break;

          default: 
          a.layerdet.isDoc = 0;

        }

      // console.log(a.layerdet.isDoc)


    } 

    a.canWrite = false
    a.canAdd = false
    a.canDelete = false

    if(a.id == "tmp_fk1530990157598_1"){
      a.canDelete = false
    }


  })




  }



  ge.loadProject(mainCalendar)



  
  $('#workSpaceM').trigger('resize')


  $('.calendarcancel').addClass('hide')
  $('.calendarsave').addClass('hide')
  $('.calendaredit').removeClass('hide')


  $(".deleteTrash").addClass('hide')


  $(".calendarresource").addClass('hide')
  $(".ganttButtonBar button:lt(11) span").addClass('hide')
  $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

  $(".ganttButtonBar button:lt(11) span").parent().hide()
  $(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()


  // $(a).addClass('hide')
  // $(a).siblings(".calendaredit").removeClass('hide')
  // $(a).siblings(".calendarsave").addClass('hide')


  
  if(selectedCalendar  == "third"){



    this_data = mainCalendar

    $(".gdfTable tbody tr:not(.emptyRow) td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"></td>')



    var a = this_data.tasks.map(function(a,index) { 



      if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 0){




        $("tr[taskid='"+ a.id +"'] td.newth").remove()
        $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell new_columns"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=pwacheck(this)>' + a.filename +'</a></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns">'+ a.layerdet.foldersinit +'</td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns">' + a.layerdet.getFileCount +'</td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns">'+ a.layerdet.folderSize +' MB</td>')


      }else if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 1){




        $("tr[taskid='"+ a.id +"'] td.newth").remove()
        $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell new_columns"><div style="display:flex;justify-content:space-around;align-items: center;"><a style="font-weight:normal" class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=goToDoc(this)>' + a.filename +'</a><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file"  onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openImageEditor1(this);">Local Upload</p><p class="sss12 reupload" style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></div></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns">'+ a.layerdet.foldersinit +'</td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns">' + a.layerdet.getFileCount +'</td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns">'+ a.layerdet.folderSize +' MB</td>')

      }else if(a.id == 'tmp_fk1530990157598_1'){

        $("tr[taskid='tmp_fk1530990157598_1'] td.newth").empty()
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell 5"></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell 6"></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell 7"></td>')

      }else if(!a.filelocation){

        $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns"></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns"></td>')
        $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns"></td>')


      }


    })



    $('.insertUp , .insertDown').unbind().click(function(event) {


      if(selectedCalendar == 'third'){
        $("tbody .rowSelected").first().children("td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"><div style="display:flex;justify-content:space-around;align-items: center;"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file"  onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="chooseFile(this);">Local Upload</p><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></td>')
        $("tbody .rowSelected").first().children("td:nth-child(5)").after('<td class="gdfCell newth" style="width: 200px!important"></td>')
        $("tbody .rowSelected").first().children("td:nth-child(6)").after('<td class="gdfCell newth" style="width: 200px!important"></td>')
        $("tbody .rowSelected").first().children("td:nth-child(7)").after('<td class="gdfCell newth" style="width: 200px!important"></td>')

      }
    });


    $('.filearea > input').prop("disabled", false);


    isEditing = 0

    setTimeout(function(){
      $('.splitBox1').scrollTop(scrollTop)

      $( ".taskEditRow[taskid='"+ taskid +"']" ).addClass('rowSelected')



    }, 10); 



  }

  // $(".loader").hide().fadeOut('slow');

}else{



  if(mainCalendar.tasks != null){

    mainCalendar.canWrite = false

    mainCalendar.canWriteOnParent = false


    mainCalendar.tasks.map(function(a,index) { 

      a.canWrite = false
      a.canAdd = false
      a.canDelete = false

      if(a.id == "tmp_fk1530990157598_1"){
        a.canDelete = false
      }


    })




  }


  ge.loadProject(mainCalendar)


  $('#workSpaceM').trigger('resize')

}

$(".deleteTrash").addClass('hide')


$(".calendarresource").addClass('hide')
$(".ganttButtonBar button:lt(11) span").addClass('hide')
$(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

$(".ganttButtonBar button:lt(11) span").parent().hide()
$(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()

isEditing = 0
$(".formElements").addClass('notedit')
$("#addResource").addClass('hide')
$(".deleteTrash").addClass('hide')

      // $(".formElements ").prop('disabled', true)

      $('#resSaveButton').addClass('hide')


      $('.calendarcancel').addClass('hide')
      $('.calendarsave').addClass('hide')
      $('.calendaredit').removeClass('hide')


      if(gm_value == 1  && _global_usertype == 2 || _global_usertype == 3){

        $(".calendaredit").removeClass('hide')

        console.log('lever clicked on')

      }else if(gm_value == 0 && _global_usertype == 2){



        console.log('hiding it')

        $(".calendaredit").addClass('hide')

        console.log('lever clicked off')


      }

      $('.loader').hide()



    }


    function eventDelete(){



      console.trace();


        if($(".taskEditRow.rowSelected").attr('taskid')){


    console.log("-----------deleteeventp-----------------")


    var taskid = $(".taskEditRow.rowSelected").attr('taskid')


      $('#workSpaceM').trigger('deleteFocused.gantt');




    var zz = []


    mainCalendar.tasks.map(function(a,index) { 
      if(a.id == taskid){

        console.log("sss")

        zz = a


        mainCalendar.tasks.splice(index,1)


      }
    })


    mainCalendar.tasks.map(function(a,index) { 
      if(a.id == taskid){

        mainCalendar.tasks.splice(index, 1);


      }
    })


    console.log(mainCalendar)


        console.log(mainCalendar.tasks)





  console.log(zz)
  console.log(mainCalendar)

  if(zz == undefined){
    zz.folderlocation = "null"
  }
  if(zz == undefined){
    zz.filelocation = "null"

  }



        if(selectedCalendar == "third"){




          $.ajax({
            url : '/assets/views/phppages/allProjectController.php?deleteFolder=deleteFolder&location='+zz.folderlocation + '&filelocation='+zz.filelocation,
            type : "get",
            async: false,
            success : function(data) {
              data = JSON.parse(data)
              console.log(data)


          saveGanttOnServer(0)

              if(data.status == "success" || data.status == "404"){




              }


            }


          })

        }


      }

//   if(selectedCalendar == "third"){


//   // poll_xhr.abort()


//   // $(".loader").show().fadeIn('slow');

//   if($(".taskEditRow.rowSelected").attr('taskid')){


//     console.log("-----------deleteeventp-----------------")


//     var taskid = $(".taskEditRow.rowSelected").attr('taskid')


//     console.log(taskid)

//     var zz = []




//     // mainCalendar.tasks.map(function(a,index) { 
//     //   if(a.id == taskid){

//     //     mainCalendar.tasks.splice(index, 1);


//     //   }
//     // })


//     // console.log(mainCalendar)


//     //     console.log(mainCalendar.tasks)



//     // mainCalendar.tasks.map(function(a,index) { 
//     //   if(a.id == taskid){

//     //     console.log("sss")

//     //     zz = a


//     //     mainCalendar.tasks.splice(index,1)


//     //   }
//     // })


//   // alert(zz.folderlocation)
//   console.log(zz)

//   if(zz == undefined){
//     zz.folderlocation = "null"
//   }
//   if(zz == undefined){
//     zz.filelocation = "null"

//   }


//   console.log(mainCalendar)

//       console.log(mainCalendar.tasks)

//   $.ajax({
//     url : '/assets/views/phppages/allProjectController.php?deleteFolder=deleteFolder&location='+zz.folderlocation + '&filelocation='+zz.filelocation,
//     type : "get",
//     async: false,
//     success : function(data) {
//       data = JSON.parse(data)
//       console.log(data)



//       if(data.status == "success" || data.status == "404"){


//         var project = []
//         var tasks = []

//         var currentState = ge.saveProject()

//         project = currentState

//         console.log(mainCalendar.tasks)


//     mainCalendar.tasks.map(function(a,index) { 
//       if(a.id == taskid){

//         console.log("sss")

//         zz = a


//         mainCalendar.tasks.splice(index,1)


//       }
//     })



//         console.log(tasks)
//         console.log(mainCalendar.tasks)


//         var a = mainCalendar.tasks

//         project.tasks = tasks



//   //                 ge.loadProject(mainCalendar);
//   // ge.checkpoint(); //empty the undo stack

// console.log(a)

//   mainCalendar.tasks = a


//   $(".ganttButtonBar button:lt(11) span").parent().show()
//   $(".ganttButtonBar .ganttButtonSeparator:lt(6)").show()
//   $(".ganttButtonBar button:lt(11) span").removeClass('hide')
//   $(".calendarresource").removeClass('hide')
//   $(".ganttButtonBar .ganttButtonSeparator:lt(6)").removeClass('hide')

//   $(".deleteTrash").removeClass('hide')


//   $(a).addClass('hide')
//   $(a).siblings(".calendarcancel").removeClass('hide')
//   $(a).siblings(".calendarsave").removeClass('hide')


// console.log(mainCalendar)
//   if(selectedCalendar  == "third"){


// // this_data = JSON.parse(this_data)

// console.log(mainCalendar)
// $(".gdfTable tbody tr:not(.emptyRow) td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"><div style="display:flex;justify-content:space-around;align-items: center;"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="chooseFile(this);">Local Upload</p><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></td>')

// console.log("check here")
// console.log(mainCalendar)

// // var a = mainCalendar.tasks.map(function(a,index) { 

// //   console.log('here')
// //   console.log(a)

// //   if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet){
// //   // if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 0){


// //     console.log("Normal")

// //     $("tr[taskid='"+ a.id +"'] td.newth").remove()
// //     $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell new_columns"><a style="font-weight:normal" class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=pwacheck(this)>' + a.filename +'</a></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns">'+ a.layerdet.foldersinit +'</td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns">' + a.layerdet.getFileCount +'</td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns">'+ a.layerdet.folderSize +' MB</td>')


// //   }else if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 1){


// //     console.log("Normal")


// //     $("tr[taskid='"+ a.id +"'] td.newth").remove()
// //     $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell new_columns"><div style="display:flex;justify-content:space-around;align-items: center;"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=goToDoc(this)>' + a.filename +'</a><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openImageEditor1(this);">Local Upload</p><p class="sss12 reupload" style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></div></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns">'+ a.layerdet.foldersinit +'</td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns">' + a.layerdet.getFileCount +'</td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns">'+ a.layerdet.folderSize +' MB</td>')



// //   }else if(a.id == 'tmp_fk1530990157598_1'){

// //     $("tr[taskid='tmp_fk1530990157598_1'] td.newth").empty()
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell 5"></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell 6"></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell 7"></td>')

// //   }else if(!a.filelocation){

// //     $("tr[taskid='"+ a.id +"'] td.new_columns").remove()
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell new_columns"></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell new_columns"></td>')
// //     $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell new_columns"></td>')


// //   }


// // })



// $('.insertUp , .insertDown').unbind().click(function(event) {
//   /* Act on the event */
//   console.log("kssss")

//   if(selectedCalendar == 'third'){
//     $("tbody .rowSelected").first().children("td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"><div style="display:flex;justify-content:space-around;align-items: center;"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="chooseFile(this);">Local Upload</p><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></td>')
//     $("tbody .rowSelected").first().children("td:nth-child(5)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')
//     $("tbody .rowSelected").first().children("td:nth-child(6)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')
//     $("tbody .rowSelected").first().children("td:nth-child(7)").after('<td class="gdfCell newth" style="width: 85px!important"></td>')

//   }

//  //  setTimeout(function(){
//  //   $("tbody .rowSelected").first().children("td:nth-child(4)").children('input').val('새로운 일정')
//  // }, 500); 
// });


// $('.filearea > input').prop("disabled", false);

// }


//  // $(".taskEditRow th .taskRowIndex").remove()

// var counterValue = counter * defaultCount

// for(i = 0; i < mainCalendar.tasks.length; i++){

//  counterValue++

//  $('input').attr('autocomplete', 'off');
//  $('.taskEditRow .taskRowIndex').show()
// }

// $('.calendarcancel').removeClass('hide')
// $('.calendarsave').removeClass('hide')
// $('.calendaredit').addClass('hide')




//   // $.ajax({
//   //   url : '/assets/views/phppages/allProjectController.php?getLayerCount=getLayerCount',
//   //   type : "get",
//   //   async: false,
//   //   success : function(data) {
//   //     data = JSON.parse(data)
//   //     console.log(data)

//   //   },
//   //   error: function() {
//   //   }
//   // });


//   isEditing = 1

//   // $(".loader").hide().fadeOut('slow');

//   $(".formElements").removeClass('notedit')

//   $(".formElements ").prop('disabled', false)

//   $(".deleteTrash").removeClass('hide')

//   $('.taskEditRow[taskid="'+ taskid +'"]').click()

//   $('input').attr('autocomplete', 'off');

//   $('.taskEditRow .taskRowIndex').hide()


//  // $(".taskEditRow th .taskRowIndex").remove()

//   ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});


//         // do something when a user gets 50% of the way down my page

//         setTimeout(function(){ 
//           var counterValue = counter * defaultCount

//           for(i = 0; i < project.tasks.length; i++){

//            counterValue++

//            // $('.taskEditRow .taskRowIndex').eq(i).text(counterValue)

//              // $(".taskEditRow th").eq(i).prepend('<span class="taskRowIndex">' + counterValue +'</span>')
//            $('input').attr('autocomplete', 'off');
//            $('.taskEditRow .taskRowIndex').show()
//          }

//          call = 0}, 200);

//       }



//       if(data.status == "success"){

//         filecount--

//         console.log(filecount)
//         console.log('mahai')


//         $('#workSpaceM').trigger('deleteFocused.gantt');

//         saveGanttOnServer(0)

//       }else if(data.status == "failed"){

//         $("#eventNotDeleted-modal").removeClass('close')

//       }else if(data.status == "404"){

//         $('#workSpaceM').trigger('deleteFocused.gantt');

//         saveGanttOnServer(0)

//       }

//             console.log(mainCalendar.tasks)


//       // poll("2018-09-14 18:58:53", "1537092121")

//     },
//     error: function() {
//        // connectionError();
//      }
//    });


// }


// // loadFromLocalStorage(gm_value,_global_usertype)

// // $(".loader").hide().fadeOut('slow');

// }else{


//   $(".loader").show().fadeIn('slow');

//   if($(".taskEditRow.rowSelected").attr('taskid')){


//     console.log("-----------deleteeventp-----------------")


//     var taskid = $(".taskEditRow.rowSelected").attr('taskid')


//     console.log(taskid)

//     var zz

//     mainCalendar.tasks.map(function(a,index) { 
//       if(a.id == taskid){

//         console.log("sss")

//         zz = a


//       }
//     })


//   // alert(zz.folderlocation)
//     console.log(zz)

//     if(selectedCalendar == "mainCalendar" || selectedCalendar == "resourceCalendar"){

//     $('#workSpace').trigger('deleteFocused.gantt');

//     }else{

//     $('#workSpaceM').trigger('deleteFocused.gantt');

//     }


//     $.ajax({
//       url : '/assets/views/phppages/allProjectController.php?deleteFolder=deleteFolder&location='+zz.folderlocation + '&filelocation='+zz.filelocation,
//       type : "get",
//       async: false,
//       success : function(data) {
//         data = JSON.parse(data)
//         console.log(data)

//         saveGanttOnServer(0)


//       },
//       error: function() {
//        connectionError();
//      }
//    });


//   }

//   $(".loader").hide().fadeOut('slow');

// }

}


function loadFromLocalStorage(gm_value,_global_usertype) {
  var ret;

  $(".loader").show().fadeIn('slow');




  // if(mainCalendar != "" && mainCalendar != null){

  //   parsed  = JSON.parse(mainCalendar)
  //       ret = parsed

  //       console.log(ret)

  
  // }else{

  //   console.log("zzz")

  //   ret = {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":true,"canAdd":true,"canDelete":true,"canAddIssue":true,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":true,"canWriteOnParent":true,"zoom":"1M"}



  // }

  console.log("zz")
  console.log(selectedCalendar)



  if( selectedCalendar  == "resourceCalendar" ){


    $.ajax({
      url : '/assets/views/phppages/allProjectController.php?getGanttResource=getGanttResource',
      type : "get",
      async: false,
      success : function(data) {
        data = JSON.parse(data)
        console.log(data)


        calendar_firstLoad = 0


        $('.calendarButtons').hide()



        if(data.length == 0 || data["0"].value == ""){


          ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

          mainCalendar = ret

          var offset=new Date().getTime()-mainCalendar.tasks[0].start;
          
          mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;

        }else{

          mainCalendar = JSON.parse(data["0"].value)

          ret = mainCalendar

        }





        stopedit('undefined',1)


           // var offset=new Date().getTime()-mainCalendar.tasks[0].start;
           mainCalendar.canWrite = false
           mainCalendar.canWriteOnParent = false
           for (var i=0;i<mainCalendar.tasks.length;i++) {
            // mainCalendar.tasks[i].start = mainCalendar.tasks[i].start + offset;
            mainCalendar.tasks[i].canWrite = false
            mainCalendar.tasks[i].canAdd = false
            mainCalendar.tasks[i].canDelete = false

            if(mainCalendar.tasks[i].id == "tmp_fk1530990157598_1"){
              mainCalendar.tasks[i].canDelete = false
            }

          }







          $('.insertUp , .insertDown').unbind().click(function(event) {
            /* Act on the event */
            console.log("k")


    //   setTimeout(function(){
    //  $("tbody .rowSelected").first().children("td:nth-child(4)").children('input').val('새로운 일정')
    // }, 500); 
  });

  // if (!mainCalendar.canWrite)
  //   $(".ganttButtonBar button.requireWrite").attr("disabled","true");

  ge.loadProject(mainCalendar);
  ge.checkpoint(); //empty the undo stack



  $('#workSpaceM').trigger('resize')

  var _global_usertype,_global_userinvited,_global_supervisor


  jQuery.ajax({
    url: "/assets/views/phppages/allProjectController.php?getUserType=getUserType",
    async: false,
    success: function (data) {


      console.log("datssssssssssssssssssssssssssssssa")
      console.log(data)
      var obj = JSON.parse(data)
      console.log(obj)

      if(obj.INVITED == 1){

        console.log("zzzzz")

        $scope.isInspector = true



        console.log('hiding it')

        $(".calendaredit").addClass('hide')


      }

      _global_usertype = obj.USERTYPE 
      _global_userinvited = obj.INVITED 
      _global_supervisor = obj.SUPERVISOR 
      _global_owner = obj.OWNER 



          // $(".requireWrite").removeClass('hide')
          $(".buttons>a").addClass('hide')

          $("#fullscrbtn").addClass('hide')
          $(".newproject").addClass('hide')
          $(".ganttButtonBar button:lt(11) span").addClass('hide')
          $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

          if(  _global_usertype == 3 ||  _global_usertype == 2 ){




            console.log('hiding it')
            $(".calendaredit").addClass('hide')

   //   $('button').prop("disabled", true);
   // $(".requireCanWrite").hide()

          // $(".requireWrite.first").addClass('hide')
   //  $('button').removeAttr("disabled");

 }else{

     // $('button').prop("disabled", true);
     $(".requireCanWrite").show()
     $('button').removeAttr("disabled");
          // $(".requireWrite.first").removeClass('hide')

        }
      }
    })


  $(".deleteTrash").addClass('hide')

  $(".requireCanWrite").show()
  ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});

  $('button').removeAttr("disabled");


  $('body').unbind().on('DOMNodeInserted', '.bwinPopupd', function () {

    if(  _global_usertype == 3 ||  _global_usertype == 2){

      console.log('this')

      $(".bwinPopupd table th:nth-child(4)").hide()
      $(".delAssig ").parent().hide()
      $(".deleteTrash").addClass('hide')


    }else{



      if(!$(".calendaredit").hasClass('hide')){

       $(".bwinPopupd table th:nth-child(4)").hide()
       $(".delAssig ").parent().hide()
       $(".deleteTrash").addClass('hide')

     }else{

       $(".bwinPopupd table th:nth-child(4)").show()
       $(".delAssig ").parent().show()
       $(".deleteTrash").removeClass('hide')

     }



   }

 });

  $(".calendarresource").removeClass('hide')

  $(".ganttButtonBar button:lt(11) span").parent().hide()
  $(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()

  $(document).unbind().on('click','.editresource',function(){

    if($scope.isInspector==true){

      $('#resSaveButton').addClass('hide')
      $('#addResource').addClass('hide')

    }else{


      $('#resSaveButton').removeClass('hide')
      $('#addResource').removeClass('hide')

    }


  })



},
error: function() {
 connectionError();
}
});




}else if( selectedCalendar  == "mainCalendar" ){


 $.ajax({
  url : '/assets/views/phppages/allProjectController.php?getGantt=getGantt',
  type : "get",
  async: false,
  success : function(data) {

    console.log(data)

    data = JSON.parse(data)
    console.log(data)


    calendar_firstLoad = 0



    $('.calendarButtons').hide()



    if(data.length == 0 || data["0"].value == ""){


      ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

      mainCalendar = ret

      var offset=new Date().getTime()-mainCalendar.tasks[0].start;

      mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;

    }else{

      mainCalendar = JSON.parse(data["0"].value)

      ret = mainCalendar

    }





    stopedit()



           // var offset=new Date().getTime()-mainCalendar.tasks[0].start;
           mainCalendar.canWrite = false
           mainCalendar.canWriteOnParent = false
           for (var i=0;i<mainCalendar.tasks.length;i++) {
            // mainCalendar.tasks[i].start = mainCalendar.tasks[i].start + offset;
            mainCalendar.tasks[i].canWrite = false
            mainCalendar.tasks[i].canAdd = false
            mainCalendar.tasks[i].canDelete = false

            if(mainCalendar.tasks[i].id == "tmp_fk1530990157598_1"){
              mainCalendar.tasks[i].canDelete = false
            }

          }







          $('.insertUp , .insertDown').unbind().click(function(event) {
            /* Act on the event */
            console.log("k")


    //   setTimeout(function(){
    //  $("tbody .rowSelected").first().children("td:nth-child(4)").children('input').val('새로운 일정')
    // }, 500); 
  });

  // if (!mainCalendar.canWrite)
    // $(".ganttButtonBar button.requireWrite").attr("disabled","true");

    ge.loadProject(mainCalendar);
  ge.checkpoint(); //empty the undo stack



  $('#workSpaceM').trigger('resize')

  var _global_usertype,_global_userinvited,_global_supervisor


  jQuery.ajax({
    url: "/assets/views/phppages/allProjectController.php?getUserType=getUserType",
    async: false,
    success: function (data) {

      calendar_firstLoad = 0


      console.log("datssssssssssssssssssssssssssssssa")
      console.log(data)
      var obj = JSON.parse(data)
      console.log(obj)

      if(obj.INVITED == 1){

        console.log("zzzzz")

        $scope.isInspector = true



        console.log('hiding it')

        $(".calendaredit").addClass('hide')


      }

      _global_usertype = obj.USERTYPE 
      _global_userinvited = obj.INVITED 
      _global_supervisor = obj.SUPERVISOR 
      _global_owner = obj.OWNER 



          // $(".requireWrite").removeClass('hide')
          $(".buttons>a").addClass('hide')

          $("#fullscrbtn").addClass('hide')
          $(".newproject").addClass('hide')
          $(".ganttButtonBar button:lt(11) span").addClass('hide')
          $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

          if(  _global_usertype == 3 ||  _global_usertype == 2 ){



            console.log('hiding it')

            $(".calendaredit").addClass('hide')

   //   $('button').prop("disabled", true);
   // $(".requireCanWrite").hide()

          // $(".requireWrite.first").addClass('hide')
   //  $('button').removeAttr("disabled");

 }else{

     // $('button').prop("disabled", true);
     $(".requireCanWrite").show()
     $('button').removeAttr("disabled");
          // $(".requireWrite.first").removeClass('hide')

        }
      }
    })


  $(".deleteTrash").addClass('hide')

  $(".requireCanWrite").show()
  ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});

  $('button').removeAttr("disabled");


  $('body').unbind().on('DOMNodeInserted', '.bwinPopupd', function () {

    if(  _global_usertype == 3 ||  _global_usertype == 2){

      console.log('this')

      $(".bwinPopupd table th:nth-child(4)").hide()
      $(".delAssig ").parent().hide()
      $(".deleteTrash").addClass('hide')


    }else{



      if(!$(".calendaredit").hasClass('hide')){

       $(".bwinPopupd table th:nth-child(4)").hide()
       $(".delAssig ").parent().hide()
       $(".deleteTrash").addClass('hide')

     }else{

       $(".bwinPopupd table th:nth-child(4)").show()
       $(".delAssig ").parent().show()
       $(".deleteTrash").removeClass('hide')

     }



   }

 });

  $(".calendarresource").removeClass('hide')

  $(".ganttButtonBar button:lt(11) span").parent().hide()
  $(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()

  $(document).unbind().on('click','.editresource',function(){

    if($scope.isInspector==true){

      $('#resSaveButton').addClass('hide')
      $('#addResource').addClass('hide')

    }else{


      $('#resSaveButton').removeClass('hide')
      $('#addResource').removeClass('hide')

    }


  })





  


  $(".loader").hide().fadeOut('slow');

},
error: function() {
 connectionError();
}
});




}else if(selectedCalendar  == "ProjectCalendarMain"){




  $.ajax({
    url : '/assets/views/phppages/allProjectController.php?getGanttProjectCalendarMain=getGanttProjectCalendarMain',
    type : "get",
    async: false,
    success : function(data) {
      data = JSON.parse(data)
      console.log(data)

      calendar_firstLoad = 0


      $('.calendarButtons').hide()

      if(data.length == 0){

        ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

        mainCalendar = ret

        var offset=new Date().getTime()-mainCalendar.tasks[0].start;

        mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;


      }else if(data['0'].value.length == 0){


        ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

        mainCalendar = ret

        var offset=new Date().getTime()-mainCalendar.tasks[0].start;

        mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;

      }else{

        mainCalendar = JSON.parse(data["0"].value)

        _global_usertype = data['0'].usertype
      }




            // stopedit()



           // var offset=new Date().getTime()-mainCalendar.tasks[0].start;
           mainCalendar.canWrite = false
           mainCalendar.canWriteOnParent = false
           for (var i=0;i<mainCalendar.tasks.length;i++) {
            // mainCalendar.tasks[i].start = mainCalendar.tasks[i].start + offset;
            mainCalendar.tasks[i].canWrite = false
            mainCalendar.tasks[i].canAdd = false
            mainCalendar.tasks[i].canDelete = false

            if(mainCalendar.tasks[i].id == "tmp_fk1530990157598_1"){
              mainCalendar.tasks[i].canDelete = false
            }

          }





          if (!mainCalendar.canWrite)
            $(".ganttButtonBar button.requireWrite").attr("disabled","true");



          ge.loadProject(mainCalendar);
  ge.checkpoint(); //empty the undo stack


  $(".calendarsave").addClass('hide')
  $(".calendaredit").removeClass('hide')
  $(".calendarcancel").addClass('hide')


  console.log("asssssssssssssssssssssssssssssssssssssssssssss")



  $('#workSpaceM').trigger('resize')

          // $(".requireWrite").removeClass('hide')
          $(".buttons>a").addClass('hide')

          $("#fullscrbtn").addClass('hide')
          $(".newproject").addClass('hide')
          $(".ganttButtonBar button:lt(11) span").addClass('hide')
          $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

          console.log(_global_usertype)

          console.log('%c' +  _global_usertype , 'background: #222; color: #bada55');
          console.log('%c' +  gm_value , 'background: #222; color: #bada55');

          if(  _global_usertype == 3){



            console.log('hiding it')

            $(".calendaredit").addClass('hide')

   //   $('button').prop("disabled", true);
   // $(".requireCanWrite").hide()

          // $(".requireWrite.first").addClass('hide')
   //  $('button').removeAttr("disabled");

 }else{

  // $('button').prop("disabled", true);
  $(".requireCanWrite").show()
  $('button').removeAttr("disabled");
          // $(".requireWrite.first").removeClass('hide')

        }



        $(".deleteTrash").addClass('hide')

        $(".requireCanWrite").show()
        ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});

        $('button').removeAttr("disabled");



        $(".calendarresource").addClass('hide')
        $(".ganttButtonBar button:lt(11) span").addClass('hide')
        $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

        $(".ganttButtonBar button:lt(11) span").parent().hide()

        $(".formElements").addClass('notedit')
        $("#addResource").addClass('hide')
        $(".deleteTrash").addClass('hide')

      // $(".formElements ").prop('disabled', true)

      $(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()


      $(".gdfTable").addClass('mainstyle')
      $(".gdfTable").addClass('firststyle')

      $(".gdfTable").removeClass('thirdstyle')
      $(".gdfTable").removeClass('secondstyle')

      $(".splitBox2").addClass('firststyle')
      $(".splitBox2").removeClass('secondstyle')
      $(".splitBox2").removeClass('thirdstyle')

      $(".splitElement.vSplitBar").addClass('firststyle')
      $(".splitElement.vSplitBar").removeClass('secondstyle')
      $(".splitElement.vSplitBar").removeClass('thirdstyle')



      $(".newth").remove()


      $(".splitterContainer").height($(".splitElement")[0].scrollHeight)

      $("#lock-toggle").addClass('hide')
      $("#switch-text").addClass('hide')








      $(".loader").hide().fadeOut('slow');





      $(".loader").hide().fadeOut('slow');

    },
    error: function() {
     connectionError();
   }
 });




}
else if(selectedCalendar  == "ProjectCalendarResource"){


  $.ajax({
    url : '/assets/views/phppages/allProjectController.php?getGanttProjectCalendarResource=getGanttProjectCalendarResource',
    type : "get",
    async: false,
    success : function(data) {
      data = JSON.parse(data)
      console.log(data)


      $('.calendarButtons').hide()

      calendar_firstLoad = 0


      if(data.length == 0){

        ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

        mainCalendar = ret


        var offset=new Date().getTime()-mainCalendar.tasks[0].start;

        mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;


      }else if(data['0'].value.length == 0){


        ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

        mainCalendar = ret


        var offset=new Date().getTime()-mainCalendar.tasks[0].start;

        mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;

      }else{

        mainCalendar = JSON.parse(data["0"].value)

        ret = mainCalendar

      }

      stopedit()



           // var offset=new Date().getTime()-mainCalendar.tasks[0].start;
           mainCalendar.canWrite = false
           mainCalendar.canWriteOnParent = false
           for (var i=0;i<mainCalendar.tasks.length;i++) {
            // mainCalendar.tasks[i].start = mainCalendar.tasks[i].start + offset;
            mainCalendar.tasks[i].canWrite = false
            mainCalendar.tasks[i].canAdd = false
            mainCalendar.tasks[i].canDelete = false

            if(mainCalendar.tasks[i].id == "tmp_fk1530990157598_1"){
              mainCalendar.tasks[i].canDelete = false
            }

          }





          if (!mainCalendar.canWrite)
            $(".ganttButtonBar button.requireWrite").attr("disabled","true");



          ge.loadProject(mainCalendar);
  ge.checkpoint(); //empty the undo stack


  console.log("asssssssssssssssssssssssssssssssssssssssssssss")



  $('#workSpaceM').trigger('resize')


  stopedit()



  // $(".calendarsave").addClass('hide')
  // $(".calendaredit").removeClass('hide')
  // $(".calendarcancel").addClass('hide')


          // $(".requireWrite").removeClass('hide')
          $(".buttons>a").addClass('hide')

          $("#fullscrbtn").addClass('hide')
          $(".newproject").addClass('hide')
          $(".ganttButtonBar button:lt(11) span").addClass('hide')
          $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

          console.log(_global_usertype)

          console.log('%c' +  _global_usertype , 'background: #222; color: #bada55');
          console.log('%c' +  gm_value , 'background: #222; color: #bada55');

          if(  _global_usertype == 3 ){


            console.log('%c' +  gm_value , 'background: #222; color: #bada55');



            console.log('hiding it')

            $(".calendaredit").addClass('hide')

   //   $('button').prop("disabled", true);
   // $(".requireCanWrite").hide()

          // $(".requireWrite.first").addClass('hide')
   //  $('button').removeAttr("disabled");

 }else{

  // $('button').prop("disabled", true);
  $(".requireCanWrite").show()
  $('button').removeAttr("disabled");
          // $(".requireWrite.first").removeClass('hide')

        }



        $(".deleteTrash").addClass('hide')

        $(".requireCanWrite").show()
        ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});

        $('button').removeAttr("disabled");


        $(".calendarresource").addClass('hide')
        $(".ganttButtonBar button:lt(11) span").addClass('hide')
        $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

        $(".ganttButtonBar button:lt(11) span").parent().hide()
        $(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()

        $(".formElements").addClass('notedit')
        $("#addResource").addClass('hide')

        $(".deleteTrash").addClass('hide')

      // $(".formElements ").prop('disabled', true)



      $(".gdfTable").addClass('mainstyle')
      $(".gdfTable").addClass('secondstyle')
      
      $(".gdfTable").removeClass('thirdstyle')
      $(".gdfTable").removeClass('firststyle')

      $(".splitBox2").addClass('secondstyle')

      $(".splitBox2").removeClass('firststyle')

      $(".splitElement.vSplitBar").addClass('secondstyle')

      $(".splitElement.vSplitBar").removeClass('firststyle')

      $(".splitElement.vSplitBar").removeClass('thirdstyle')


      $(".newth").remove()



      $(".splitterContainer").height($(".splitElement")[0].scrollHeight)

      $("#lock-toggle").addClass('hide')
      $("#switch-text").addClass('hide')




      $(".loader").hide().fadeOut('slow');

    },
    error: function() {
     connectionError();
   }
 });



}
else if(selectedCalendar  == "third"){








                    }


  // $.ajax({
  //   url : '/assets/views/phppages/allProjectController.php?getGanttProjectCalendarThird=getGanttProjectCalendarThird&drwPage=' + 0,
  //   type : "get",
  //     // async: false,
  //     success : function(data) {


  

        // data = JSON.parse(data)

        




}


Android.showToast('getData');


           function calendar1(a){

                        console.log("JAVA")
                        console.log(a)


                        data = a


                            calendar_firstLoad = 0

        $(".loader").show().fadeIn('slow');


        if(!data.hasOwnProperty('value')){
          console.log('noval')
        }else{
          console.log('valeu')
        }

        totalfolderSize = data.totalfolderSize
        totalgetFileCount = data.totalgetFileCount
        totalfolderinit = data.totalfolderinit


        counter = 0


        $('.calendarButtons').show()
        $('.go_prev').addClass('hide')


        console.log(totalfolderSize)
        console.log(totalgetFileCount)
        console.log(totalfolderinit)


        _global_usertype = data.user_type


        filecount = 0





        console.log(filecount)





                   // // if(data.length != 0 || data.value != "" && data.value != '{"tasks":null}'){
                   //   if(data.length == 0 || data.value == '{"tasks":null}' || !data.hasOwnProperty('value')){


                   //    console.log('is it here?')


                   //    ret =  {"tasks":[{"id":"tmp_fk1530990157598_1","name":"일정전체","progress":0,"progressByWorklog":false,"relevance":0,"type":"","typeId":"","description":"","code":"","level":0,"status":"STATUS_ACTIVE","depends":"","start":1531074600000,"duration":1,"end":1531160999999,"startIsMilestone":false,"endIsMilestone":false,"collapsed":false,"canWrite":false,"canAdd":false,"canDelete":false,"canAddIssue":false,"assigs":[]}],"selectedRow":0,"deletedTaskIds":[],"resources":[{"id":"tmp_1","name":"자원명"}],"roles":[{"id":"tmp_1","name":"시공인력"},{"id":"tmp_2","name":"장비"},{"id":"tmp_3","name":"품질검수"},{"id":"tmp_4","name":"발주처"},{"id":"tmp_5","name":"관리자"},{"id":"tmp_6","name":"기타"}],"canWrite":false,"canWriteOnParent":false,"zoom":"1M"}

                   //    mainCalendar = ret



                   //    var offset=new Date().getTime()-mainCalendar.tasks[0].start;

                   //    mainCalendar.tasks[0].start = mainCalendar.tasks[0].start + offset;


                   //    var originalTask = ret;

                   //    originalTaskData = ret

                   //    if(data.value == '{"tasks":null}' && (gm_value == 0 || gm_value == 0)){
                   //     gm_value = data["0"].gm_value;

                   //     console.log(gm_value)
                   //   }


                   // }else{

                    // gm_value = data["0"].gm_value;

                    console.log(gm_value)


                    console.log('or it here?')

                    console.log(a)


                    // var originalTask = JSON.parse(a.replace(/\r?\n|\r/g, ''));

                    var originalTask = a
                    
                    originalTaskData = a


                    mainCalendar = a


                    mainCalendar.canWrite = false
                    mainCalendar.canWriteOnParent = false





                    mainCalendar.tasks.map(function(a,index) { 





                      a.canWrite = false
                      a.canAdd = false
                      a.canDelete = false

                      if(a.id == "tmp_fk1530990157598_1"){
                        a.canDelete = false
                      }


                      if(a.filelocation){

                        filecount++

                      }


                    })






                    ret = mainCalendar





                    var tasks = []

                    for(i = 0; i < mainCalendar.tasks.length; i++){


                      if(mainCalendar.tasks[i].id == undefined){

                        mainCalendar.tasks[i].id = UniqueValue(10)

                      }

                      if(mainCalendar.tasks[i].level == undefined){
                        mainCalendar.tasks[i].level = 1

                      }


                      if(i >= 0 && i < defaultCount){
                       tasks.push(mainCalendar.tasks[i]);
                     }

                   }


                   console.log(tasks)

                   console.log(mainCalendar)
                   console.log(originalTask)

                   mainCalendar.tasks = tasks

                   console.log(mainCalendar)
                   console.log(mainCalendar)



                //  var offset=new Date().getTime()-ret.tasks[0].start;
                //  for (var i=0;i<ret.tasks.length;i++) {
                //   ret.tasks[i].start = ret.tasks[i].start + offset;
                // }


              // }







              if (!ret.canWrite)
                $(".ganttButtonBar button.requireWrite").attr("disabled","true");



              ge.loadProject(ret);
  ge.checkpoint(); //empty the undo stack


  $('#workSpaceM').trigger('resize')


  console.log(gm_value)
  console.log( $("#leverValue").val())

  // if(gm_value == 0 && _global_usertype == 2){


    // $(".calendaredit").addClass('close')


 //  }else if(gm_value == 1 && _global_usertype == 2){


   $(".calendaredit").removeClass('close')


 // }



 console.log(_global_usertype)

 $("#lock-toggle").removeClass('hide')
 $("#switch-text").removeClass('hide')


 if(_global_usertype == 2 ||_global_usertype == 3){

  $("#lock-toggle").addClass('hide')
  $("#switch-text").addClass('hide')

}

$(".calendarcancel").addClass('hide')

console.log("asssssssssssssssssssssssssssssssssssssssssssss")




          // $(".requireWrite").removeClass('hide')
          $(".buttons>a").addClass('hide')

          $("#fullscrbtn").addClass('hide')
          $(".newproject").addClass('hide')
          $(".ganttButtonBar button:lt(11) span").addClass('hide')
          $(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

          if(  _global_usertype == 3 ){




            console.log('hiding it')


            // $(".calendaredit").addClass('hide')

   //   $('button').prop("disabled", true);
   // $(".requireCanWrite").hide()

          // $(".requireWrite.first").addClass('hide')
   //  $('button').removeAttr("disabled");

 }else{

  // $('button').prop("disabled", true);
  $(".requireCanWrite").show()
  $('button').removeAttr("disabled");
          // $(".requireWrite.first").removeClass('hide')

        }



        $(".deleteTrash").addClass('hide')


        ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});

        $('button').removeAttr("disabled");





        ge.editor.element.oneTime(100, "cl", function () {$(this).find("tr.emptyRow:first").click()});


        if($(".gdfColHeader").hasClass('newhead') == true){



          $(".newhead").remove()



        }

        $('.ganttFixHead th:nth-child(3)').html('코드명')
        $('.ganttFixHead th:nth-child(4)').html('일정명')

        $(".gdfTable thead th:nth-child(4)").after('<th class="gdfColHeader newth newhead filearea gdfied unselectable" style="width: 200px!important"><p style="white-space:initial" id="newth-0">파일명</p><span>'+ filecount +'</span></th>');
        $(".gdfTable thead th:nth-child(5)").after('<th class="gdfColHeader newth newhead gdfied unselectable" style="width: 85px!important"><p id="newth-1">첨부레이어</p><span>'+ totalfolderinit +'</span></th>');
        $(".gdfTable thead th:nth-child(6)").after('<th id="newth-2"  class="gdfColHeader newth newhead gdfied unselectable" style="width: 85px!important"><p style="white-space:initial" id="newth-2">첨부이미지</p><span>'+ totalgetFileCount +'</span></th>');
        $(".gdfTable thead th:nth-child(7)").after('<th id="newth-3"  class="gdfColHeader newth newhead gdfied unselectable" style="width: 85px!important"><p style="white-space:initial" id="newth-3">점유용량</p><span>'+ (totalfolderSize/1000).toFixed(2) +' GB</span></th>');

// this_data = JSON.parse(this_data)

$(".gdfTable tbody tr:not(.emptyRow) td:nth-child(4)").after('<td class="gdfCell newth filearea" style="width: 200px!important"></td>')

console.log(mainCalendar)

var a = mainCalendar.tasks.map(function(a,index) { 

  console.log('here')
  console.log(a)


  if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 0){


    console.log("Normal")

    $("tr[taskid='"+ a.id +"'] td.newth").remove()
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=pwacheck(this)>' + a.filename +'</a></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell">'+ a.layerdet.foldersinit +'</td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell">' + a.layerdet.getFileCount +'</td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell">'+ a.layerdet.folderSize +' MB</td>')


  }else if(a.filelocation && a.id != 'tmp_fk1530990157598_1' && a.layerdet && a.layerdet.isDoc == 1){



    $("tr[taskid='"+ a.id +"'] td.newth").remove()
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(4)").after('<td class="gdfCell"><div style="display:flex;justify-content:space-around;align-items: center;"><a style="font-weight:normal"  class="uploaded_filename" data-link="'+ a.filelocation +'"  onclick=goToDoc(this)>' + a.filename +'</a><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><img class="arrowIcon hide" style="height: 17px;text-align: center;object-fit: contain;" src="assets/images/upload_rounded.svg" onclick="openDialog(this)"><div class="openDialog hide" style="display:flex;justify-content:space-around;align-items: center;;position: absolute;box-shadow:0px 0px 5px 4px #b7b7b742;background-color: white;z-index:1;height: 90px;width: 200px;margin: 25px 0;"><div><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file"  onchange="calendarThirdChanged(this)" id="file" name="file"><input style="display:none"  accept="image/*,application/pdf,.ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="filebr" name="file"><input style="display:none" accept=".ppt,.pptx,.xls,.docx,.doc,.xlsx,.xlsm,.odt,.ods,.odp" type="file" id="documents1" name="file"><p style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openImageEditor1(this);">Local Upload</p><p class="sss12 reupload" style="height: 35px;line-height:35px;cursor:pointer;text-align: center;object-fit: contain;" onclick="openFileBrowser(this)">File Browser</p></div></div></div></div></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell">'+ a.layerdet.foldersinit +'</td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell">' + a.layerdet.getFileCount +'</td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell">'+ a.layerdet.folderSize +' MB</td>')



  }else if(a.id == 'tmp_fk1530990157598_1'){

    console.log("first")
    $("tr[taskid='tmp_fk1530990157598_1'] td.newth").empty()
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell"></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell"></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell"></td>')

  }else if(!a.filelocation){

    console.log("not normal")
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(5)").after('<td class="gdfCell"></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(6)").after('<td class="gdfCell"></td>')
    $( "tr[taskid='"+ a.id +"']  > td:nth-child(7)").after('<td class="gdfCell"></td>')


  }


})



$('.calendarsave').addClass('hide')


$(".gdfTable").addClass('thirdstyle')
$(".gdfTable").removeClass('mainstyle')

$(".gdfTable").removeClass('firststyle')
$(".gdfTable").removeClass('secondstyle')

$(".splitBox2").addClass('thirdstyle')

$(".splitBox2").removeClass('secondstyle')

$(".splitBox2").removeClass('firststyle')

$(".splitElement.vSplitBar").removeClass('secondstyle')

$(".splitElement.vSplitBar").removeClass('firststyle')

$(".splitElement.vSplitBar").addClass('thirdstyle')


$(".calendarresource").addClass('hide')
$(".ganttButtonBar button:lt(11) span").addClass('hide')
$(".ganttButtonBar .ganttButtonSeparator:lt(6)").addClass('hide')

$(".ganttButtonBar button:lt(11) span").parent().hide()
$(".ganttButtonBar .ganttButtonSeparator:lt(6)").hide()

$(".formElements").addClass('notedit')
$("#addResource").addClass('hide')

$(".deleteTrash").addClass('hide')

// $(".formElements ").prop('disabled', true)




$(".splitterContainer").height($(".splitElement")[0].scrollHeight)






$('input').attr('autocomplete', 'off');


$(".loader").hide().fadeOut('slow');

// poll("2018-09-14 18:58:53", "1537092121")


this_data = ret

// },
// error: function() {
//        // connectionError();
//      }
//    });



}



  function saveInLocalStorage() {

    var prj

    if(selectedCalendar  == "ProjectCalendarResource"){

      prj = ge.saveProject();

    }else{

      prj = ge.saveProject();
      
    }
    if (localStorage) {
      localStorage.setObject("teamworkGantDemo", prj);
    }
  }



function _isContains(json, keyname, value) {

return Object.keys(json).some(key => {
        return typeof json[key] === 'object' ? 
        _isContains(json[key], keyname, value) : key === keyname && json[key] === value;
    });
}




//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
function editResources(){


  if(selectedCalendar  == "ProjectCalendarResource"){



  //make resource editor
  var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
  var resTbl=resourceEditor.find("#resourcesTable");

  for (var i=0;i<ge.resources.length;i++){
    var res=ge.resources[i];
    resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
  }


  //bind add resource
  resourceEditor.find("#addResource").click(function(){
    resTbl.append($.JST.createFromTemplate({id:"new",name:"자원명"}, "RESOURCE_ROW"))
  });

  //bind save event
  resourceEditor.find("#resSaveButton").click(function(){


    var newRes=[];
    //find for deleted res
    for (var i=0;i<ge.resources.length;i++){
      var res=ge.resources[i];
      var row = resourceEditor.find("[resId="+res.id+"]");
      if (row.length>0){
        //if still there save it
        var name = row.find("input[name]").val();
        if (name && name!="")
          res.name=name;
        newRes.push(res);
      } else {
        //remove assignments
        for (var j=0;j<ge.tasks.length;j++){
          var task=ge.tasks[j];
          var newAss=[];
          for (var k=0;k<task.assigs.length;k++){
            var ass=task.assigs[k];
            if (ass.resourceId!=res.id)
              newAss.push(ass);
          }
          task.assigs=newAss;
        }
      }
    }

    //loop on new rows
    var cnt=0
    resourceEditor.find("[resId=new]").each(function(){
      cnt++;
      var row = $(this);
      var name = row.find("input[name]").val();
      if (name && name!="")
        newRes.push (new Resource("tmp_"+new Date().getTime()+"_"+cnt,name));
    });

    ge.resources=newRes;

    // closeBlackPopup();
    ge.redraw();



  });


  var ndo = createModalPopup(400, 500).append(resourceEditor);


}else{



  //make resource editor
  var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
  var resTbl=resourceEditor.find("#resourcesTable");

  for (var i=0;i<ge.resources.length;i++){
    var res=ge.resources[i];
    resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
  }


  //bind add resource
  resourceEditor.find("#addResource").click(function(){
    resTbl.append($.JST.createFromTemplate({id:"new",name:"자원명"}, "RESOURCE_ROW"))
  });

  //bind save event
  resourceEditor.find("#resSaveButton").click(function(){


    var newRes=[];
    //find for deleted res
    for (var i=0;i<ge.resources.length;i++){
      var res=ge.resources[i];
      var row = resourceEditor.find("[resId="+res.id+"]");
      if (row.length>0){
        //if still there save it
        var name = row.find("input[name]").val();
        if (name && name!="")
          res.name=name;
        newRes.push(res);
      } else {
        //remove assignments
        for (var j=0;j<ge.tasks.length;j++){
          var task=ge.tasks[j];
          var newAss=[];
          for (var k=0;k<task.assigs.length;k++){
            var ass=task.assigs[k];
            if (ass.resourceId!=res.id)
              newAss.push(ass);
          }
          task.assigs=newAss;
        }
      }
    }

    //loop on new rows
    var cnt=0
    resourceEditor.find("[resId=new]").each(function(){
      cnt++;
      var row = $(this);
      var name = row.find("input[name]").val();
      console.log(ge.resources)




    if(_isContains(ge.resources, "name", name) == true){


      $('#resourceAlreadyExists-modal').removeClass('close');setTimeout(function(){ $('#resourceAlreadyExists-modal').addClass('close'); }, 2500);


    }else{

            if (name && name!=""){
        newRes.push (new Resource("tmp_"+new Date().getTime()+"_"+cnt,name));

        $('#saveAlert-modal').removeClass('close');setTimeout(function(){ $('#saveAlert-modal').addClass('close'); }, 2500);

      }

    }


    });

    ge.resources=newRes;

    // closeBlackPopup();
    ge.redraw();

  });



  var ndo = createModalPopup(400, 500).append(resourceEditor);




}

console.log(isEditing)
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

if(isEditing == 0){


 setTimeout(function(){
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

  $(".formElements").addClass('notedit')
  $("#addResource").addClass('hide')
  $("#resSaveButton").addClass('hide')
  $(".deleteTrash").addClass('hide')

  // $(".formElements ").prop('disabled', true)

}, 500); 

}else if(isEditing == 1){


 setTimeout(function(){

  $(".formElements").removeClass('notedit')
  $("#addResource").removeClass('hide')
  $("#resSaveButton").removeClass('hide')
  $(".deleteTrash").removeClass('hide')

  $(".formElements ").prop('disabled', false)

}, 500); 


}




}



$.JST.loadDecorator("RESOURCE_ROW", function(resTr, res){
  resTr.find(".delRes").click(function(){$(this).closest("tr").remove()});
});

$.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig){
  var resEl = assigTr.find("[name=resourceId]");
  var opt = $("<option>");
  resEl.append(opt);
  for(var i=0; i< taskAssig.task.master.resources.length;i++){
    var res = taskAssig.task.master.resources[i];
    opt = $("<option>");
    opt.val(res.id).html(res.name);
    if(taskAssig.assig.resourceId == res.id)
      opt.attr("selected", "true");
    resEl.append(opt);
  }
  var roleEl = assigTr.find("[name=roleId]");
  for(var i=0; i< taskAssig.task.master.roles.length;i++){
    var role = taskAssig.task.master.roles[i];
    var optr = $("<option>");
    optr.val(role.id).html(role.name);
    if(taskAssig.assig.roleId == role.id)
      optr.attr("selected", "true");
    roleEl.append(optr);
  }

  if(taskAssig.task.master.permissions.canWrite && taskAssig.task.canWrite){
    assigTr.find(".delAssig").click(function(){
      var tr = $(this).closest("[assId]").fadeOut(200, function(){$(this).remove()});
    });
  }

});


function loadI18n(){
  GanttMaster.messages = {
    "CANNOT_WRITE":"No permission to change the following task:",
    "CHANGE_OUT_OF_SCOPE":"Project update not possible as you lack rights for updating a parent project.",
    "START_IS_MILESTONE":"Start date is a milestone.",
    "END_IS_MILESTONE":"End date is a milestone.",
    "TASK_HAS_CONSTRAINTS":"Task has constraints.",
    "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"Error: there is a dependency on an open task.",
    "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"Error: due to a descendant of a closed task.",
    "TASK_HAS_EXTERNAL_DEPS":"This task has external dependencies.",
    "GANNT_ERROR_LOADING_DATA_TASK_REMOVED":"GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
    "CIRCULAR_REFERENCE":"Circular reference.",
    "CANNOT_DEPENDS_ON_ANCESTORS":"Cannot depend on ancestors.",
    "INVALID_DATE_FORMAT":"The data inserted are invalid for the field format.",
    "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"An error has occurred while loading the data. A task has been trashed.",
    "CANNOT_CLOSE_TASK_IF_OPEN_ISSUE":"Cannot close a task with open issues",
    "TASK_MOVE_INCONSISTENT_LEVEL":"You cannot exchange tasks of different depth.",
    "GANTT_QUARTER_SHORT":"Quarter",
    "GANTT_SEMESTER_SHORT":"Sem",
    "CANNOT_MOVE_TASK":"CANNOT_MOVE_TASK",
    "PLEASE_SAVE_PROJECT":"PLEASE_SAVE_PROJECT"
  };
}



function createNewResource(el) {
  var row = el.closest("tr[taskid]");
  var name = row.find("[name=resourceId_txt]").val();
  var url = contextPath + "/applications/teamwork/resource/resourceNew.jsp?CM=ADD&name=" + encodeURI(name);

  openBlackPopup(url, 700, 320, function (response) {
      //fillare lo smart combo
      if (response && response.resId && response.resName) {
        //fillare lo smart combo e chiudere l'editor
        row.find("[name=resourceId]").val(response.resId);
        row.find("[name=resourceId_txt]").val(response.resName).focus().blur();
      }

    });
}