
$(function () {

    render();

    function getHistory() {
        var history=localStorage.getItem('search_list')||'[]';
        var arr =JSON.parse(history);
        return arr;
    }

    function render () {
        var arr =getHistory();
        var htmlStr=template('historyTpl',{arr:arr});
        $('.lt_history').html(htmlStr);
    }

    $('.lt_history').on('click','.btn-empty',function () {
        mui.confirm('你确定要清空历史记录吗','温馨提示',['取消','确认'],function (e) {
            if (e.index === 1){
                localStorage.removeItem('search_list');
                render();
            }
        })

    })

    $('.lt_history').on('click','.btn_del',function () {
        var that=this;
        mui.confirm('你确定要删除该条记录吗','温馨提示',['取消','确认'],function (e) {
            if (e.index===1){
                var index= $(this).data('data-index');
                var arr=getHistory();
                arr.splice(index, 1,);
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }
        })


    })


    $('.search_btn').click(function () {
        var key = $('.search_input').val().trim();
        if (key === ''){
            alert('请输入搜索关键字');
            return
        }
        var arr=getHistory();
        var index = arr.indexOf(key);
        if (index!=-1){
            arr.splice(index, 1);
        }
        if (arr.length>=10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
        $('.search_input').val('');

    })




})