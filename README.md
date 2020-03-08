# 订阅管理RESTful API构造

## 背景：

为了科学上网，购买了几个机场服务，但是众所周知的原因机场容易被ban，导致其机场订阅链接不可用。

恰巧手上有一台国外的vps，打算用其来做一个订阅中转



## 使用
推荐方法：部署到Google app engine平台

备用方法：部署到自己的vps主机，框架大致为 express + forever + nginx

注意最好使用ssl安全连接

### API

#### 添加新的订阅链接

method: POST

url: /sub_link

body(urlencoded):

​	name: 节点名称

​	url: 订阅地址



#### 获取全部的订阅链接和订阅名称

method: GET

url: /sub_link



#### 根据订阅名称获得订阅链接

method: GET

url: /sub_link/:sub_name



#### 根据订阅名称修改订阅链接

method: PUT

url: /sub_link/:sub_name

body(urlencoded):

​	url: 要修改为的订阅链接



#### 根据订阅名称删除订阅链接

method: DEL

url: /sub_link/:sub_name



#### 根据订阅名称获取订阅内容

method: GET

url: /sub/:sub_name