$(function() {
/*	var x = "{{#usersBooks}}";
	var temp = Mustache.render(x, )
	alert();*/

	var currentBookId;

	$(".return").click(function() {	
		$("#question").modal();
		currentBookId = [];
		currentBookId.push($(this).attr("value"));
		console.log(currentBookId);
	/*	$(".modal-title").text("Do you want to continue?");
		var textWithAnswers = "<h4>Summary: </h4>";
		$(".modal-body").html(textWithAnswers);*/
	});

	$('.noReview').click(function() {
		var data = currentBookId[0];

		console.log("before post: "+data);
		var values = {
			'item': currentBookId[0]
		};

		$.ajax({
			type: "POST",
			url: "/return",
			data: values,
			success: function(response){
				window.location.href = "list";
			}
		});
	});

	$(".addReview").click(function() {	
		$("#review").modal();
	});

	
	$('.withReview').click(function() {
		var data = currentBookId[0];

		var values = {
			'item': currentBookId[0],
			'review': $('.reviewText').val()
		};

		$.ajax({
			type: "POST",
			url: "/returnWithReview",
			data: values,
			success: function(response){
				window.location.href = "list";
			}
		});
	});

	$('.revIcon').click(function(event) {
		var currentBookIdWithRev = $(this).attr('name');
		console.log(currentBookIdWithRev);
/*		var values = {
			'bookId': $(this).attr('name')
		};
		$.ajax({
			type: "POST",
			url: "/bookReviews",
			data: values,
			success: function(response){
				console.log(response);
				window.location.href = "reviews"+response;
			}
		});*/
		window.location.href = "reviews/"+currentBookIdWithRev;
	});


});


