
$(function () {
    var currentPage=1;
    var pageSize=5;

    var picArr=[];


    render();

    function render() {
        $.ajax({
            type:'post',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                var htmlStr=template('productTpl',info);
                $('.lt_content tbody').html(htmlStr);

                $('#paginator').bootstrapValidator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,page) {
                        currentPage=page;
                        render();
                    }
                })
            }
        })
    }

    $('#addBtn').click(function () {
        $('#addModal').modal('show');

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function (info) {
                console.log(info);
                var htmlStr=template('dropdownTpl',info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    $('.dropdown-menu').on('click','a',function () {
        var text=$(this).text();
        $('#dropdownText').text(text);

        var id=$(this).data('id');
        $('[name="brandId"]').val(id);

        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');


    })

    $('#fileupload').fileupload({
        dataType:'json',
        done:function (e,data) {
            console.log(data.result);
            picArr.unshift(data.result);
            $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">');

            if (picArr.length>3) {
                picArr.pop();

                $('#imgBox img').eq(-1).remove();
            }

            if (picArr.length===3){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
            }

        }
    })


    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
              validators:{
                  notEmpty: {
                      message: "请选择二级分类"
                  }
              }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            picStatus: {
                validators:{
                    notEmpty:{
                        message:"请选择三张图片"
                    }
                }
            }
        }
    })

    $('#form').on('success.form.bv',function (e) {
        e.preventDefault();
        var paramsStr = $('#form').serialize();
        paramsStr+= "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        paramsStr+= "&picName1="+picArr[0].picName+"&picAddr2="+picArr[1].picAddr;
        paramsStr+= "&picName1="+picArr[0].picName+"&picAddr3="+picArr[2].picAddr;

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:paramsStr,
            dataType:'json',
            success:function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide');
                    currentPage=1;
                    render();
                    $('#form').data(bootstrapValidator).resetForm(true);

                    $('#dropdownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                }
            }
        })
    })
})