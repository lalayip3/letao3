

$(function () {
    var key=getSearch('key');
    console.log(key);
    $('.search_input').val(key);

    render()

    function render(){
        $.ajax({
            type:'get',
            data:{
                proName:$('.search_input').val(),
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function (info) {
                var htmlStr=template('productTpl',info);
                $('.lt_product').html(htmlStr);
            }
        })

    }

    $('.search_btn').click(function () {
        var key=$('.search_input').val();
        if (key.trim()===''){
            alert('请输入关键字');
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


})