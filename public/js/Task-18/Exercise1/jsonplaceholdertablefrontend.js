const href = window.location.href;
const querystring = href.split('?')[1];
var allrecords = [];
var allcomments = [];

var filterarray = [];

if (querystring !== undefined) {
    var current = querystring.split('&')[0];  //for safe side split through &
    var current_page = current.split('=')[1];
} else {
    var current_page = 1;
}
const recordsinsinglepage = 10;


async function totalrecords() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //return promise
    const postsarray = await response.json();
    return postsarray;
}


async function comments(){
    const response = await fetch(('https://jsonplaceholder.typicode.com/comments'));
    const commentsarray = await response.json();
    return commentsarray;
}

// function temp(){
//     totalrecords().then((data)=>{
//         for(let element of data){
//             allrecords.push(element);
//         }
//         console.log(allrecords.length);
//         comments().then((data)=>{
//             for(let element of data){
//                 allcomments.push(element);
//             }
//         console.log(allcomments.length);
//         fetpostwithpaggination();
//         });
//     });
// } 

//------------------------------------------
function fetpostwithpaggination() {

    const startindex = (current_page - 1) * recordsinsinglepage;
    const endindex = startindex + recordsinsinglepage;

    fetchposts(startindex, endindex);

    document.getElementById("currentpageshow").innerHTML = "Page " + current_page;
}

// totalrecords().then((data)=>{
//     for(let element of data){
//         allrecords.push(element);
//     }
//     console.log(allrecords.length);
// });

//-----------------------------------------------------
async function fetchposts(startindex, endindex) {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //return promise
    // const postsarray = await response.json();

    // postsarray.forEach((element) => {
    //     filterarray.push(element);
    // });

    await totalrecords().then((data)=>{
        for(let element of data){
            allrecords.push(element);
        }
        console.log(allrecords.length);
    });

    const posts = allrecords.slice(startindex, endindex);
    console.log(posts);


    const jsonplaceholdertable = document.getElementById("jsonplaceholdertable");

    const createtr = document.createElement('tr');
    createtr.setAttribute('class', 'tableheaderrow');
    for (let key in posts[0]) {
        const createth = document.createElement('th');
        createth.innerHTML = key;
        createtr.appendChild(createth);
    }

    const createthviewbutton = document.createElement('th');
    createthviewbutton.innerHTML = "View Post";
    createtr.appendChild(createthviewbutton);
    jsonplaceholdertable.appendChild(createtr);


    for (let post of posts) {
        const createtr = document.createElement('tr');

        for (let key in post) {
            const createtd = document.createElement('td');
            createtd.innerHTML = post[key];
            createtr.appendChild(createtd);
        }
        const createtdforview = document.createElement('td');
        const createbutton = document.createElement('a');
        createbutton.innerHTML = "View";
        createbutton.setAttribute('href', '/post?post_id=' + post.id);
        createtdforview.appendChild(createbutton);
        createtr.appendChild(createtdforview);

        jsonplaceholdertable.appendChild(createtr);
    }
}

async function singlepost() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //return promise

    // const posts = await response.json();
    // const commentsresponse = await fetch('https://jsonplaceholder.typicode.com/comments');
    // const comments = await commentsresponse.json();

    // console.log(comments[0].name);
    await totalrecords().then((data)=>{
        for(let element of data){
            allrecords.push(element);
        }
        console.log(allrecords.length);
    });

    await comments().then((data)=>{
        for(let element of data){
            allcomments.push(element);
        }
    console.log(allcomments.length);
    });

    let href = window.location.href;
    let querystring = href.split('?')[1];
    let post_id = querystring.split('=')[1];

    let pathname = window.location.pathname;

    const sinnglepost = document.getElementById("singlepost");
    const singleposttable = document.getElementById("singleposttable");

    for (let post of allrecords) {
        for (let key in post) {
            if (key === "id") {
                if (post[key] == post_id) {
                    // console.log(post);
                    for (let keyofpost in post) {
                        console.log(keyofpost);
                        const createtr = document.createElement('tr');
                        const createth = document.createElement('th');
                        const createtd = document.createElement('td');
                        createth.innerHTML = keyofpost;
                        createtd.innerHTML = post[keyofpost];

                        createtr.appendChild(createth);
                        createtr.appendChild(createtd);
                        singleposttable.appendChild(createtr);
                    }
                    const creatediv = document.createElement('div');
                    const createa = document.createElement('a');
                    createa.setAttribute('href', '/comments?post_id=' + post_id);
                    createa.setAttribute('class', 'commentbutton');
                    createa.innerHTML = "Comments";
                    creatediv.appendChild(createa);

                    sinnglepost.appendChild(creatediv);
                }
            }
        }
    }

    if (pathname === "/comments") {
        const createdivrowcomments = document.createElement('div');
        createdivrowcomments.setAttribute("class", "rowcomments");
        let statusforfoundcomment = false;

        for (let comment of allcomments) {
            const createdivcolcomment = document.createElement('div');
            createdivcolcomment.setAttribute('class', 'colcomment');
            const createdivboxcard = document.createElement('div');
            createdivboxcard.setAttribute('class', 'boxcard');

            // console.log(comment);

            for (let key in comment) {
                if (key === "postId") {
                    if (comment[key] == post_id) {
                        statusforfoundcomment = true;
                    } else {
                        statusforfoundcomment = false;
                    }
                }
            }

            if (statusforfoundcomment) {
                // for(let i=0;i<Object.keys(comment).length-2;i++){
                const createpforname = document.createElement('p');
                createpforname.setAttribute('class', 'commentname');
                createpforname.innerHTML = comment.name;

                const createpforemail = document.createElement('p');
                createpforemail.setAttribute('class', 'commentemail');
                createpforemail.innerHTML = comment.email;

                const createpforbody = document.createElement('p');
                createpforbody.setAttribute('class', 'commentbody');
                createpforbody.innerHTML = comment.body;

                createdivboxcard.appendChild(createpforname);
                createdivboxcard.appendChild(createpforemail);
                createdivboxcard.appendChild(createpforbody);

                //boxcard add to columncomment
                createdivcolcomment.appendChild(createdivboxcard);

                //column add to rowcomment
                createdivrowcomments.appendChild(createdivcolcomment);
                // }
            }
        }

        sinnglepost.appendChild(createdivrowcomments);
    }
}



//onclick set on paggination button
const doubleleft = document.getElementById("doubleleft");
const singleleft = document.getElementById("singleleft");
const doubleright = document.getElementById("doubleright");
const singleright = document.getElementById("singleright");




function doubleleftbutton() {
    if (current_page > 1) {
        current_page = 1;
        window.location.href = `${window.location.protocol}/task18_jsonplaceholdertable?page=${current_page}`;
        fetpostwithpaggination();
    }
}

function singleleftbutton() {
    if (current_page > 1) {
        current_page = Number(current_page) - 1;
        window.location.href = `${window.location.protocol}/task18_jsonplaceholdertable?page=${current_page}`;
        fetpostwithpaggination();
    }
}

function doublerightbutton() {
    if (current_page < (allrecords.length / recordsinsinglepage)) {
        current_page = allrecords.length / recordsinsinglepage;
        window.location.href = `${window.location.protocol}/task18_jsonplaceholdertable?page=${current_page}`;
        fetpostwithpaggination();
    }
}

function singlerightbutton() {
    if (current_page < (allrecords.length / recordsinsinglepage)) {
        current_page = Number(current_page) + 1;
        window.location.href = `${window.location.protocol}/task18_jsonplaceholdertable?page=${current_page}`;
        fetpostwithpaggination();
    }
}


// function addsearchcomponent() {
//     const searchrow = document.getElementById("searchrow");
//     const creatediv = document.createElement('div');
//     searchrow.innerHTML = `
//     <div>
//     <input type="text" id="searchinput" oninput="search()">
//     </div>`
// }

function search() {
    const searchinputbox = document.getElementById("searchinput");
    console.log(searchinputbox.value);
    // console.log(filterarray[0]);
    let searcharray = [];

    allrecords.forEach((element) => {
        for (let key in element) {
            let value = element[key].toString();
            let result = value.includes(searchinputbox.value);
            // console.log(typeof value);
            if (result) {
                searcharray.push(element);
                // console.log("Vshavdjhsd");
                break;
            }
        }
    });

    // searcharray.forEach((element)=>{
    //     console.log(element);
    // })


    // //-------------
    const jsonplaceholdertable = document.getElementById("jsonplaceholdertable");
    jsonplaceholdertable.innerHTML = "";

    if (searcharray.length !== 0) {
        const createtr = document.createElement('tr');
        createtr.setAttribute('class', 'tableheaderrow');
        for (let key in searcharray[0]) {
            const createth = document.createElement('th');
            createth.innerHTML = key;
            createtr.appendChild(createth);
        }

        const createthviewbutton = document.createElement('th');
        createthviewbutton.innerHTML = "View Post";
        createtr.appendChild(createthviewbutton);
        jsonplaceholdertable.appendChild(createtr);

        for (let post of searcharray) {
            const createtr = document.createElement('tr');

            for (let key in post) {
                const createtd = document.createElement('td');
                createtd.innerHTML = post[key];
                createtr.appendChild(createtd);
            }
            const createtdforview = document.createElement('td');
            const createbutton = document.createElement('a');
            createbutton.innerHTML = "View";
            createbutton.setAttribute('href', '/post?post_id=' + post.id);
            createtdforview.appendChild(createbutton);
            createtr.appendChild(createtdforview);

            jsonplaceholdertable.appendChild(createtr);
        }
    } else {
        const createtr = document.createElement('tr');
        createtr.setAttribute('class', 'tableheaderrow');
        for (let key in filterarray[0]) {
            const createth = document.createElement('th');
            createth.innerHTML = key;
            createtr.appendChild(createth);
        }

        const createthviewbutton = document.createElement('th');
        createthviewbutton.innerHTML = "View Post";
        createtr.appendChild(createthviewbutton);
        jsonplaceholdertable.appendChild(createtr);
    }
}
