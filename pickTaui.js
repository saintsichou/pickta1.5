"ui";


var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg='#87CEEB'>
                <toolbar id="toolbar" title="李二狗重制版1.5"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <Switch margin="10 5" id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                            <View bg="#FDFFB6" h="*" w="10"/>
                        </card>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <vertical padding="18 8" h="auto">
                                <text text="帐号总个数：" textColor="#222222" textSize="16sp"/>
                                <text id='total' text="0" textColor="#00FA9A" textSize="14sp"/>
                            </vertical>
                            <View bg="#CAFFBF" h="*" w="10"/>
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
                                <input id='phone'  w='*' inputType='number'/>
                            </horizontal>
                            <View bg="#9BF6FF" h="*" w="10"/>
                        </card>
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <horizontal padding="18 8" h='auto'>
                                <text textSize="16sp" textColor='black' text="设置观看广告条数:"/>
                                <input id='adv'  w='*' inputType='number'/>
                            </horizontal>
                            <View bg="#BDB2FF" h="*" w="10"/>
                        </card>
                        <button margin="10 5" bg="#283593" textColor="#ffffff" id="start" text="开始运行"/>
                        <frame height="200" gravity="center">
                            <text textColor='#1a237e' text="启动脚本之前请先开启无障碍服务,有问题联系李二狗qq328891723,系统默认从0个帐号开始,广告数默认6条，如有需要请手动设置，设置开始帐号前请退出帐号。" gravity="center"/>
                        </frame>
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
            alert("关于", "李二狗出品v1.5,QQ:328891723");
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
            }, 3000);
            files.remove('/sdcard/autojs-log.txt')
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
        toast('请勿重复点击,隔3s后再点击')
    }
    
});


function main(name2){
    // 这里写脚本的主逻辑
    // var sum = threads.disposable()
    threads.start(function () {
        var ph=ui.phone.text() || 1;
        var ads = ui.adv.text() || 5;
        console.info('帐号总数======》',name2.length) 
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
            console.info('第 ======》'+(x+1)+'个电话',name)
            console.error('广告请联系李二狗qq328891723')
            // ui.logs.setText('广告请联系李二狗qq328891723')
            // ui.logs.setText("秃驴拥有姓名 ======》"+name)
            start(name,pass,ads);
            //子线程发射事件
            // sum.setAndNotify(x)
            // log(x)
        }
        // log(sum.blockedGet())
        files.remove('/sdcard/autojs-log.txt')
        log("运行结束,删除日志文件");
        console.hide();
        exit();
    });
    //接收主线程传出的值并动态更新设置ui
    // setInterval(() => {
    //     ui.cur.setText(sum.blockedGet().toString())
    // }, 1000*10);
}

function start(name,pass,ads){
    auto.waitFor()
    launchApp('PickTa');
    sleep(1000);
    var user = className("android.widget.EditText").indexInParent(1);
    var password = className("android.widget.EditText").indexInParent(0);
    if(user!=null){
        user.setText(name);
        sleep(1000);
        password.setText(pass);
        sleep(1000);
        text('登录').findOne().parent().click()
    }
    sleep(1000);
    var t = text('PickTa V1.5.0正式上线').findOne(1000)
    if(t!=null){
        var update = text('PickTa V1.5.0正式上线').findOne(1000).parent().children().get(2)
        update.click()  
    }else{
        toast('李二狗出品qq328891723')
    }
    sleep(1000);
    var ad = className('android.view.ViewGroup').indexInParent(3);
    ad.click();
    sleep(2000);
    /*
    *结构内容为
    *scroll
        -  viewg
        -  viewg
            -viewg -Click
    *
    */
    //第一种方法 找到字节点中心点并点击
    var bea = text('精彩瞬间').findOne().parent().children().get(1).text()
    var finish = bea.split('/')[0];
    var total = bea.split('/')[1];
    if(finish*1<total*1){
        var i = 0
        while(i<=ads){
            i++;
            var adv = className("android.widget.ScrollView").findOne().children().forEach(function(child){
                // log(child.children())
                var o = child.children().get(1)
                // log(o.children().get(0))
                sleep(1000)
                var adv =o.children().get(0)
                click(adv.bounds().centerX(), adv.bounds().centerY())
                sleep(1000*22);
                back();
            });
        }
    }
    sleep(1000);
    var profile = className('android.view.ViewGroup').indexInParent(5);
    profile.click();
    sleep(1000);
    var set = text('设置').findOne();
    click(set.bounds().centerX(), set.bounds().centerY())
    sleep(2000);
    var loginout=text('退出登录').findOne().parent();
    loginout.click()
    //第二种方法
    // var adv = text('NIKE KD13 关键时刻担当').findOne().parent().parent().parent()
    // click(adv.bounds().centerX(), adv.bounds().centerY())

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