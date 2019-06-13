

$(function () {
    $('#loginBtn').click(function () {
        var username=$('#username').val().trim();
        var password=$('#password').val().trim();
        
        if (username===''){
            mui.toast('请输入用户名');
            return;
        } 
        if (password ===''){
            mui.toast('请输入密码');
            return;
        } 
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            dataType:'json',
            success:function (info) {
                if (info.error===403){
                    mui.toast('用户名或者密码错误');
                    return;
                }
                if (location.search.indexOf('rectUrl')>-1){
                    var retUrl=location.search.replace('retUrl=','');
                    location.href=retUrl;
                }else{
                    location.href = 'user.html';
                }
            }
        })
       
     
    })
})