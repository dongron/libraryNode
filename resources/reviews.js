$(function() {
	var userId = $('.userId').attr('value');
	var revUserId;
	console.log(userId);
	var bookId = $('.bookId').attr('value');

	$.each($(".revUserId"), function(key, value) {
		console.log("--");
		console.log(this.value);

		if(this.value != userId) {
			$(this).remove();
		}
	});

	$('.revUserId').click(function() {
		console.log(bookId + " | " + userId);
		var values = {
			'bookId': bookId,
			'userId': userId
		};

		$.ajax({
			type: "POST",
			url: "/removeRev",
			data: values,
			success: function(response){
				console.log("resp :"+response);
				window.location.reload(true);
			}
		});
	});

});


