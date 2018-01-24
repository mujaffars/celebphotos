function generateIt() {
    var pzlUniqueKey = makeid(7);
    var jsonString = '{ "option1":"' + $('#inputTxtOpt1').val() + '", "option2":"' + $('#inputTxtOpt2').val() + '", "option3":"' + $('#inputTxtOpt3').val() + '", "option4":"' + $('#inputTxtOpt4').val() + '", "answer":"' + $("input[name='options']:checked").val() + '", \n\
"hint1":"' + $("#inputTxtHint1").val() + '", "hint2":"' + $("#inputTxtHint2").val() + '", "hint3":"' + $("#inputTxtHint3").val() + '", "hint4":"' + $("#inputTxtHint4").val() + '",\n\
"mname":"' + $("#inputTxtMName").val() + '", "pzlUniqueKey":"' + pzlUniqueKey + '"}';

    $('#txtJsonData').text(jsonString);
    $('#txtImgData').text($('#imgTest').find('img').attr('src'));

    var fdata = {
        jsonString: jsonString,
        imageData: $('#txtImgData').text()
    }
    $.ajax({
        url: 'index.php',
        type: 'POST',
        data: fdata,
        dataType: 'json',
        async: true,
        error: function () {
        },
        success: function (resp) {

        }
    });

}

function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;

            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            document.getElementById('imageText').value = document.getElementById("imgTest").innerHTML;

            return newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getpuzzle(pzlId) {
    var checkFileName = '';
    var minusVal = 0;
    if (pzlId <= 25) {
        checkFileName = '25.html';
    } else if (pzlId <= 50) {
        minusVal = 25;
        checkFileName = '50.html';
    } else if (pzlId <= 75) {
        minusVal = 50;
        checkFileName = '75.html';
    } else if (pzlId <= 100) {
        minusVal = 75;
        checkFileName = '100.html';
    } else if (pzlId <= 125) {
        minusVal = 100;
        checkFileName = '125.html';
    }
    $.ajax({
        url: 'js/' + checkFileName,
        type: 'GET',
        dataType: 'html',
        async: true,
        error: function () {
        },
        success: function (resp) {
            var objJson = JSON.parse(resp);
            var pzlIndex = eval(pzlId - minusVal);
            pzlIndex = eval(pzlIndex - 1); // As array starts from 0

            var pzlDtl = objJson[pzlIndex];
            console.log(pzlIndex);
            console.log(pzlDtl);
            console.log(pzlDtl.answer + " " + pzlDtl.pzlUniqueKey);

            // Get the file details
            $.ajax({
                url: 'files/' + pzlDtl.pzlUniqueKey + '.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    console.log(resp);
                }
            });
        }
    });
}

function checkAnswer(clickOptn) {
    if (pzlDtl.answer == clickOptn) {
        setTimeout(function () {
            $('#optn' + clickOptn).removeClass('btn-info').addClass('btn-success');
        }, 300);
    } else {
        var refreshIntervalId = setInterval(blink, 10000);
        setTimeout(function () {
            clearInterval(refreshIntervalId);
        }, 2000);
    }
}

function blink() {
    var theCorrect = pzlDtl.answer;
    setTimeout(function () {
        $(theCorrect).removeClass('btn-info').addClass('btn-success');
        setTimeout(function () {
            $(theCorrect).removeClass('btn-success').addClass('btn-info');
            setTimeout(function () {
                $(theCorrect).removeClass('btn-info').addClass('btn-success');
                setTimeout(function () {
                    $(theCorrect).removeClass('btn-success').addClass('btn-info');
                    setTimeout(function () {
                        $(theCorrect).removeClass('btn-info').addClass('btn-success');
                    }, 200);
                }, 200);
            }, 200);
        }, 300);
    }, 300);
}
