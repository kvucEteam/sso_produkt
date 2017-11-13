

// $( document ).ready(function() {  Commented out and moved to wiriteProcessClass.js ---> all furture "skriveguides" will inherit saveTimerUsrMsg funktionality
//     saveTimerUsrMsg();
// });

function external_template1(dataObj1, dataObj2) {
	
}

function UserMsgBox_video(src) {

    var HTML = '<div class="video embed-responsive embed-responsive-16by9 col-xs-12 col-md-12"><iframe class="embed-responsive-item" src="'+src+'?iv_load_policy=3&amp;modestbranding=1&amp;showinfo=0&amp;autohide=1&amp;rel=0" allowfullscreen="1" frameborder="0"></iframe></div>';
    UserMsgBox_xclick('body', HTML);

    $('.MsgBox_bgr').addClass('MsgBox_bgr_video');
    $('#UserMsgBox').attr('id', 'UserMsgBox_video'); 
}

function scaleVideo(ratio) {
	console.log('\nscaleVideo - CALLED');

	if ($( ".MsgBox_bgr_video" ).length > 0) {
		var w = $( ".MsgBox_bgr_video" ).width();
		var h = $( ".MsgBox_bgr_video" ).height();
		// var ratio = 16/9;
		var ratioArr = ratio.split(':');
		ratio = parseInt(ratioArr[0])/parseInt(ratioArr[1]);
		console.log('scaleVideo 1 - w: ' + w + ', h: ' + h + ', ratio: ' + ratio + ' ratio*h: ' + String(ratio*h));

		if (w >= ratio*h) {
			w = ratio*h;
		} else {
			h = w/ratio;
		}
		console.log('scaleVideo 2 - w: ' + w + ', h: ' + h + ', ratio: ' + ratio + ' ratio*h: ' + String(ratio*h));

		$('#UserMsgBox_video').width(w);
		$('#UserMsgBox_video').height(h);
	}
}

$( ".MsgBox_bgr_video" ).on( "keydown", function( event ) {
	if ((event.which == 165) && ($( ".MsgBox_bgr_video" ).length > 0)) {
		$( ".MsgBox_bgr_video" ).fadeOut(400, function(){
			$(this).remove();
		});
	}
});


// Forberedelse til første vejledermøde
function download_1() {
	console.log('\nEXTERNAL FUNCTION download_1 - CALLED');

	var HTML = wordTemplate_1();
	
	var converted = htmlDocx.asBlob(HTML);
    console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'SSO produktkrav - forberedelse til første vejledermøde.docx');
}

// Under første vejledermøde
function download_2() {
	console.log('\nEXTERNAL FUNCTION download_2 - CALLED');

	var HTML = wordTemplate_2();
	
	var converted = htmlDocx.asBlob(HTML);
    console.log("EXTERNAL FUNCTION download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'SSO produktkrav - noter under første vejledermøde.docx');
}


$( document ).on('click', '.videoPlayBtn', function(){
	console.log('videoPlayBtn - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	// UserMsgBox_video('https://www.youtube.com/embed/-Go7min716I');
	UserMsgBox_video( videoSrc );

	scaleVideo('16:9');
});


function contentOf(parentTag, userDataId, heading) {
	return '<div class="contentWrap"> <'+parentTag+' data-id="'+userDataId+'" data-heading="'+heading+'">'+((wpc.api.userData.hasOwnProperty(userDataId))? wpc.api.userData[userDataId] : '')+'</'+parentTag+'> </div>';
}


function contentOfExpandable(wrapperIdPrefix) {
	console.log('\ncontentOfExpandable - CALLED');

	console.log('contentOfExpandable - wpc.api.userData: ' + JSON.stringify(wpc.api.userData));

	var wrapperIdPrefix_arr = [];
	for (var id in wpc.api.userData) {
		if (id.indexOf(wrapperIdPrefix)!==-1) {
			wrapperIdPrefix_arr.push(id); 
		}
	}
	wrapperIdPrefix_arr.sort();
	console.log('contentOfExpandable - wrapperIdPrefix_arr: ' + JSON.stringify(wrapperIdPrefix_arr));

	var HTML = '';
	HTML += '<div class="contentWrap">';
		for (var n in wrapperIdPrefix_arr) {
			HTML += '<p>'+wpc.api.userData[wrapperIdPrefix_arr[n]]+'</p>';
		}
	HTML += '</div>';
	console.log('contentOfExpandable - HTML: ' + HTML);

	return HTML;
}


// emne
// halvSideEmneBeskrivelse
// spoergsmaalTilVejleder
// noterFraVejlederMoede
// aftalerOgProduktkrav

function wordTemplate_1() {
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {}';
	HTML += 			'.gray {color: #666;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	
	HTML += 	'<h1>Forberedelse til første vejledermøde</h1>';
	HTML += 	'<h4>Emne</h4>';
	HTML += 	contentOf('p','#emne', 'Emne');  		
	HTML += 	'<h4>Emnebeskrivelse</h4>';
	HTML += 	contentOf('p','#halvSideEmneBeskrivelse', 'Emnebeskrivelse');  
	HTML += 	'<h4>Materialeliste</h4>';
	HTML += 	contentOfExpandable('#materialeliste');  		
	HTML += 	'<h4>Spørgsmål til vejleder</h4>';
	HTML += 	contentOf('p','#spoergsmaalTilVejleder', 'Spørgsmål til vejleder');  

	HTML += 	'<br><br>';		


	// HTML += 	'<h1 class="gray">Under mødet</h1>';


	HTML += 	'<h2>Noter fra mødet med vejlederen</h2>';
	HTML += 	'<p class="gray">(Noter til emne, nye ideer og uddybning af ideer, forsøg, ny mødedato mv.)</p>';
	HTML += 	'<br><br>';

	HTML += 	'<h4>Aftaler fra mødet</h4>';
	HTML += 	'<p class="gray">(Beskrivelse af aftaler og produktkrav til det andet møde.)</p>';
	HTML += 	'<br><br>';


	HTML += 	'<h1>Forberedelse til andet vejledermøde</h1>';


	HTML += 	'<h4>Hvilke faglige begreber vil du anvende?</h4>';
	HTML += 	'<p class="gray">(Skriv en halv til en hel side, hvor du giver eksempler på faglig argumentation: sproglig analyse af en af dine centrale kilder, kildekritik, beskrivelse af modeller, anvendelse af faglige begreber, beviser, udregninger mv. Produktet skal sendes til vejleder i rimelig tid inden mødet.)</p>';
	HTML += 	'<br><br>';

	HTML += 	'<h4>Hvilke faglige teorier vil du anvende?</h4>';
	HTML += 	'<br><br>';

	HTML += 	'<h4>Hvilke faglige metoder vil du anvende?</h4>';
	HTML += 	'<br><br>';

	HTML += 	'<h4>Faglig argumentation</h4>';
	HTML += 	'<p class="gray">(Hvad vil du gerne frem til i din SSO? Hvordan vil du undersøge dit emne? Hvilke teorier, metoder og begreber kan hjælpe dig med at skrive noget faglige relevant i din opgave?)</p>';
	HTML += 	'<br><br>';

	HTML += 	'<h4>Materialeliste</h4>';
	HTML += 	'<p class="gray">(Skriv videre på/redigér din litteraturliste fra første møde (bøger, kilder, og andet empiri som du vil anvende i din SSO))</p>';
	HTML += 	'<br><br>';


	// HTML += 	'<h2>Noter fra andet vejledermøde</h2>';    // COMMENTED OUT 10/11-2017
	HTML += 	'<h2>Noter fra mødet med vejlederen</h2>';  // ADDED 10/11-2017


	// HTML += 	'<h4>Referat fra mødet</h4>';    // COMMENTED OUT 10/11-2017
	HTML += 	'<p class="gray">(Skriv kommentarer til produktet, nye ideer og uddybning af ideer, nærmere afklaring af opgaveformulering m.m. her)</p>';
	HTML += 	'<br><br>';

	// HTML += 	'<h4>XXX</h4>';
	// HTML += 	'<p class="gray">XXX</p>';
	// HTML += 	'<br><br>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}


// emne
// halvSideEmneBeskrivelse
// spoergsmaalTilVejleder
// noterFraVejlederMoede
// aftalerOgProduktkrav

function wordTemplate_2() {
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ul {font-size: 14px;}';
	HTML += 			'#author div {display: inline-block;}';
	HTML += 			'.instruction {color: #999;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	
	HTML += 	'<h1>Spørgsmål under første vejledermøde</h1>';
	HTML += 	'<h4>Noter fra første vejledermøde</h4>';
	HTML += 	contentOf('p','#noterFraVejlederMoede', 'Emne');  		
	HTML += 	'<h4>Aftaler fra mødet</h4>';
	HTML += 	contentOf('p','#aftalerOgProduktkrav', 'Aftaler fra mødet');   

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}


$(window).resize(function() {

	scaleVideo('16:9');

});