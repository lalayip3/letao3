

$(function () {

    var currentPage=1;
    var pageSize=2;
    var key=getSearch('key');
    console.log(key);
    $('.search_input').val(key);

    // render()


    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                // height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback :function () {
                    console.log('a');
                    render(function (info) {
                        var htmlStr=template('productTpl',info);
                        $('.lt_product').html(htmlStr);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                callback :function () {
                    console.log('b');
                    currentPage++;
                    render(function (info) {
                        var htmlStr=template('productTpl',info);
                        $('.lt_product').append(htmlStr);
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                    });
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    function render(callback){
        // $('.lt_product').html(' <div class="loading"></div>');
        var params={};
        params.proName=$('.search_input').val();
        params.page=currentPage;
        params.pageSize=pageSize;
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
                    callback && callback(info);
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

        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

        // render();

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

    $('.lt_sort a[data-type]').on('tap',function () {
        if ($(this).hasClass('current')) {
            $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }
        else{
            $(this).addClass('current').siblings().removeClass('current');
        }
        // render();
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    })


    $('.lt_product').on('tap','a',function () {
        var id=$(this).data('id');
        location.href = 'product.html?product='+id;
    })




})