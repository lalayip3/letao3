
$(function () {
    function render(){
        setTimeout(function () {
            $.ajax({
                type:'get',
                url:'',
                dataType:'json',
                success:function (info) {
                    if (info.error ===400) {
                        location.href='login.html';
                        return;
                    }
                    var htmlStr=template('cartTpl',{arr:info})
                    $('.lt_main .mui-table-view').html(htmlStr);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                }
            })
        },500)

    }


    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback :function () {
                    console.log('1');
                    render();
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    $('.lt_main').on('tap','.btn_del',function () {
        var id=$(this).data('id');
        $.ajax({
            type:'get',
            url:'',
            data:{
                id:[id]
            },
            dataType: 'json',
            success:function (info) {
                if (info.success) {
                    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                }
            }
        })
    })


    $('.lt_main').on('tap','btn_edit',function () {
        var obj=this.dataset;
        var id=obj.id;
        var htmlStr=template('editTpl',obj);
        htmlStr=htmlStr.replace('/\n/g','');
        mui.confirm(htmlStr,'编辑商品',['确认','取消'],function (e) {
             if (e.index===0) {
                 var size=('.lt_size span.current').text();
                 var num=$('.mui-numbox-input').val();

                 $.ajax({
                     type:'post',
                     url:'',
                     data:{
                         id:id,
                         size:size,
                         num:num
                     },
                     success:function (info) {
                         if (info.success) {
                             mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                         }
                     }
                 })
             }
        })
        mui('.mui-numbox').numbox();
    })

    $('body').on('click','.lt_size span',function () {
        $(this).addClass('current').siblings().removeClass('current');
    })


})