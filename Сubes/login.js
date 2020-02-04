"use strict";

function login_initialize(container) {
    var cid, user, room;
    var connection_error_text = "connection error, please reaload the page";
    var box;
    var canvas = $t.id('canvas');
    var label = $t.id('label');
    var set = $t.id('set');
    var selector_div = $t.id('selector_div');
    var info_div = $t.id('info_div');
    var desk = $t.id('desk');
    var log = new $t.chat.chat_box($t.id('log'));

    function resize() {
        /*var w = window.innerWidth - 300 + 'px';
        var h = window.innerHeight + 'px';
        desk.style.width = canvas.style.width = w;
        desk.style.height = canvas.style.height = h;
        log.resize(300 - 30, window.innerHeight - 10);*/

        var w = window.innerWidth + 'px';
        var hh = Math.floor(window.innerHeight * 0.24);
        var h = window.innerHeight - hh + 'px';
        desk.style.width = canvas.style.width = w;
        desk.style.height = canvas.style.height = h;
        log.resize(window.innerWidth - 30, hh - 10);
    }

    function make_notation_for_log(notation, result) {
        var res = $t.element('span');
        $t.inner($t.dice.stringify_notation(notation) + (notation.result.length ? ' (preset result)' : ''),
                $t.element('span', { 'class': 'chat-notation' }, res));
        $t.inner(result ? ' → ' + result : ' ...',
                $t.element('span', { 'class': 'chat-notation-result' }, res));
        return res;
    }

    function mdice_initialize(container) {
        log.own_user = user;
        resize();
        on_set_change();

        function on_set_change(ev) { set.style.width = set.value.length + 3 + 'ex'; }
        $t.bind(set, 'keyup', on_set_change);
        $t.bind(set, 'mousedown', function(ev) { ev.stopPropagation(); });
        $t.bind(set, 'mouseup', function(ev) { ev.stopPropagation(); });
        $t.bind(set, 'focus', function(ev) { $t.set(container, { class: '' }); });
        $t.bind(set, 'blur', function(ev) { $t.set(container, { class: 'noselect' }); });

        $t.bind($t.id('clear'), ['mouseup', 'touchend'], function(ev) {
            ev.stopPropagation();
            set.value = '0';
            on_set_change();
        });

        box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
        box.use_adapvite_timestep = false;
        box.animate_selector = false;

        $t.bind(window, 'resize', function() {
            resize();
            box.reinit(canvas, { w: 500, h: 300 });
        });

        function close() {
            if (cid) {
                $t.rpc({ method: 'logout', cid: cid });
            }
        }
        $t.bind(window, 'beforeunload', close);
        window.onbeforeunload = close;
        window.onunload = close;

        $t.bind($t.id('logout'), 'click', function() {
            close();
            location.reload();
        });

        function show_selector() {
            info_div.style.display = 'none';
            selector_div.style.display = 'inline-block';
            box.draw_selector();
        }

        function before_roll(vectors, notation, callback) {
            info_div.style.display = 'none';
            selector_div.style.display = 'none';
            hide_error();
            teal.id('waitform').style.display = "block";
            box.clear();
            var time = new Date().getTime();
            log.add_unconfirmed_message(user, make_notation_for_log(notation),
                    time, log.roll_uuid = $t.uuid());
            try {
                $t.rpc({ method: 'roll', cid: cid, vectors: vectors, notation: notation, time: time },
                function(response) {
                    if (response && response.error) show_error(response.error);
                    callback();
                });
            }
            catch (e) {
                show_error(connection_error_text, true);
                console.log(e);
                callback();
            }
        }

        function notation_getter() {
            return $t.dice.parse_notation(set.value);
        }

        box.bind_mouse(container, notation_getter, before_roll);
        box.bind_throw($t.id('throw'), notation_getter, before_roll);

        $t.bind(container, ['mouseup', 'touchend'], function(ev) {
            ev.stopPropagation();
            if (selector_div.style.display == 'none') {
                if (!box.rolling) show_selector();
                return;
            }
            var name = box.search_dice_by_mouse(ev);
            if (name) {
                var notation = $t.dice.parse_notation(set.value);
                notation.set.push(name);
                set.value = $t.dice.stringify_notation(notation);
                on_set_change();
            }
        });

        log.bind_send(function(text) {
            var notation = $t.dice.parse_notation(text);
            var uuid = $t.uuid();
            if (notation.set.length && !notation.error) {
                set.value = text;
                box.start_throw(function() { return notation; }, before_roll);
            }
            else {
                if (text.length > 1) {
                    for (var i = 0, l = text.length; i < l; ++i) if (text[i] != '-') break;
                    if (i == l) text = $t.element('hr');
                }
                var time = new Date().getTime();
                log.add_unconfirmed_message(user, text, time, uuid);
                $t.rpc({ method: 'chat', cid: cid, text: text, time: time, uuid: uuid },
                function(response) {
                    if (response && response.error) show_error(response.error);
                });
            }
        });

        show_selector();
    }

    function show_error(text, terminal) {
        $t.id('error_text').innerHTML = text;
        if (terminal) {
            teal.id('waitform').style.display = "block";
            teal.id('waitform').style.cursor = "default";
        }
    }

    function hide_error() {
        $t.id('error_text').innerHTML = '&nbsp;';
    }

    var action_pool = {
        login: function(res) {
            var loginform = $t.id('loginform');
            if (loginform) {
                $t.remove(loginform);
                $t.element('div', { id: 'error_text', class: 'error-text noselect' }, desk);
                mdice_initialize(container);
                $t.id('info_field').style.display = "inline-block";
                log.place.style.display = "inline-block";
            }
            hide_error();
        },
        userlist: function(res) {
            var f = $t.id('info_field');
            f.innerHTML = 'players of room ' + res.room + ': ' + res.list.join(', ');
            log.add_info('user ' + res.user + ' has ' + { 'add': 'joined', 'del': 'left' }[res.act] + ' the room');
        },
        roll: function(res) {
            teal.id('waitform').style.display = "none";
            if (log.roll_uuid) log.confirm_message(log.roll_uuid, undefined, true);
            else log.add_unconfirmed_message(res.user, make_notation_for_log(res.notation),
                    res.time, log.roll_uuid = $t.uuid(), true);
            info_div.style.display = 'none';
            selector_div.style.display = 'none';
            box.clear();
            box.rolling = true;
            box.roll(res.vectors, res.notation.result, function(result) {
                var r = result.join(' ');
                if (res.notation.constant) r += ' +' + res.notation.constant;
                if (result.length > 1) r += ' = ' + 
                        (result.reduce(function(s, a) { return s + a; }) + res.notation.constant);
                label.innerHTML = r;
                info_div.style.display = 'inline-block';
                box.rolling = false;
                if (log.roll_uuid) {
                    log.confirm_message(log.roll_uuid, make_notation_for_log(res.notation, r));
                    delete log.roll_uuid;
                }
            });
        },
        chat: function(res) {
            if (res.uuid) log.confirm_message(res.uuid);
            else log.add_message(res.user, res.text, res.time);
        }
    };

    function process_channel() {
        $t.rpc({ method: 'info', cid: cid },
        function(m) {
            for (var i in m) {
                var res = m[i];
                if (res.error) {
                    show_error(res.error);
                }
                else if (action_pool.hasOwnProperty(res.action)) {
                    action_pool[res.action](res);
                }
            }
            teal.id('waitform').style.display = "none";
            setTimeout(process_channel, 1500);
        });
    }

    function login() {
        hide_error();
        teal.id('waitform').style.display = "block";
        try {
            user = $t.id('input_user').value;
            room = $t.id('input_room').value;
            $t.rpc({ method: 'join', user: user, room: room }, 
            function(response) {
                if (response.error) {
                    show_error(response.error);
                    teal.id('waitform').style.display = "none";
                }
                else {
                    cid = response.cid;
                    requestAnimationFrame(process_channel);
                }
            });
        }
        catch (e) {
            show_error(connection_error_text, true);
        }
    }

    teal.id('waitform').style.display = "none";
    $t.remove($t.id('loading_text'));
    $t.bind($t.id('button_join'), "click", function() {
        login();
    });
}

