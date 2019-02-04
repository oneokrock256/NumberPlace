
function onButtononClick() {
    var num = new Array(9);

    for (var i = 1; i <= 9; i++) {
        num[i] = new Array(9).fill(0);
        for (var j = 1; j <= 9; j++) {
            num[i][j] = document.getElementById("num" + i.toString() + j.toString()).closest('label').innerText;
            if (num[i][j] == "") {
                num[i][j] = "null";
            }

        }
    }
    console.log(num);
     setNum(num);
}

//空白に文字をセットする
function setNum(num) {
    var end = 0;
    for (var i = 1; i <= 9; i++) {
        for (var j = 1; j <= 9; j++) {

            if (num[i][j] == "null" || end != 0) {

                end = select_num(num, i, j);
            }

            if(end != -1){
                document.getElementById("num" + i.toString() + j.toString()).closest('label').innerText = num[i][j];
            }
            

            
        }
    }



}
//ここで数字を選ぶ
function select_num(num, i, j) {
    var flag = 0;
    var best_ans = 1;


    for (var ans = best_ans; ans <= 9; ans++) {
        for (var k = 1; k <= 9; k++) {
            if (num[i][k] == ans.toString()) {
                break;
            }
            if (num[k][j] == ans.toString()) {
                break;
            }
            if (k == 9) {
                flag = 1;
            }
        }

        if (flag != 0) {
            flag = BestAns(num, ans, i, j);
            if (flag != 0) {
                num[i][j] = flag.toString();

                return 0 ;
                
            }
        }
    }

    
    return -1;

}

function BestAns(num, ans, i, j) {
    //同じ陣地にいないかチェック3*3
    var flag = 1;
    var x2 = 0;
    var y2 = 0;

    switch (i) {
        case 1:
        case 2:
        case 3:
            x2 = 1;
            break;
        case 4:
        case 5:
        case 6:
            x2 = 4;
            break;
        case 7:
        case 8:
        case 9:
            x2 = 7;
            break;
    }


    switch (j) {
        case 1:
        case 2:
        case 3:
            y2 = 1;
            break;
        case 4:
        case 5:
        case 6:
            y2 = 4;
            break;
        case 7:
        case 8:
        case 9:
            y2 = 7;
            break;
    }


    for (var x = x2; x <= (x2 + 2); x++) {
        for (var y = y2; y <= (y2 + 2); y++) {

            if (num[x][y] == ans.toString()) {
                flag = 0;
                break;
            }
        }
    }

    if (flag == 1) {
        return ans;
    }

    return 0;



}

/*ラジオボタン */

$(function(){
    $("table input[type=radio]").on('change', function(){
        var checked = $(this).prop('checked');
        var id = this.id;
        console.log(checked);
        console.log(id);

        var self = $(this);
        //this以外のradioボタン
        $("table input[type=radio]").not(self).parent('label').removeClass('add_class');

        $(this).parent('label').addClass('add_class');

    });

    

    $('.btn_num').click(function(){
        var selectNo = $(this).val();
        //新しいテキストでそっくり置き換えてしまう
        $('[name=num]:checked').parent('label').contents().last().replaceWith(selectNo);

    });

});




