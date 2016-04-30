<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ksiega gosci</title>
    <link rel="stylesheet" type="text/css" href="styles/main.css">
</head>
<body ng-app="Notepile" bgcolor="#2f3238">
    <div id="Wrapper" ng-controller="NotepileController">
        <div class="title-header">
            <a href="./index.php" class="title"><font color="white">Wpisz sie do ksiegi gosci!</font></a>
        </div>
        <div class="notes-frame">
            <div class="note-box">
                <div class="note-content-frame">
                    <div class="note-input-frame">
                        <textarea id="Note-input" rows="7" cols="71" maxlength="497" name="note" class="note-input" wrap="soft" placeholder=""></textarea>
                    </div>
                </div>
                <div class="note-footer">
                    <div class="id-frame">
                        <p id="Character-counter" class="id"><font color="white">0 / 497</font></p>
                    </div>
                    <div class="pile-button-frame">
                        <button class="pile-button" ng-click="pile()">Wpisz</button>
                    </div>
                </div>
            </div>
            <div ng-repeat="note in notes" class="notes-frame">
                <div class="note-box" id="note-{{ note.id }}">
                    <div class="note-content-frame">
                        <div class="note-input-frame">
                            <textarea readonly rows="7" cols="71" maxlength="497" name="note" class="note-input" wrap="soft">{{ note.content }}</textarea>
                        </div>
                    </div>
                    <div class="note-footer">
                        <div class="id-frame">
                            <a href="./index.php?note={{ note.id }}" class="id">#{{ note.id }}</a>
                        </div>
                        <div class="pile-button-frame">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="url-id" style="display: none;">
        <?php
        echo htmlspecialchars(isset($_GET['note']) ? $_GET['note'] : '');
        ?>
    </div>

<script type="text/javascript" src="src/js/lib/jquery.min.js"></script>
<script type="text/javascript" src="src/js/lib/angular.min.js"></script>
<script type="text/javascript" src="src/js/lib/jquery.waypoints.min.js"></script>
<script type="text/javascript" src="src/js/app/controller.js"></script>

</body>
</html>
