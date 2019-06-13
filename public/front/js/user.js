$(function () {
    $.ajax({
        type:'get',
        url:'',
        dataType:'json',
        success:function (info) {
           if (info.error ===400)  {
               location.href='login.html';
               return;
           }
           var htmlStr=template('userTpl',info);
           $('#userInfo').html(htmlStr);
        }
    })



    $('.logoutBtn').click(function () {
        $.ajax({
            type:'get',
            url:'',
            success:function (info) {
                if (info.success) {
                    location.href='login.html';
                }
            }
        })
    })
})