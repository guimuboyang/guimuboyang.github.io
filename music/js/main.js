$(document).ready(function () {
    var inputvalue; //输入的值
    var listarr = [];//音乐列表数组
    var index = 0;//歌曲序号
    var songname;//歌曲名字
    var singname;//歌手名字
    var time;//歌曲时间
    var id = [];
    var songurl;
    //获取表单输入的值渲染列表 点击触发
    $(".btn").click(function () {
        search();
    });
    //回车触发
    $(".input").keyup(function (event) {
        if (event.keyCode == 13) {
            search();
        }
    });
    //播放音乐
    $(".table_list").on("click", ".play", function () {
        let indexnum = $(this).index()
        let idnum = id[indexnum];
        $.ajax({
            type: "get",
            url: 'https://autumnfish.cn/song/url',
            datatype: "json",
            data: {
                id: idnum,
            },
            success: function (result) {
                songurl = result.data[0].url;
                console.log(songurl);
                $("audio").attr({ src: songurl });

            }, error: function (e) {
                console.log(e);
            }
        })
    })
    function search() {
        $(".table_list").empty();
        inputvalue = $(".input").val();
        console.log(inputvalue);
        if (inputvalue == "") {
            alert("请输入歌手或者歌曲名");
        }
        $.ajax({
            type: "get",
            url: "https://autumnfish.cn/search",
            datatype: "json",
            data: {
                keywords: inputvalue,
            },
            success: function (result) {
                console.log(result);
                listarr = result.result.songs;
                for (var i = 0; i < listarr.length; i++) {
                    index = i + 1;
                    songname = listarr[i].name;
                    singname = listarr[i].artists[0].name;
                    id.push(listarr[i].id);
                    let min = parseInt(listarr[i].duration / 1000 / 60);
                    if (min < 10) {
                        min = "0" + min;
                    }
                    let sec = parseInt(listarr[i].duration / 1000 % 60);
                    if (sec < 10) {
                        sec = "0" + sec
                    }
                    listarr[i].duration = `${min}:${sec}`
                    time = listarr[i].duration;
                    $(".table_list").append(
                        `<tr class = "play">
                            <td>${index}</td>
                            <td>${songname}</td>
                            <td>${singname}</td>
                            <td>${time}</td>
                        </tr>`);
                }
            },
        });
    }
}); 
