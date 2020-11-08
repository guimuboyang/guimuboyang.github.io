var app = new Vue({
    el: "#container",
    data: {
      msg: "",
      list: [],
      isupdate: -1,
    },
    computed: {
      doList() {
        return this.list.filter((item) => {
          return !item.suc;
        });
      },
      sucList() {
        return this.list.filter((item) => {
          return item.suc;
        });
      },
    },
    mounted() {
      let list = localStorage.todolist;
      if (list) {
        this.list = JSON.parse(list);
      }
    },
    methods: {
      //添加数据方法
      getinputvalue() {
        if (this.msg == "") return;
        //加上数据
        this.list.push({
          title: this.msg,
          suc: false,
        });
        //重置文本框
        this.msg = "";
        this.save();
      },
      //设置正在进行
      successful(item) {
        item.suc = true;
        this.save();
      },
      //设置已经完成
      cancel(item) {
        item.suc = false;
        this.save();
      },
      //设置修改
      setupdate(index) {
        this.isupdate = index;
      },
      update() {
        this.save();
        this.isupdate = -1;
      },
      //设置删除
      del(item) {
        let index = this.list.indexOf(item);
        if (index > -1) {
          this.list.splice(index, 1);
        }
        this.save();
      },
      save() {
        localStorage.setItem("todolist", JSON.stringify(this.list));
      },
    },
  });