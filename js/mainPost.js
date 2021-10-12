let key;
let yourDate = new Date();

const getEdit = () => {
    let dataPost
    $.ajax({
        method: "GET",
        url: "https://devtojs-default-rtdb.firebaseio.com/checkPost.json",
        success: response => { 
            // console.log('response al terminar la peticion',response)
          
            let dataPost = response
            
            postsArray = Object.keys(dataPost).map(key => {
                let post = dataPost[key]
                return post
            })
            key = postsArray
            //console.log(postsArray)

            //printPostEdit(postsArray)

        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    // console.log(products)
    return dataPost
}

getEdit()

//console.log(key)

const printPostEdit = arrayPots => {
    let list = document.querySelector(".firstAuto_card")
    console.log("list")
    let allPostFirst = arrayPots.reduce((acc, posts) => {
        let {id,
            addCoverImage,
            uploadImage,
            postTitle,
            postContent,
            user,
            today} = posts

            let key0 = key[0];
            //console.log(id)
            if (id === key0) {
            const cardPost = `
            <article class="card_posts">
            <div>
                <img  class="card_img" src=${addCoverImage} style="background-color:#dddddd;" class="crayons-article__cover__image" alt="Cover image for FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021." >
            </div>
            <div class="perfil">
                <div>
                    <img class="img_post" src=${uploadImage} alt="">
                </div>
                <div>
                <h4>${user}<h4>    
                <h4> ${today}</h4>  
                </div>
            </div>    
        
            <div class="post">
                <h1 id="Post" value="${id}">
                   ${postTitle}
                </h1>
            </div>
        
            <div class="hashtags">
                <span> #tech</span>
                <span> #it</span>
                <span>#kodemia</span>
                <span>#devteam</span>
            </div>
        
            <div class="reactions">
                <div>
                    <h3>
                        ${postContent}
                    </h3>
                </div>
            </div>
            <button data-product-id="${id}" value="${id}" class="Reg btn btn-danger">Regresar <i class="fas fa-cart-plus"></i></button>
        </article>
            `
         
        return acc = cardPost  
        }else{
            return acc
        }
        }, "")
        //console.log(allPostFirst)
        list.innerHTML = allPostFirst
    }

const getData = () => {
    let dataPost
    $.ajax({
        method: "GET",
        url: "https://devtojs-default-rtdb.firebaseio.com/Post.json",
        success: response => { 
            // console.log('response al terminar la peticion',response)
          
            let dataPost = response
            
            postsArray = Object.keys(dataPost).map(key => {
                let post = dataPost[key]
                return {...post, id: key}
            })
            //console.log(postsArray)

            //printPost(postsArray)
            printPostEdit(postsArray)

        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    // console.log(products)
    return dataPost
}

getData()

const deletePost = keyPost => {
    $.ajax({
        method: "DELETE", 
        url: `https://devtojs-default-rtdb.firebaseio.com/checkPost.json`,
        success: (response) => {
            console.log(response);
            window.location.href='index.html';
        },
        error: error => {
            console.log(error);
        }
    })
}

$( '.Reg' ).on( 'click', function() {
    let valor = $(this).val()
    console.log(valor)
    deletePost()
});