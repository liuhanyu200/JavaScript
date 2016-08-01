 <?php include($_SERVER['DOCUMENT_ROOT'].'/application/views/common/i18n.php'); ?>

// 这个函数会在这个文档加载完后才执行
 $(document).ready(function() {
 	$('#table-dept-list').click(dept.tableClick);
 	if ($('#form-dept-new').length) {
 		dept.deptSelect = UI.deptDropTree($('#select-dept'), {title: '<?php echo _("请选择部门"); ?>'});
 		dept.deptSelect.selectById(AC.curDeptid());
 	}
 });

 var dept = {
 	deptSelect: null,

 	tableClick: function(e) {
 		var elem = $(e.target);

 		var tr = elem.parent('tr');
 		var id = tr.attr('data-value');
 		var optype = elem.attr('data-optype');

 		if (optype === 'delete') {
 			UI.dialog.confirm(function() {
 				dept.deptEvent(optype, [id]);
 			}, '<?php echo _("dsfsdf")?>');
 		}
 	},

 	deptEvent: function(optype, values) {
 		AC.ajax({
 			url: '/index.php/user/dept/dept_delete',
 			data: {optype: optype, deptids: C.jsonEncode(values)},
 			success: function(msg) {
 				msg = C.jsonEncode(msg);
 				if (msg[1].length > 0) {
 					C.setCookie('msg1', C.jsonEncode(['<?php echo _("部门已删除"); ?>', 1]), '/');
 					window.location.reload();
 				} else {
 					UI.msg.error('<?php echo _("删除失败"); ?>');
 				}
 			},
 		});
 	},

 	add: function(e, params) {
 		params.pid = dept.deptSelect.get()[0];
 		var error = 0;
 		if (params.deptname === '') {
 			error = 1;
 			UI.itError($('deptname'), '<?php echo _("test"); ?>');
 		}
 		if (params.pid === '') {
 			UI.itError($('deptname'), '<?php echo _("test1")?>');
 			error = 1;
 		}
 		if (error === 0) {
 			AC.ajax({
 				url: '/index.php/user/dept/dept_add',
 				data: params,
 				success: function(msg) {
 					msg = C.jsonDecode(msg);
 					if (msg.error === 'DEPT_ADDED') {
 						
 					}
 				},
 			});
 		}
 	},
 };