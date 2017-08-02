/**
 * Created by general on 7/28/17.
 */
AppControl.controller('homeControl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
    console.log("enter Home Controller");




    $scope.imageurl = null;
    // $scope.showSliding = function () {
        console.log("function try!");
        setInterval(function () {
            $.ajax({
                url: 'http://www.stat.cmu.edu/reception/',
                timeout: 2000, // 2 seconds timeout
                success: function (data) {
                    location.reload();
                    console.log('success');
                },
                error: function (data) {
                    console.log('error');
                }
            });
        }, 900000);

        var images;

        $.ajax({
            url: 'partials/get/getImage.php',
            type: "GET",
            success: function (results) {
                //location.reload(true);
                images = JSON.parse(results);
                images.sort(function (a, b) {
                    return a.position - b.position;
                });
                showImage(images);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });


        function showImage(images) {
            var length = images.length;
            var i = 0;
            var firstImage = new Image();
            firstImage.onload = function () {
                image.src = this.src;
            };
            //        firstImage.src = "uploads/"+ images[i]['fileName'];

            firstImage.src = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];

            function changeImage() {
                // console.log("enter change!");
                i = (i + 1) % length;
                var pic = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];
                // document.getElementById("image").src = pic;
                // console.log(pic);
                $scope.imageurl = pic;
                // console.log($scope.imageurl);
            }

            function changePrevImage() {
                if (i === 0) {
                    i = length - 1;
                } else {
                    i = (i - 1) % length;
                }
                var pic = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];
                // if(document.getElementById("image") == null) {
                //     return;
                // }
                // document.getElementById("image").src = pic;
                $scope.imageurl = pic;
            }

            //        window.setInterval(function () {changeImage()},30000);
            // var myintervel = window.setInterval(function () {
            //     changeImage()
            // }, 5000);
            var myintervel = $interval(function () {
                changeImage();
            }, 50000);
        }
        return true;
    // }

}]);

AppControl.directive('slidingCustomer',function () {
    // console.log("Hi div!!");
    // setInterval(function () {
    //     $.ajax({
    //         url: 'http://www.stat.cmu.edu/reception/',
    //         timeout: 2000, // 2 seconds timeout
    //         success: function (data) {
    //             location.reload();
    //             console.log('success');
    //         },
    //         error: function (data) {
    //             console.log('error');
    //         }
    //     });
    // }, 900000);
    //
    // var images;
    //
    // $.ajax({
    //     url: 'partials/get/getImage.php',
    //     type: "GET",
    //     success: function (results) {
    //         //location.reload(true);
    //         images = JSON.parse(results);
    //         images.sort(function (a, b) {
    //             return a.position - b.position;
    //         });
    //         showImage(images);
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.log(textStatus, errorThrown);
    //     }
    // });
    //
    //
    // function showImage(images) {
    //     var length = images.length;
    //     var i = 0;
    //     var firstImage = new Image();
    //     firstImage.onload = function () {
    //         image.src = this.src;
    //     };
    //     //        firstImage.src = "uploads/"+ images[i]['fileName'];
    //
    //     firstImage.src = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];
    //
    //     function changeImage() {
    //         i = (i + 1) % length;
    //         var pic = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];
    //         document.getElementById("image").src = pic;
    //     }
    //
    //     function changePrevImage() {
    //         if (i === 0) {
    //             i = length - 1;
    //         } else {
    //             i = (i - 1) % length;
    //         }
    //         var pic = "http://stat.cmu.edu/reception/uploads/" + images[i]['fileName'];
    //         if(document.getElementById("image") == null) {
    //             return;
    //         }
    //         document.getElementById("image").src = pic;
    //     }
    //
    //     //        window.setInterval(function () {changeImage()},30000);
    //     var myintervel = window.setInterval(function () {
    //         changeImage()
    //     }, 5000);
    // }
    return {

    }}
);