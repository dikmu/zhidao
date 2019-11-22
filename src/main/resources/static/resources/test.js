//x:s1日志量(MB/s)，y：中台日志量(MB/s)，q：成功切换为标准模式的数量
var x=10,y=400/60,q=7;

//z:2节点logstah的极限流量
var z=x/2+q/2*y;
console.log("logstash极限流量："+z);
console.log("3节点Logstash能否支撑11中台标准模式："+((3*z)>(11*y)));
console.log("4节点Logstash能否支撑11中台标准模式："+((4*z)>(11*y)));
console.log("4节点Logstash能否支撑17中台标准模式："+((4*z)>(17*y)));
