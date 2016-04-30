var app = angular.module('Notepile', []);

app.controller('NotepileController', function ($scope) {

    var noteInput = $('#Note-input');
    var characterCounter = $('#Character-counter');
    var infinityWaypoint = null;
    $scope.notes = [];


    function validateNoteInput() {
        removeLinebreaks();
        removeTabs();
        shortenToMaxLength();
    }

    function removeLinebreaks() {
        noteInput.val(noteInput.val().replaceAll('\r', ''));
        noteInput.val(noteInput.val().replaceAll('\n', ''));
    }

    function removeTabs() {
        noteInput.val(noteInput.val().replaceAll('\t', ''));
    }

    function shortenToMaxLength() {
        if (noteInput.val().length > noteInput.maxLength) {
            noteInput.val(noteInput.val().substr(0, noteInput.attr('maxlength') - 1));
        }
    }

    noteInput.bind('input propertychange', function() {
        validateNoteInput();
        updateCharacterCounter();
    });

    function updateCharacterCounter() {
        characterCounter.text(noteInput.val().length + ' / ' + noteInput.attr('maxlength'));
    }

    String.prototype.replaceAll = function(str1, str2, ignore)
    {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    };

    $scope.containsId = function (array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return true;
            }
        }
        return false;
    };

    $scope.sortById = function (a, b){
        var idA = parseInt(a.id);
        var idB = parseInt(b.id);
        return ((idA > idB) ? -1 : ((idA < idB) ? 1 : 0));
    };

    $scope.mergeNotes = function (arrayA, arrayB) {
        for (var i=0; i<arrayB.length; ++i) {
            if (!$scope.containsId(arrayA, arrayB[i].id)) {
                arrayA.push(arrayB[i]);
            }
        }
        return arrayA.sort($scope.sortById);
    };

    $scope.pile = function() {
        var note = $('#Note-input').val();
        if (note.length > 0) {
            $.ajax({
                type: "POST",
                url: "./src/php/app/pile.php",
                data: {
                    note: note
                },
                success: function (result) {
                    $scope.getPileSince($scope.notes[0].id);
                    $('#Note-input').val('');
                    updateCharacterCounter();
                }
            });
        }
    };

    $scope.getPileFrom = function (firstId, amount) {
        $.ajax({
            type: "POST",
            url: "./src/php/app/getPileFrom.php",
            data: {
                firstId: firstId,
                amount: amount
            },
            success: function (result) {
                var parsedResult = JSON.parse(result);
                $scope.notes = $scope.mergeNotes($scope.notes, parsedResult);
                $scope.$apply();
                updateInfinityWaypoint();
            }
        });
    };
    
    $scope.getPileSince = function (latestId) {
        $.ajax({
            type: "POST",
            url: "./src/php/app/getPileSince.php",
            data: {
                latestId: latestId
            },
            success: function (result) {
                var parsedResult = JSON.parse(result);
                $scope.notes = $scope.mergeNotes($scope.notes, parsedResult);
                $scope.$apply();
            }
        });
    };

    var getNoteUrlId = function () {
        var noteUrlId = $('#url-id').text();
        return (noteUrlId == '' || noteUrlId == null) ? 0 : noteUrlId;
    };

    var updateInfinityWaypoint = function() {
        if ($scope.containsId($scope.notes, '1')) {
            if (infinityWaypoint != null) {
                infinityWaypoint.destroy();
            }
            return;
        };
        var near = 3;
        if ($scope.notes.length <= near) return;
        var nearBottomId = $scope.notes[$scope.notes.length - near].id;
        infinityWaypoint = new Waypoint({
            element: document.getElementById('note-' + nearBottomId),
            handler: function(direction) {
                infinityWaypoint.destroy();
                $scope.getPileFrom($scope.notes.length, 20);
            },
            offset: 'bottom-in-view'
        })
    };


    var init = function() {
        $scope.getPileFrom(getNoteUrlId(), 20);
    }();
});