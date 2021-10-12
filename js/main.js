let postsArray = [];
let postsArrayFilter = [];
let dataPostFilter;
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
    let firstList = document.querySelector(".firstAuto_card")
    let firstPost = [];
    firstPost.push(arrayPots[0]);
    
    let allPostFirst = firstPost.reduce((acc, posts) => {
        let {id,
            addCoverImage,
            uploadImage,
            postTitle,
            postContent,
            user,
            today} = posts

        let cardPostFirst = `
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
            <p><a href="editPost.html">
               ${postTitle}
            </a></p>
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
            <button data-product-id="${id}" value="${id}" class="Edi btn btn-danger">Editar <i class="fas fa-cart-plus"></i></button>
            <button data-product-id="${id}" value="${id}" class="Del btn btn-danger">Eliminar <i class="fas fa-cart-plus"></i></button>
            </div>
                
        </div>
    </article>
        `
        return acc + cardPostFirst
    }, "")
    firstList.innerHTML = allPostFirst

    arrayPots.shift();

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
                <img class="img_post" src=${uploadImage} alt="">
            </div>
            <div>
            <h4>${user}<h4>    
            <h4> ${today}</h4>  
            </div>
        </div>    
    
        <div class="post">
            <p href="editPost.html">
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
            <button data-product-id="${id}" value="${id}" class="Edi btn btn-danger">Editar <i class="fas fa-cart-plus"></i></button>
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

$('.buscador-form').on('submit', (e) => {e.preventDefault()});

$('.buttonFilter').on('click', function() {
    //console.log("Test")
    let valor = $("#textFilter").val()
    $('article').each(function() {
      const $this = $(this);
      const artitle = $this.find('p').text().trim().toLowerCase();
      const incl = artitle.includes(valor.trim().toLowerCase());
      $this.toggleClass('hide', valor.length > 0 && !incl);
    });
    console.log(valor)
  });


///// agregar editar

$(".Edi").click(function(){
    const valorEdit = $(this).val()
    location.href = "editPost.html";
    console.log(valorEdit)
});

/* $('.Edi').click(function() {
    const valorEdit = $(this).val()
    sendNewPage(valorEdit)
    //window.location.href='editPost.html';
    //return valorEdit;
});

const sendNewPage = (key) => {
    window.location.href='editPost.html';
} */

/* 
getDataFilter(valorEdit)

const getDataFilter = (keyData) => {
      console.log(keyData)
    $.ajax({
        method: "GET",
        url: `https://devtojs-default-rtdb.firebaseio.com/Post/${keyData}.json`,
        success: response => { 
            // console.log('response al terminar la peticion',response)
          
            dataPostFilter = response
                

            console.log(dataPostFilter)
            createPostEdit(dataPostFilter)


        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    // console.log(products)
    return dataPostFilter
}


const printPostEdit = arrayPotsEdit => {

    let firstPost = [];
    firstPost.push(arrayPotsEdit);
    //console.log(firstPost)
    let allPost = firstPost.reduce((acc, posts) => {
        let {
            addCoverImage,
            uploadImage,
            postTitle,
            postContent,
            user,
            today} = posts

    //console.log(posts)
        const cardPost = `
        <div class="d-flex flex-column "> 
        <div class="col-12 col-lg-10">
            <div class="card" style="width: 50rem; height: 50rem;">
                <div class="card-body">
                    <input class="font-weight-bold" name="name" style="width: 40rem;" id="Add" type="text" placeholder=${addCoverImage}><br>   
                    <input class="font-weight-bolder" style="width: 40rem;" name="name" id="Upload" type="text" placeholder=${uploadImage}><br>   
                </div>

                <textarea style="font-size: 30px; font-weight: bolder;" class="crayons-textfield crayons-textfield--ghost fs-3xl m:fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight" type="text" id="article-form-title" placeholder=${postTitle} autocomplete="off" data-gramm_editor="false" aria-label="Post Title" autofocus="" style="min-height: 62px; max-height: 62px;"></textarea>
                <textarea style="font-size: 20px;" aria-label="Post Content" name="body_markdown" placeholder=${postContent} class="crayons-textfield crayons-textfield--ghost crayons-article-form__body__field ff-monospace fs-l h-100" data-gramm_editor="false" id="article_body_markdown" data-mention-autocomplete-active="true" style="min-height: 27px;"></textarea>
              </div>
        </div>
        <div class="container">
            <div class="d-flex flex-row">
                <button value="" class="Editar btn btn-primary">Editar <i class="fas fa-cart-plus"></i></button>
            </div>

    </div>
</div>`
return acc + cardPost
}, "")

}
 */
//const listEdit = document.querySelectorAll("#container-id")

//console.log(listEdit)
/* 
const createPostEdit = arrayPotsEdit => {
    //console.log(arrayPotsEdit)
    
    listEdit.innerHTML = printPostEdit(arrayPotsEdit)
}

//printPostEdit(arrayPotsEdit) */