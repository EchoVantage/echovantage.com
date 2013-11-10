AWS.config.update({accessKeyId: 'AKIAIMFNCEBNBYIUMSYA', secretAccessKey: '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', region: 'us-east-1'});


function publishContactForm(options) {
	var sns = new AWS.SNS({params: {TopicArn: 'arn:aws:sns:us-east-1:334989578730:WWW_CONTACT_FORM'}});
	var message = "Web contact form sumbitted.\n\nEmail: " + options.email + "\nPhone: " + options.phone;
	sns.publish({Message: message}, options.complete);
}

$(function() {
	$('#contact-form').on("submit", function(event) {
		event.preventDefault();
		
		publishContactForm({
			email: $('#email').val(),
			phone: $('#phone').val(),
			complete: function(err, data) {
				var statusMessage;
				if(err) {
					statusMessage = $('.message.failure');
				} else {
					statusMessage = $('.message.success');
				}
				statusMessage.slideDown({
					complete: function() {
						$(this).css('display', 'inline-block');
					}
				});
			}
		});
	});
	
	$('.close-link').click(function() {
		$('.message').slideUp();
	});
});