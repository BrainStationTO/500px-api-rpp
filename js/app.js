var page = 0;
var gettingPage = false;
var threshold = 100;
var params = {
	'feature':'popular',
	'term': 'toronto',
	'category':1,
	'consumer_key': 'UwYxXKmkEzRIhK4EykqRRlItxrdij6eo0Igwz3Wc',
	'image_size': 3,
	'sort':'votes_count',
	'rpp': 10,
	'exclude': 'People',
};


$(document).ready(function() {
	getPage(page);
	$(window).trigger('hashchange');

	$('#select-rpp').change(function() {
		var newRpp = this.value;
		params['rpp'] = this.value;
		console.log(newRpp);
		page = 0;
		getPage(0);
	});
});





$(window).scroll(function() {
	console.log('document.body.scrollTop: ' + document.body.scrollTop);
	console.log('window.innerHeight: ' + window.innerHeight);
	console.log('document.body.clientHeight: ' + document.body.clientHeight);
	if (document.body.scrollTop + window.innerHeight > document.body.clientHeight - threshold) {
		getPage(page);
	}
});


function getPage(_page) {
	if (gettingPage) return;
	page = ++_page;
	params['page'] = page;
	gettingPage = true;
	 
	$.get(
		'https://api.500px.com/v1/photos/search?' + $.param(params),
		function (data) {
			var markup = '';
			$.each(data.photos, function(key, photo) {

				var img = '';
				var div = '';
				var p = '';
				var photoCount = $('.f00 > div').length;

				img += '<img src="';
				img += photo.image_url;
				img += '"/>';

				p += '<p>';
				p += photo.name || 'Untitled';
				p += '</p>';

				div += '<div data-photo-count="' + photoCount + '">';
				div += img + p;
				div += '</div>';

				markup += div;
			});
			if (page == 1) {
				$('.f00px').html(markup);
			} else {
				$('.f00px').append(markup);
			}
			gettingPage = false;
		}
	);
	console.log(page);
}