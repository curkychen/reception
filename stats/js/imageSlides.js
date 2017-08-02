/**
 * Created by general on 8/2/17.
 */
AppControl.controller('UserList', ['$scope', '$filter', '$route', '$location', '$routeParams', '$http', function($scope, $filter, $route, $location, $routeParams, $http) {
    console.log("enter image controller");
    var m;
    var n;
    var j;
    var i = 0;
    $http.get('partials/get/faculty_info.php').success(function (data) {
        // $scope.users = parse.JSON(data);
        var test = data;
        // console.log($scope.users);
        var temparray=new Array();
        console.log(test);
        for(var i in test) {
            temparray.push({'firstname': test[i]['firstname'],
                'image_link':test[i]['image_link'],
                'lastname': test[i]['lastname'],
                'office':test[i]['office'],
                'phone':test[i]['phone'],
            });
        }
        console.log(temparray[1].image_link);
        $scope.users = temparray;

        // console.log(test[1]['image_link']);
        // console.log(typeof test[1]['image_link']);
        // m = test[i]['image_link'];
        // n = test[i + 1]['image_link'];
        // j = test[i + 2]['image_link']
    });
    // (function($) {

        // TODO : make the peripheral slides click-able

//         var $overlay = $('<div id="overlay"></div>');
//         var $image = $("<img>");
//
// //An image to overlay
//         $overlay.append($image);
//
// //Add overlay
//         $("body").append($overlay);
//
//         //click the image and a scaled version of the full size image will appear
//         $(".slide").click( function(event) {
//             event.preventDefault();
//             var imageLocation = $(this).attr("href");
//
//             //update overlay with the image linked in the link
//             $image.attr("src", imageLocation);
//
//             //show the overlay
//             $overlay.show();
//         } );
//
//         $("#overlay").click(function() {
//             // $( "#overlay" ).hide();
//             $( "#overlay" ).remove();
//         });
//end of overlay
        var $slides = $('.slide'),
            max = $slides.length - 1,
            center = 1,
            classNames = '',
            animating = false;

        $('#wrapInPeople').on('click', function(e) {
            // Wait for the animation to finish so we dont get a weird warped animation
            if (animating) return;

            // Was a btn clicked?
            if (e.target.parentNode.className === 'btn-people') {
                animating = true;

                // Update center position depending on which button was pressed
                switch (e.target.parentNode.id) {
                    case 'btn-left-people':
                        center = rotate(center - 1, max);
                        $slides.parent().attr('class', 'sliding-left');
                        break;
                    case 'btn-right-people':
                        center = rotate(center + 1, max);
                        $slides.parent().attr('class', 'sliding-right');
                        break;
                }

                // Update each slides class names
                $slides.each(function(i) {
                    classNames = 'slide';
                    switch (i) {
                        case rotate(center - 1, max):
                            classNames += ' slide-left';
                            break;
                        case rotate(center, max):
                            classNames += ' slide-center';
                            break;
                        case rotate(center + 1, max):
                            classNames += ' slide-right';
                            break;
                    }
                    this.className = classNames;
                })
                // Toggle off class once the animation is complete
                    .on('transitionend', function() {
                        animating = false;
                    });
            }
        });



        /**
         * Returns the rotated index within a range
         */
        function rotate(i, max) {
            if (i < 0) return max;
            if (i > max) return 0;
            return i;
        }

    // }(jQuery));

}]);