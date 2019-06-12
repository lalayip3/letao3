

$(function () {
    var key=getSearch('key');
    console.log(key);
    $('.search_input').val(key);

    render()

    function render(){
        $('.lt_product').html(' <div class="loading"></div>');
        var params={};
        params.proName=$('.search_input').val();
        params.page=1;
        params.pageSize=100;
        params.price = 2;

        var current= $('.lt_sort a.current');
        if (current.length>0){
            var sortName=current.data('type');
            var sortValue=current.find('i').hasClass('fa-angle-down')?2:1;
            params[sortName]=sortValue;
        }

        setTimeout(function () {
            $.ajax({
                type:'get',
                data:params,
                dataType:'json',
                success:function (info) {
                    var htmlStr=template('productTpl',info);
                    $('.lt_product').html(htmlStr);
                }
            })
        },500)



    }

    $('.search_btn').click(function () {
        var key=$('.search_input').val();
        if (key.trim()===''){
           mui.toast('请输入搜索关键字');
            return;
        }

        render();

        var history=localStorage.getItem(key);
        var arr=JSON.parse(history);
        var index=arr.indexOf(key);
        if (index!=-1){
            arr.splice(index, 1);
        }
        if (arr.length>=0) {
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
    });

    $('.lt_sort a[data-type]').click(function () {
        if ($(this).hasClass('current')) {
            $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }
        else{
            $(this).addClass('current').siblings().removeClass('current');
        }
        render();
    })




})