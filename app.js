
angular.module('cartApp',[])
        .controller('CartContrl',function ($scope) {
            //初始化数据
            $scope.cart = [
                {id:'001',name:'Iphone6',price:3800,count:3},
                {id:'001',name:'Iphone6s',price:3800,count:5},
                {id:'001',name:'IMac',price:12000,count:3},
                {id:'001',name:'IPad',price:3800,count:7}
            ];
            //得到总价
            $scope.getTotalPrice = function() {
                var totalPrice = 0;
                $scope.cart.forEach(function (item) {
                    totalPrice += item.price*item.count;
                });
                return totalPrice;
            }
            //得到总数量
            $scope.getTotalNum = function() {
                var totalNum = 0;
                $scope.cart.forEach(function (item) {
                    totalNum += item.count*1;
                });
                return totalNum;//变成数
            }

            //清空购物车
            $scope.clear = function () {
                if(confirm("确定清空吗？"))
                    $scope.cart = [];
            }

            //移除
            $scope.delete = function (index) {
                var name = $scope.cart[index].name;
                if(confirm("确定要删除"+name+"吗？"))
                    $scope.cart.splice(index,1);
            }
            
            //更新购物车数量
            $scope.updataCount = function (index , isAdd) {
                var item = $scope.cart[index];
                item.count = item.count + (isAdd ? 1:-1);
                //如果count=0，就询问是否删除
                if(item.count===0){
                    if(confirm("确定要删除"+item.name+"吗？")){
                        $scope.cart.splice(index,1);//确定就删除
                    }else {
                        item.count = 1;//取消就维持不变
                    }
                }
            }

            //深度监视cart
            $scope.$watch('cart',function (newCart,oldCart) {
                if(newCart!==oldCart){
                    for (var i=0;i<newCart.length;i++){
                        var newCount = newCart[i].count;
                        var oldCount = oldCart[i].count;
                        //如果输入的是空字符串或者空格可以
                        if(newCount =='') return;
                        //如果不是数字或者数字小于1数字不更新
                        if (isNaN( newCount*1) || newCount<=0){
                            newCart[i].count = oldCount;
                            return;
                        }//isNaN函数用法：不是数值得情况下返回true；是数值返回false
                    }
                }
            },true)

            //失去焦点检测
            $scope.checkCount = function (item) {
                if(item.count ==='') item.count=1;
            }

        });