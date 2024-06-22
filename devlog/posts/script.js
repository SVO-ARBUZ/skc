var posts

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const g = {}
g.find = function find(id) {
    return document.getElementById(id)
}

var MsLg

function loadMsg(from,to) {

    for (let i = from; i < to+1; i++) {
        createpost('',MsLg[i])
    }
}
var path
async function ready() {
    path = location.hash.substring(1);
    if (path == "/messages") {
        var MsgLog = await fetch('https://raw.githubusercontent.com/SVO-ARBUZ/zaglit/master/messages.json');
        MsLg = await MsgLog.json();

    }
    else {
        var response = await fetch('https://raw.githubusercontent.com/SVO-ARBUZ/skc/main/devlog/posts/posts.json');
        posts = await response.json();
        posts = posts.posts
        console.log(posts)
        posts.forEach(e=> {
            createpost(e.version,e.name)
        })
    }

    // var search = location.search.substring(1);
    // sitemap = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    // if (Boolean(sitemap && sitemap.hash && sitemap.discordId)) {
    //     console.log(`Authorized ${sitemap.hash}.${sitemap.discordId}.${Number(String(Math.random()*1488).replace("0.","").replace(".",""))}`)
    // }
    // else {
    //     alert("")
    // }
}

function createpost(ver,patch) {
    g.find("postst").innerHTML += `<li class="grid gap-2 sm:grid-cols-[auto_1fr] sm:[&amp;_q]:col-start-2">
<!--                <time datetime="2023-10-11T00:00:00.000Z" class="min-w-[120px] text-gray-600 dark:text-gray-400"> ${ver}</time>-->
                <div><a class="cactus-link" data-astro-prefetch="" href="javascript:void(0)"> ${patch} </a></div>
            </li>`
}


document.addEventListener("DOMContentLoaded", ready)