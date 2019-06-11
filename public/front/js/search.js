
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
        localStorage.removeItem('search_list');
        render();
    })




})