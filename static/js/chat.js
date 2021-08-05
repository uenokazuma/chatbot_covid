const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/')
let firstOpen = false

$(() => {

    $("#addClass").on('click', () => {
        $('#qnimate').addClass('popup-box-on')
        if(firstOpen === false) {
            firstOpen = true
            welcome()
        }
        scrollDown();
    });
    
    $("#removeClass").on('click', () => {
        $('#qnimate').removeClass('popup-box-on')
    });
    
    $('#btn-chat').on('click', () => {
        $('#btn-chat').trigger('click')
    })
    
    $('#btn-input').on('keypress', (ev) => {
        if(ev.which == 13) {
            let ask = $('#btn-input').val()
            console.log('ask : ' + ask)
            if(ask != '') {
                answer(ask)
                $('#btn-input').val('')   
            }
        }
    })
    
})

chatSocket.onmessage = (e) => {
    let data = JSON.parse(e.data)

    if(data.message == 'welcome') {
        $('#direct-chat-messages').html(`
            <div class="direct-chat-ms">
                <div class="direct-chat-info clearfix">
                    <span class="direct-chat-name pull-left">Selamat Datang</span>
                </div>
                <img
                alt="greeting image"
                src="http://placehold.it/50/55C1E7/fff&text=W"
                class="direct-chat-img" />
                <div class="direct-chat-text">
                    Silahkan masukan pertanyaan anda seputar covid.<br>
                    Sumber jawaban diambil dari <a href="https://www.who.int/indonesia/news/novel-coronavirus/qa/qa-for-public" >WHO - Pertanyaan jawaban terkait COVID-19 untuk publik</a>
                </div>
                <div class="direct-chat-info clearfix"></div>
            </div>
        `)
    } else {
        console.log(e.data)
        let response = $.parseJSON(e.data)
        let message = $.parseJSON(response.message)

        $('#direct-chat-messages').append(`
            <div class="direct-chat-msg doted-border">
                <div class="direct-chat-info clearfix">
                    <span class="direct-chat-name pull-left">Question</span>
                </div>
                <img
                    alt="message user image"
                    src="http://placehold.it/50/55C1E7/fff&text=Q"
                    class="direct-chat-img"
                />
                <div class="direct-chat-text">
                    Mungkin maksud pertanyaan anda ini :
                    <br>
                    <b>${message.question}</b>
                </div>
                <div class="direct-chat-info clearfix"></div>
                <div class="direct-chat-info clearfix">
                    <span class="direct-chat-img-reply-small pull-left"> </span>
                    <span class="direct-chat-reply-name">Answer</span>
                </div>
                <div class="direct-chat-text">
                    ${message.answer}
                </div>
        </div>
        `)
    }
    scrollDown()
}

function scrollDown() {
    let box = $('#popup-messages')
    box.animate({scrollTop: box.prop('scrollHeight')}, 1000)
}

function welcome() {
    console.log(chatSocket);
    chatSocket.send(JSON.stringify({
        'message' : 'welcome'
    }))
    
    $('#btn-input').focus();
}

function answer(ask) {
    chatSocket.send(JSON.stringify({
        'message' : ask
    }))
}