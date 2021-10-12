let key;
let yourDate = new Date();

const getEdit = () => {
    let dataPost
    $.ajax({
        method: "GET",
        url: "https://devtojs-default-rtdb.firebaseio.com/editPost.json",
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
    let list = document.querySelector("#container-id")
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
            <div class="d-flex flex-column "> 
            <div class="col-12 col-lg-10">
                <div class="card" style="width: 50rem; height: 50rem;">
                    <div class="card-body">
                        <p><b>Title: ${postTitle}</b></p>
                        <input class="font-weight-bold" name="name" style="width: 40rem;" id="Add" type="text" placeholder=${addCoverImage}><br>   
                        <input class="font-weight-bolder" style="width: 40rem;" name="name" id="Upload" type="text" placeholder=${uploadImage}><br>   
                    </div>
    
                    <textarea style="font-size: 30px; font-weight: bolder;" class="crayons-textfield crayons-textfield--ghost fs-3xl m:fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight" type="text" id="article-form-title" placeholder=${postTitle} autocomplete="off" data-gramm_editor="false" aria-label="Post Title" autofocus="" style="min-height: 62px; max-height: 62px;"></textarea>
                    <textarea style="font-size: 20px;" aria-label="Post Content" name="body_markdown" placeholder=${postContent} class="crayons-textfield crayons-textfield--ghost crayons-article-form__body__field ff-monospace fs-l h-100" data-gramm_editor="false" id="article_body_markdown" data-mention-autocomplete-active="true" style="min-height: 27px;"></textarea>
                  </div>
            </div>
            <div class="container">
                <div class="d-flex flex-row">
                    <button value="${key0}" class="Editar btn btn-primary">Editar <i class="fas fa-cart-plus"></i></button>
                </div>
    
        </div>
    </div>`
         
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

const deleteEditPost = () => {
    $.ajax({
        method: "DELETE", 
        url: `https://devtojs-default-rtdb.firebaseio.com/editPost.json`,
        success: (response) => {
            window.location.href='index.html';
        },
        error: error => {
            console.log(error);
        }
    })
}

const editPost = (keyPost, newDataPost) => {
     $.ajax({
         method: "PATCH",
         url: `https://devtojs-default-rtdb.firebaseio.com/Post/${keyPost}.json`, 
         data: JSON.stringify(newDataPost),
         success: (response)=> {
            deleteEditPost()
         },
         error: error => {

         }
     })
}

$( '.Editar' ).on( 'click', function() {
    let valor = $(this).val()
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
editPost(valor,objData)
});
