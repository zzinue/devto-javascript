let postsArray = [];


let yourDate = new Date()


$('.chkd').click(function() {
    window.location.href='newPost.html';
    return false;
});



$( '.Publish' ).on( 'click', function() {

 
    let addCoverImage = $('#Add').val();
    let uploadImage = $('#Upload').val();
    let postTitle = $('#article-form-title').val();
    let postContent = $('#article_body_markdown').val();
    let today = yourDate.toISOString().split('T')[0]
    let user = "EntrenadorApp"
    let objData = {
        addCoverImage,
        uploadImage,
        postTitle,
        postContent,
        user,
        today
    }
console.log(objData)
createPost(objData)
});


const createPost = (dataObj) => {
    $.ajax({
        method: "POST", 
        url: "https://devtojs-default-rtdb.firebaseio.com/Post.json",
        data: JSON.stringify(dataObj),
        success: (response)=> {
            //console.log(response)
            window.location.href='index.html';
            return false;
        },
        error: error => {
            console.log(error)
        }
    })
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
            printPost(postsArray)

        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    // console.log(products)
    return dataPost
}

const printPost = arrayPots => {
    let list = document.querySelector(".auto_card")

    let allPost = arrayPots.reduce((acc, posts) => {
        let {id,
            addCoverImage,
            uploadImage,
            postTitle,
            postContent,
            user,
            today} = posts

        let cardPost = `
        <article class="card_posts">
        <div class="perfil">
            <div>
                <img class="img_post" src="https://res.cloudinary.com/practicaldev/image/fetch/s--EKbJ_abL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/685854/9a72b11f-bec3-4ff9-b199-e7c6a62c41f9.jpeg" alt="">
            </div>
            <div>
            <h4>${user}<h4>    
            <h4> ${today}</h4>  
            </div>
        </div>    
    
        <div class="post">
            <p>
               ${postTitle}
            </p>
        </div>
    
        <div class="hashtags">
            <span> #tech</span>
            <span> #it</span>
            <span>#kodemia</span>
            <span>#devteam</span>
        </div>
    
        <div class="reactions">
            <div>
              <span> 
                <svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg> 
                  2 reactions</span> 
              <span> 
                <svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>      
            </span> 
            </div>
        <div> 4 min read 
            <button>Save</button>
            <button data-product-id="${id}" value="${id}" class="Del btn btn-danger">Eliminar <i class="fas fa-cart-plus"></i></button>
            </div>
                
        </div>
    </article>
        `
        return acc + cardPost
    }, "")
    //console.log(allPost)
    list.innerHTML = allPost
}

getData()


const deletePost = keyPost => {
    $.ajax({
        method: "DELETE", 
        url: `https://devtojs-default-rtdb.firebaseio.com/Post/${keyPost}.json`,
        success: (response) => {
            console.log(response);
            getData();
        },
        error: error => {
            console.log(error);
        }
    })
}

$( '.Del' ).on( 'click', function() {
    let valor = $(this).val()
    console.log(valor)
    deletePost(valor)

});