
;(function ($) {
	var Slider=function () {
		var self=this;
		//this.wrap=self;
		self.list=$(".touch-item");
		//构造
		self.chushi();
		//绑定事件
		self.bindDOM();
		//初始化索引值
		//self.idx = 0;
	}

	Slider.prototype={
		getIndex:function (n) {
			var self=this;
			var idx=self.idx;
			var lis=$(".touch-item");
			var len=lis.length;
			var cidx;
			//如果传数字 2,3之类可以使得直接滑动到该索引
			if (typeof n == 'number') {
				cidx=idx;
			}else if (typeof n=='string') {
				cidx=idx + n*1;
			}
			//当索引右超出
			if (cidx>len-1) {
				cidx=len-1;
			}else if (cidx<0) {
				cidx=0;
			}
			//保留当前索引值
			this.idx=cidx;
			//改变过度的方式，从无动画变为有动画
			$(lis[cidx]).css({"-webkit-transition":"-webkit-transform 0.2s ease-out"});
			lis[cidx-1] && $(lis[cidx-1]).css({"-webkit-transition":"-webkit-transform 0.2s ease-out"});
			lis[cidx+1] && $(lis[cidx+1]).css({"-webkit-transition":"-webkit-transform 0.2s ease-out"});
			//改变动画后应该的位移值
			$(lis[cidx]).css({"-webkit-transform":"translate3d(0, 0, 0)"});
			lis[cidx-1] && ($(lis[cidx-1]).css({"-webkit-transform":"translate3d(0, -"+ self.documentHei +"px, 0)"}));
			lis[cidx+1] && ($(lis[cidx+1]).css({"-webkit-transform":"translate3d(0, "+ self.documentHei +"px, 0)"}));
		},
		bindDOM:function () {
			var self=this;
			var documentHei=self.documentHei;
			var wrap=$(".wrap");
			var len=self.list.length;
			var idx=0;
			//console.log(idx);
			//手指移动处理事件
			var startHandler=function (evt) {
				//var self=this;

				self.startTime=new Date * 1;
				self.startY=evt.originalEvent.changedTouches[0].clientY;
				
				self.offsetX=0;
				var target = evt.target;
				//while()
				self.target = target;
			}
			/****/
			var moveHandler=function (evt) {
				//console.log(self.startY);
				//var self=this;
				event.preventDefault();
				//计算手指偏移量
				self.offsetY=evt.originalEvent.changedTouches[0].clientY-self.startY;
				//console.log(self.offsetY);
				var items=$(".touch-item");
				var i=idx-1;
				//console.log(i);
				//结束索引
				var m=i+3;
				//最小化改变DOM属性
				//console.log(self.offsetY);
				for (i; i < m; i++) {
					items[i] && ($(items[i]).css({
						"-webkit-transition":"-webkit-transform 0s ease-out",
						"-webkit-transform":"translate3d(0, "+
							self.offsetY +"px, 0)"}));
					//lis[i] && (lis[i].style.webkitTransform = );
				};
			}
			/****/
			var endHandler=function (evt) {
				var self=this;
				evt.preventDefault();
				//边界值就翻页值
				var boundary = documentHei/6;
				var endTime=new Date()*1;
				var lis=$(".touch-item");
				if (endTime-self.startTime>300) {
					if(self.offsetY >= boundary){
						self.goIndex('-1');
					}else if(self.offsetY < 0 && self.offsetY < -boundary){
						self.goIndex('+1');
					}else{
						self.goIndex('0');
					}
				}else{
					//优化
					//快速移动也能使得翻页
					if(self.offsetY > 50){
						self.goIndex('-1');
					}else if(self.offsetY < -50){
						self.goIndex('+1');
					}else{
						self.goIndex('0');
					}
				}
			};
			$(".wrap").on('touchstart', startHandler);
			$(".wrap").on('touchmove', moveHandler);
			$(".wrap").on('touchend', endHandler);

		},
		chushi:function () {
			var self=this;
			self.documentHei=$(document).height();
			$("#canvas").css({"height":self.documentHei+"px"});
			$(".wrap").css({"height":self.documentHei+"px"});
			$(".touch-item").each(function (i) {
				$(this).css({
							"height":self.documentHei+"px",
							"transform":"translate3d(0,"+i*self.documentHei+"px, 0)",
							"-webkit-transform":"translate3d(0,"+i*self.documentHei+"px, 0)"
							});
			});
		}
	}
	Slider.init=function (paras) {
      var _this_=this;
        paras.each(function (i,element) {
          new _this_($(this));
        });
    }
	
	window['Slider']=Slider;
})(jQuery);