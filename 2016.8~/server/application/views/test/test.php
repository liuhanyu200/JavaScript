<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jQuery</title>
	<link rel="stylesheet" href="/server/style/main.css">
</head>
<body>
<style>
	.box-shadow{  

     //Firefox4.0-  

     -moz-box-shadow:投影方式 X轴偏移量 Y轴偏移量阴影模糊半径 阴影扩展半径 阴影颜色;  

     //Safariand Google chrome10.0-  

     -webkit-box-shadow:投影方式 X轴偏移量 Y轴偏移量阴影模糊半径 阴影扩展半径 阴影颜色;  

     //Firefox4.0+、 Google chrome 10.0+ 、 Oprea10.5+ and IE9  

     box-shadow:  投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色;  
	} 
	ul{
		overflow:hidden;
		max-width: 520px;
		min-width: 260px;
		margin:100px auto;
	}
	li{
		/*display:block;*/
		padding:7px;
		margin:7px;
		/*border:2px solid #3a9;*/
		background:#ff7f00;
		float:left;
		list-style:none;
		border-radius:5px;
	}
	#change{
		position:fixed;
		top:20px;
		left:40px;
		text-decoration:none;
		font-size:25px;
	}
	.float{
		cursor:pointer;
		-webkit-box-shadow:0 0 10px #0CC;  
  		-moz-box-shadow:0 0 10px #0CC;  
  		box-shadow:0 0 10px #0CC;
  		/*padding:12px;*/
  		/*font-size:16px;  */
	}
	/* 当你查找不到元素的时候 就去看看属性后面分号有没有打错！！！ */
	#delete_succ{
		position:absolute;
		top:20px;
		right:50px;
		border-radius:5px;
		padding:10px;
		background:#EEB422;
		display:none;
	}
	#ajax{
		overflow:hidden;
		padding:5px;
		background:#eee;
	}
</style>
	<span id="delete_succ">delete success !</span>
	<div class="wrap">
		<span>
			<ul>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>
				<li>品牌5</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>
				<li>品牌6</li>
				<li>品牌7</li>
				<li>品牌8</li>
				<li>品牌9</li>
				<li>品牌0</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>				<li>品牌6</li>
				<li>品牌7</li>
				<li>品牌8</li>
				<li>品牌9</li>
				<li>品牌0</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>				<li>品牌6</li>
				<li>品牌7</li>
				<li>品牌8</li>
				<li>品牌9</li>
				<li>品牌0</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>				<li>品牌6</li>
				<li>品牌7</li>
				<li>品牌8</li>
				<li>品牌9</li>
				<li>品牌0</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
				<li>品牌4</li>				<li>品牌6</li>
				<li>品牌7</li>
				<li>品牌8</li>
				<li>品牌9</li>
				<li>品牌0</li>
				<li>品牌1</li>
				<li>品牌2</li>
				<li>品牌3</li>
			</ul>
			<a href="javascript:;" id="change">显示全部</a>
		</span>
	</div>
	<span id="ajax"></span>
	<a href="javascript:;" id="a">用JavaScript获取</a>
	<a href="javascript:;" id="b">用jQuery获取</a>
	<script type="text/javascript" src="/server/js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/server/js/Ajax.js"></script>
	<script type="text/javascript">

		// $("li").append('<span>123456</span>');// 元素内部追加
		// $("li").appendTo('<span>100</span>');// 将所有匹配的元素追加到指定的元素中
		// $('li').prepend("<span>你好！</span>"); // 元素内部的前面追加
		// $("li").after("<span>100</span>");// 向指定元素后面追加

		// 获取12以后不包括12的li
		var category = $("ul li:gt(12):not(:last)");
		category.hide();
		// 加移入移除效果
		$("ul li").mouseenter(function() {
			$(this).addClass("float");
		});
		$("ul li").mouseleave(function() {
			$(this).removeClass("float");
		});

		// delete
		$("ul li").click(function() {
			$(this).remove();
			$('#delete_succ').fadeIn();
			$('#delete_succ').delay(2000).fadeOut(3000)
		});

		// 获取按钮
		var toggleBtn = $("div > span > a");
		$("li:even").css("background","#ccc");
		toggleBtn.click(function() {
			if(category.is(":visible")) {
				category.fadeOut(2000);
				// category.slideUp(2000);
				$(this)
				.text("显示全部")
				.css("color","blue");
			} else {
				category.fadeIn(2000);
				$(this)
				.text("精简显示")
				.css("color","green");
			}
		});
	</script>
</body>
</html>