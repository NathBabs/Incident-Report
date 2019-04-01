function callpost() {

    var URL = newFunction();
         
    $.getJSON("http://bincomcitizen.medianewsonline.com/wp-json/wp/v2/posts?per_page=100", function(data) {
         console.log(data);
           updateDOM(data);
           });
         
           function newFunction() {
             return 'http://bincomcitizen.medianewsonline.com/wp-json/wp/v2/posts?per_page=100';
           }
         };
         callpost();
          
            function updateDOM(data) {        
            for(i = 0; i < data.length; i++){
                var date = data[i].date;
                var res = date.slice(0,10);
                var title = data[i].title.rendered;
                var excerpt = data[i].content.rendered;
                m = {
                  1:'Uncategorized',
                  2: 'Acccident',
                  3: 'Fighting',
                  4: 'Natural Disaster',
                  5: 'Rioting'
                }
                var categories = data[i].categories.map (function(num) {
                  return m[num];
                }) ;       
                $('#excerpt').append("<section id='posts'><h5> " +res 				+"</h5><br> <h3>" +title +"</h3><p>" + excerpt + "</p>  <footer class=blockquote-footer>" + categories  +"<footer> </section> <br> <br>");

           };
          
          }

  
          
            
         $(function (){  
          $('#submit').on( 'click', function( e ) { 
              e.preventDefault(); 

              //var jsonData = $("#post-form").serializeArray();
            var categories = [];
             //using an array to store the value of the incident recorded

           function add () {
                var chkbox = Array.from(document.getElementsByClassName('form-check-input'));
               categories = []; //empty array before rebuilding it
                chkbox.forEach (function (c) {
                    if (c.checked) {
                        categories.push(Number(c.value));
                        //console.log(c);
                        //console.log(c.value);
                    }
                });
                //console.log to monitor
                //console.log(categories.incidents);
           }
           

            add();



            var lat = $('#Latitude').val();
            console.log(lat);
            var long= $('#Longitude').val();
            console.log(long);
            var zoom = $('#Zoom').val();
            console.log(zoom);
            var src = 'src="http://maps.google.com/maps?q=' + lat + ',' + long + '&z=' + zoom + '&output=embed"';
            console.log(src);
            var mapURL = '<iframe ' + src + ' width="360" height="270" frameborder="0" style="border:0"></iframe>';
            console.log(mapURL);
            
            //var appendContent = $('#content').append('<p>' + mapURL + '</p>');
            var content2 = $('#content');
            var appendedContent = content2.val(content2.val() + '<br>' + '<p>' + mapURL + '</p>');
           console.log(appendedContent.val());


            var title = $('#title').val();
            var content = appendedContent.val();
            var status = "publish"; //$('#status').val();
            var JSONObj = {
                "title"  : title,
                "content" : content,
                "status" : status,
                "categories": categories
            };

            var data = JSON.stringify(JSONObj);
                
              $.ajax({ 
                  url: 'http://bincomcitizen.medianewsonline.com/wp-json/wp/v2/posts', 
                  method: 'POST', 
                 // data: jsonData( postForm ), 
                 data: data,
                 dataType: 'json',
                  crossDomain: true, 
                  contentType: 'application/json',
                  beforeSend: function ( xhr ) { 
                      xhr.setRequestHeader( 'Authorization', "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iaW5jb21jaXRpemVuLm1lZGlhbmV3c29ubGluZS5jb20iLCJpYXQiOjE1MzA4MTk0ODEsIm5iZiI6MTUzMDgxOTQ4MSwiZXhwIjoxNTMxNDI0MjgxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIyIn19fQ.QMoW4YWiCJzQgAyfRra4wgxnaLJnr4D6o-KLYJgTGP4" ); 
                  }, 
                  success: function( data ) {
                      console.log( data ); 
                      
                      if (status == 'publish' ){
                        Snackbar.show({
                            text: 'Post uploaded &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <i class="fa fa-check-circle" aria-hidden="true"></i>',
                            pos: 'top-center',
                            showAction: false,
                            duration: 6000,
                            backgroundColor: '#5cb85c'
                        });
                          
                      } else{
                        Snackbar.show({
                            text: 'Draft sent for review &nbsp &nbsp &nbsp &nbsp <i class="fa fa-check-circle" aria-hidden="true"></i>',
                            pos: 'top-center',
                            showAction: false,
                            duration: 6000,
                            backgroundColor: '#428bca'
                        });
                         
                      }
                      function timedRefresh(timeoutPeriod) {
                        setTimeout("location.reload(true);",timeoutPeriod);
                      }
                      
                      window.onload = timedRefresh(7000);
                      //document.location.reload(true);
                      callpost();
                  }, 
                  error: function( error ) { 
                      console.log( error );
                      if (status == 'publish' ){
                        Snackbar.show({
                            text: 'Post not uploaded &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <i class="fa fa-close" aria-hidden="true"></i>',
                            pos: 'top-center',
                            showAction: false,
                            duration: 6000,
                            backgroundColor: '#d9534f'
                        });
                          
                      } else{
                        Snackbar.show({
                            text: 'Draft not sent &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <i class="fa fa-close" aria-hidden="true"></i>',
                            pos: 'top-center',
                            showAction: false,
                            duration: 6000,
                            backgroundColor: '#d9534f'
                        });
                         
                      }

                      console.log(data);
                  } 
                  
              }); 
            });
          });
          
         
          

         

           