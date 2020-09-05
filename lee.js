"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg='#87CEEB'>
                <toolbar id="toolbar" title="秃驴定制版3.0"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <Switch margin="10 5" id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                            <View bg="#2196f3" h="*" w="10"/>
                        </card>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <vertical padding="18 8" h="auto">
                                <text text="帐号总个数：" textColor="#222222" textSize="16sp"/>
                                <text id='total' text="0" textColor="#00FA9A" textSize="14sp"/>
                            </vertical>
                            <View bg="#4caf50" h="*" w="10"/>
                        </card>
                        {/* <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <vertical padding="18 8" h="auto">
                                <text text="目前运行帐号个数：" textColor="#222222" textSize="16sp"/>
                                <text id ='cur' text="0" textColor="#FF4500" textSize="14sp"/>
                            </vertical>
                            <View bg="#ff5722" h="*" w="10"/>
                        </card> */}
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <horizontal padding="18 8" h='auto'>
                                <text textSize="16sp" textColor='black' text="设置开始帐号数:"/>
                                <input id='phone' inputType='number'/>
                            </horizontal>
                            <View bg="#00BFFF" h="*" w="10"/>
                        </card>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <horizontal padding="18 8" h='auto'>
                                <text textSize="16sp" textColor='black' text="设置观看广告条数:"/>
                                <input id='adv' inputType='number'/>
                            </horizontal>
                            <View bg="#00BFFF" h="*" w="10"/>
                        </card>
                        <button margin="10 5" bg="#283593" textColor="#ffffff" id="start" text="开始运行"/>
                    </vertical>
                </frame>
                <frame>
                    <vertical>
                        <button margin="10 5" bg="#283593" textColor="#ffffff" id="clear" text="清除日志"/>
                        <text id='logs' text="日志" textColor="red" textSize="16sp"/>
                    </vertical>
                </frame>
                <frame>
                    <img  scaleType="fitXY" src="http://r.photo.store.qq.com/psb?/V126ePDm00mdVN/*HejydOtNPYVl6RrZIeCCHKY8RyfI7TS08ib2FODFbo!/r/dDUBAAAAAAAA"/>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

ui.statusBarColor('#87CEEB')
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    // menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        // case "设置":
        //     toast("还没有设置");
        //     break;
        case "关于":
            alert("关于", "李二狗出品v3.0.0,QQ:328891723");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能", "日志", "正版认证"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "备用一",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "备用二",
      icon: "@drawable/ic_settings_black_48dp"
  },
  {
      title: "备用三",
      icon: "@drawable/ic_favorite_black_48dp"
  },
  {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);

ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
    }
})

ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
var c = 0
ui.start.on("click", function(index){
    c++;
    if(c ==1 ){
            //程序开始运行之前判断无障碍服务
        if(auto.service == null) {
            toast("请先开启无障碍服务！");
            return;
        }else{
            setTimeout(() => {
                c = 0
            }, 2000);
            console.show();
            console.setGlobalLogConfig({
                "file": "/sdcard/autojs-log.txt"
            });
            log('日志已生成在===>/sdcard/autojs-log.txt') 
            var path2 = '/sdcard/1.txt';
            var file2 = open(path2);
            var name2 = file2.readlines();
            ui.total.setText(name2.length.toString())
            main(name2);
        }
    }else {
        toast('请勿重复点击')
    }
    
});

function main(name2){
    // 这里写脚本的主逻辑
    var sum = threads.disposable()
    threads.start(function () {
        // var storage = storages.create("files") //本地存储文件建立
        // storage.put("键名","键值") //向存储中存入数据
        // storage.get("键名") 
        // var arr =[];
        // log(name)
        var ph=ui.phone.text() || 0;
        var ads = ui.adv.text() || 5;
        console.info('秃驴几厘米======》',name2.length) 
        log(ph)
        for (let x = ph-1; x <= name2.length-1; x++) {
            sleep(1000)
            var path = '/sdcard/1.txt';
            var file = open(path);
            var name = file.readlines();
            log(name[x])
            var str = name[x];
            log('xxxxx',name.length)
            var arr = str.split('-');
            var name = arr[0];
            var pass = arr[1];
            console.info('秃驴泡妞的第 ======》'+(x+1)+'个电话',name)
            console.error('广告请联系李二狗qq328891723')
            // ui.logs.setText('广告请联系李二狗qq328891723')
            // ui.logs.setText("秃驴拥有姓名 ======》"+name)
            start(name,pass,ads);
            x++;
            sum.setAndNotify(x)
            log(x)
        }
        log(sum.blockedGet())
        log("运行结束");
        console.hide();
        exit();
    });
    // setInterval(() => {
    //     ui.cur.setText(sum.blockedGet().toString())
    // }, 1000*10);
}

   // start()
function start(name,pass,ads){
    auto.waitFor()
    launchApp('PickTa');
    sleep(1000);
    var user = id('et_phone').findOne(1000);
    var password = id('et_pass').findOne(1000);
    if(user!=null){
        user.setText(name);
        sleep(1000);
        password.setText(pass);
        sleep(1000);
        id('tv_login').findOne().click()
    }
    // else{
    //     var p = className('RelativeLayout').drawingOrder(5);
    //     p.click();
    //     sleep(1000);
    //     var out = id('rl_logout').findOne();
    //     out.click();
    //     sleep(1000);
    //     id('tv_confirm').findOne().click();
    //     sleep(2000);
    // }
    sleep(1000)
    var ad = className('RelativeLayout').drawingOrder(2);
    // log(ad)
    ad.click();
    sleep(2000);
    var i = 0
    log('ads=======',ads)
    while(i<=ads){
        i++;
        console.info('i======已经看过的广告数目',i);
        if(i==2){
            sml_move(400, 1800, 800, 230, 1000);
            sleep(1000);
        }
        var enterAd = text('进入广告').findOne().parent();
        // log(enterAd)
        enterAd.click();
        sleep(12000);
        var juan = text('领券').findOne().parent();
        juan.click();
        sleep(1000);
        var flag = id('tv_confirm').findOne(1000);
        if(flag != null){
            var sure = id('tv_confirm').findOne();
            sure.click();
            sleep(2000);
            var get = id('tv_status').findOne();
            get.click();
            log('已经领取的M豆===',i)
            sleep(3000);
            back();
            sleep(1000);
            back();
            sleep(1000);
            sml_move(400, 1800, 800, 230, 1000);
            sleep(1000);
        }else{
            sleep(3000);
            back();
            sleep(1000);
            sml_move(400, 1800, 800, 230, 1000);
            sleep(1000);
        }  
    }
        sleep(1000);
        var p = className('RelativeLayout').drawingOrder(5);
        p.click();
        sleep(1000);
        var out = id('rl_logout').findOne();
        out.click();
        sleep(1000);
        id('tv_confirm').findOne().click();
        sleep(2000);
}

    
//长距离测试
// sml_move(400, 1800, 800, 230, 1000);
//短距离测试
//sml_move(400, 1000, 800, 600, 1000);

function bezier_curves(cp, t) {
cx = 3.0 * (cp[1].x - cp[0].x); 
bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
ax = cp[3].x - cp[0].x - cx - bx; 
cy = 3.0 * (cp[1].y - cp[0].y); 
by = 3.0 * (cp[2].y - cp[1].y) - cy; 
ay = cp[3].y - cp[0].y - cy - by; 

tSquared = t * t; 
tCubed = tSquared * t; 
result = {
    "x": 0,
    "y": 0
};
result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
return result; 
};

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
var xxy = [time];
var point = [];
var dx0 = {
    "x": qx,
    "y": qy
};

var dx1 = {
    "x": random(qx - 100, qx + 100),
    "y": random(qy , qy + 50)
};
var dx2 = {
    "x": random(zx - 100, zx + 100),
    "y": random(zy , zy + 50),
};
var dx3 = {
    "x": zx,
    "y": zy
};
for (var i = 0; i < 4; i++) {

    eval("point.push(dx" + i + ")");

};
// log(point[3].x)

for (let i = 0; i < 1; i += 0.08) {
    xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

    xxy.push(xxyy);

}

// log(xxy);
gesture.apply(null, xxy);
};